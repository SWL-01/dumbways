import { MBTIQuestion } from '../../types/mbti';
import { BaseGameScreen } from '../BaseGameScreen';
import { messyRoomSceneConfig } from '../../data/sceneConfigs';

interface MessyRoomGameScreenProps {
  question: MBTIQuestion;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (dimension: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P') => void;
}

export function MessyRoomGameScreen(props: MessyRoomGameScreenProps) {
  return <BaseGameScreen {...props} sceneConfig={messyRoomSceneConfig} />;
}
