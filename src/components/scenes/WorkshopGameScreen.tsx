import { MBTIQuestion } from '../../types/mbti';
import { BaseGameScreen } from '../BaseGameScreen';
import { workshopSceneConfig } from '../../data/sceneConfigs';

interface WorkshopGameScreenProps {
  question: MBTIQuestion;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (dimension: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P') => void;
  voiceId?: string;
}

export function WorkshopGameScreen(props: WorkshopGameScreenProps) {
  return <BaseGameScreen {...props} sceneConfig={workshopSceneConfig} />;
}
