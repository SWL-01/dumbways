// Voice options for the personality test
export interface Voice {
  id: string;
  name: string;
  description: string;
  accent: string;
  gender: 'male' | 'female' | 'neutral';
  personality: string;
}

export const GAME_VOICES: Voice[] = [
  {
    id: "pFZP5JQG7iQjIQuC4Bku",
    name: "Lily",
    description: "Velvety British female voice with warmth and clarity",
    accent: "British",
    gender: "female",
    personality: "Warm & Professional"
  },
  {
    id: "IKne3meq5aSn9XLyUdCD",
    name: "Charlie",
    description: "Young Australian male with confident and energetic voice",
    accent: "Australian",
    gender: "male",
    personality: "Energetic & Confident"
  },
  {
    id: "cgSgspJ2msm6clMCkdW9",
    name: "Jessica",
    description: "Young and playful American female, perfect for trendy content",
    accent: "American",
    gender: "female",
    personality: "Playful & Young"
  },
  {
    id: "TX3LPaxmHKxFdv7VOQHJ",
    name: "Liam",
    description: "Young adult with energy and warmth, suitable for social media",
    accent: "American",
    gender: "male",
    personality: "Energetic & Warm"
  },
  {
    id: "bIHbv24MWmeRgasZH58o",
    name: "Will",
    description: "Conversational and laid back",
    accent: "American",
    gender: "male",
    personality: "Chill & Conversational"
  },
  {
    id: "EXAVITQu4vr4xnSDxMaL",
    name: "Sarah",
    description: "Young woman with confident, warm, and professional tone",
    accent: "American",
    gender: "female",
    personality: "Professional & Confident"
  },
  {
    id: "SAz9YHcvj6GT2YYXdXww",
    name: "River",
    description: "Relaxed, neutral voice ready for narrations",
    accent: "American",
    gender: "neutral",
    personality: "Calm & Neutral"
  },
  {
    id: "iP95p4xoKVk53GoZ742B",
    name: "Chris",
    description: "Natural and down-to-earth voice",
    accent: "American",
    gender: "male",
    personality: "Natural & Friendly"
  }
];