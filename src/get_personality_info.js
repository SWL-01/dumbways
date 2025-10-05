// import dotenv from 'dotenv';
// import { GoogleGenAI } from '@google/genai';

// dotenv.config(); 

// const apiKey = process.env.GEMINI_API_KEY;
// if (!apiKey) throw new Error("GEMINI_API_KEY not found!");

// const ai = new GoogleGenAI({ apiKey });

// // I'll grab these as variable later or smth
// const personality_type = "INFTJ";
// const age = "25";

// const prompts = [
//   `Give more detail about this person's personality type ${personality_type}.
//    Explain what this personality type entails.`,
//   `Based on the personality type ${personality_type},
//    how might this affect a person at age ${age}?`,
//   `What are some good careers for a person with the personality type: ${personality_type}?`
// ];

// const Type = {
//   ARRAY: "array",
//   OBJECT: "object",
//   STRING: "string",
//   NUMBER: "number",
//   BOOLEAN: "boolean",
//   INTEGER: "integer"
// };

// async function main() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.5-flash",
//     contents:
//       prompts,
//     config: {
//       responseMimeType: "application/json",
//       responseSchema: {
//         type: "array",
//         items: {
//           type: Type.OBJECT,
//           properties: {
//             Personality_info: {
//               type: Type.STRING,
//             },
//             age_info: {
//               type: Type.ARRAY,
//               items: {
//                 type: Type.STRING,
//               },
//             },
//             careers: {
//               type: Type.ARRAY,
//               items: {
//                 type: Type.STRING,
//               },
//             },
//           },
//           propertyOrdering: ["Personality_info", "age_info", "careers"],
//         },
//       },
//     },
//   });

//   console.log(response.text);
// }

// main();

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('GEMINI_API_KEY not found!');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

const Type = {
  ARRAY: "array",
  OBJECT: "object",
  STRING: "string",
  NUMBER: "number",
  BOOLEAN: "boolean",
  INTEGER: "integer"
};

app.post('/api/gemini', async (req, res) => {
  const { personality_type, age } = req.body;
  const prompts = [
    `Give more detail about this person's personality type ${personality_type}. Explain what this personality type entails.`,
    `Based on the personality type ${personality_type}, how might this affect a person at age ${age}?`,
    `What are some good careers for a person with the personality type: ${personality_type}?`
  ];

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompts,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "array",
          items: {
            type: Type.OBJECT,
            properties: {
              Personality_info: { type: Type.STRING },
              age_info: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              },
              careers: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
            propertyOrdering: ["Personality_info", "age_info", "careers"]
          }
        }
      }
    });

    // response.text is expected to be JSON according to responseMimeType
    const parsed = JSON.parse(response.text);
    res.json(parsed);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err?.message ?? 'Unknown error' });
  }
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(PORT, () => console.log(`Gemini proxy running on http://localhost:${PORT}`));