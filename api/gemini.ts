import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { personality_type, age } = req.body;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });
  }

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
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Remove markdown code blocks if present
    const cleanedText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    const parsed = JSON.parse(cleanedText);
    res.status(200).json(parsed);
  } catch (err: unknown) {
    console.error('Gemini API Error:', err);
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: errorMessage });
  }
}
