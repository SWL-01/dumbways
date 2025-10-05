import { MBTIQuestion } from '../../types/mbti';
import { BaseGameScreen } from '../BaseGameScreen';
import { classroomSceneConfig } from '../../data/sceneConfigs';

interface ClassroomGameScreenProps {
  question: MBTIQuestion;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (dimension: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P') => void;
  voiceId?: string;
}

export function ClassroomGameScreen(props: ClassroomGameScreenProps) {
  return <BaseGameScreen {...props} sceneConfig={classroomSceneConfig} />;
}
