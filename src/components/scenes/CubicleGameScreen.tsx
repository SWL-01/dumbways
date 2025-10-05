import { MBTIQuestion } from '../../types/mbti';
import { BaseGameScreen } from '../BaseGameScreen';
import { cubicleSceneConfig } from '../../data/sceneConfigs';

interface CubicleGameScreenProps {
  question: MBTIQuestion;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (dimension: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P') => void;
}

export function CubicleGameScreen(props: CubicleGameScreenProps) {
  return <BaseGameScreen {...props} sceneConfig={cubicleSceneConfig} />;
}
