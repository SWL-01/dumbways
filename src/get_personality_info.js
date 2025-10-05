import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config(); 

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error("GEMINI_API_KEY not found!");

const ai = new GoogleGenAI({ apiKey });

// I'll grab these as variable later or smth
const personality_type = "INFTJ";
const age = "25";

const prompts = [
  `Give more detail about this person's personality type ${personality_type}.
   Explain what this personality type entails.`,
  `Based on the personality type ${personality_type},
   how might this affect a person at age ${age}?`,
  `What are some good careers for a person with the personality type: ${personality_type}?`
];

const Type = {
  ARRAY: "array",
  OBJECT: "object",
  STRING: "string",
  NUMBER: "number",
  BOOLEAN: "boolean",
  INTEGER: "integer"
};

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents:
      prompts,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "array",
        items: {
          type: Type.OBJECT,
          properties: {
            Personality_info: {
              type: Type.STRING,
            },
            age_info: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
            careers: {
              type: Type.ARRAY,
              items: {
                type: Type.STRING,
              },
            },
          },
          propertyOrdering: ["Personality_info", "age_info", "careers"],
        },
      },
    },
  });

  console.log(response.text);
}

main();

