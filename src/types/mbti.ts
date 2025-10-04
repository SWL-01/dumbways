export interface MBTIQuestion {
  id: number;
  scenario: string;
  optionA: {
    text: string;
    dimension: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
  };
  optionB: {
    text: string;
    dimension: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
  };
  animation: string;
}

export interface MBTIScores {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
}

export interface PersonalityType {
  type: string;
  title: string;
  description: string;
  strengths: string[];
  careers: string[];
}
