import { MBTIQuestion } from '../../types/mbti';
import { BaseGameScreen } from '../BaseGameScreen';
import { officeSceneConfig } from '../../data/sceneConfigs';

interface OfficeGameScreenProps {
  question: MBTIQuestion;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (dimension: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P') => void;
}

export function OfficeGameScreen(props: OfficeGameScreenProps) {
  return <BaseGameScreen {...props} sceneConfig={officeSceneConfig} />;
}
