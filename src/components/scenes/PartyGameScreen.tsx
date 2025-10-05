import { MBTIQuestion } from '../../types/mbti';
import { BaseGameScreen } from '../BaseGameScreen';
import { partySceneConfig } from '../../data/sceneConfigs';

interface PartyGameScreenProps {
  question: MBTIQuestion;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (dimension: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P') => void;
}

export function PartyGameScreen(props: PartyGameScreenProps) {
  return <BaseGameScreen {...props} sceneConfig={partySceneConfig} />;
}
