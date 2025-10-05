import { MBTIQuestion } from '../../types/mbti';
import { BaseGameScreen } from '../BaseGameScreen';
import { parkSceneConfig } from '../../data/sceneConfigs';

interface ParkGameScreenProps {
  question: MBTIQuestion;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (dimension: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P') => void;
}

export function ParkGameScreen(props: ParkGameScreenProps) {
  return <BaseGameScreen {...props} sceneConfig={parkSceneConfig} />;
}
