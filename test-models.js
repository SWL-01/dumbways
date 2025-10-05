import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
  try {
    // Try to list available models
    console.log('Attempting to list models...');
    
    // Try different model names
    const modelNames = [
      'gemini-pro',
      'gemini-1.5-pro',
      'gemini-1.5-flash',
      'gemini-1.0-pro',
      'models/gemini-pro',
      'models/gemini-1.5-pro'
    ];
    
    for (const modelName of modelNames) {
      try {
        console.log(`\nTrying model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent('Hello');
        console.log(`✅ ${modelName} WORKS!`);
        console.log('Response:', result.response.text().substring(0, 50));
        break;
      } catch (err) {
        console.log(`❌ ${modelName} failed:`, err.message);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

listModels();
