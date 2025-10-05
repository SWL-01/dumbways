import { MBTIQuestion } from '../../types/mbti';
import { BaseGameScreen } from '../BaseGameScreen';
import { travelAgencySceneConfig } from '../../data/sceneConfigs';

interface TravelAgencyGameScreenProps {
  question: MBTIQuestion;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (dimension: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P') => void;
  voiceId?: string;
}

export function TravelAgencyGameScreen(props: TravelAgencyGameScreenProps) {
  return <BaseGameScreen {...props} sceneConfig={travelAgencySceneConfig} />;
}
