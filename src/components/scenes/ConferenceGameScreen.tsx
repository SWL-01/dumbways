import { MBTIQuestion } from '../../types/mbti';
import { BaseGameScreen } from '../BaseGameScreen';
import { conferenceSceneConfig } from '../../data/sceneConfigs';

interface ConferenceGameScreenProps {
  question: MBTIQuestion;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (dimension: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P') => void;
  voiceId?: string;
}

export function ConferenceGameScreen(props: ConferenceGameScreenProps) {
  return <BaseGameScreen {...props} sceneConfig={conferenceSceneConfig} />;
}
