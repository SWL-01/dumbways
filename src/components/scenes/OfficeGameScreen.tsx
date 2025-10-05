import { MBTIQuestion } from '../../types/mbti';
import { BaseGameScreen } from '../BaseGameScreen';
import { officeSceneConfig } from '../../data/sceneConfigs';

interface OfficeGameScreenProps {
  question: MBTIQuestion;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (dimension: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P') => void;
  voiceId?: string;
}

export function OfficeGameScreen(props: OfficeGameScreenProps) {
  // Ensure characterImage is set for boss character in office scene
  const configWithCharacterImage = {
    ...officeSceneConfig,
    characterImage: '/assets/characters/boss.png'
  };
  
  return <BaseGameScreen {...props} sceneConfig={configWithCharacterImage} />;
}
