import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('GEMINI_API_KEY not found!');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

app.post('/api/gemini', async (req, res) => {
  const { personality_type, age } = req.body;
  
  const prompt = `You are an MBTI personality expert. Provide detailed information in JSON format.

Personality Type: ${personality_type}
Age: ${age}

Provide a response in this exact JSON format:
[{
  "Personality_info": "Detailed explanation of the ${personality_type} personality type",
  "age_info": ["Point 1 about how ${personality_type} manifests at age ${age}", "Point 2", "Point 3"],
  "careers": ["Career 1", "Career 2", "Career 3", "Career 4", "Career 5", "Career 6", "Career 7", "Career 8", "Career 9", "Career 10"]
}]

Make sure to:
1. Give a detailed personality explanation (2-3 paragraphs)
2. Provide 3-5 specific points about age ${age}
3. List exactly 10 suitable careers
4. Return valid JSON only, no markdown or extra text`;

  try {
    console.log('Creating model...');
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    console.log('Model created:', model ? 'success' : 'failed');
    
    console.log('Generating content...');
    const result = await model.generateContent(prompt);
    console.log('Content generated');
    
    const response = result.response;
    const text = response.text();
    console.log('Response text:', text.substring(0, 100));
    
    // Try to parse the JSON response
    // Remove markdown code blocks if present
    const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    const parsed = JSON.parse(cleanedText);
    console.log('Parsed successfully:', parsed);
    res.json(parsed);
  } catch (err: unknown) {
    console.error('Gemini API Error:', err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: errorMessage });
  }
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(PORT, () => console.log(`Gemini proxy running on http://localhost:${PORT}`));