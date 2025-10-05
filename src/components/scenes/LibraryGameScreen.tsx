import { MBTIQuestion } from '../../types/mbti';
import { BaseGameScreen } from '../BaseGameScreen';
import { librarySceneConfig } from '../../data/sceneConfigs';

interface LibraryGameScreenProps {
  question: MBTIQuestion;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (dimension: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P') => void;
}

export function LibraryGameScreen(props: LibraryGameScreenProps) {
  return <BaseGameScreen {...props} sceneConfig={librarySceneConfig} />;
}
