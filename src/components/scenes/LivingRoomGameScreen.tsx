import { MBTIQuestion } from '../../types/mbti';
import { BaseGameScreen } from '../BaseGameScreen';
import { livingRoomSceneConfig } from '../../data/sceneConfigs';

interface LivingRoomGameScreenProps {
  question: MBTIQuestion;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (dimension: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P') => void;
}

export function LivingRoomGameScreen(props: LivingRoomGameScreenProps) {
  return <BaseGameScreen {...props} sceneConfig={livingRoomSceneConfig} />;
}
