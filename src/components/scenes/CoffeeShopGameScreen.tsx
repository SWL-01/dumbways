import { MBTIQuestion } from '../../types/mbti';
import { BaseGameScreen } from '../BaseGameScreen';
import { coffeeShopSceneConfig } from '../../data/sceneConfigs';

interface CoffeeShopGameScreenProps {
  question: MBTIQuestion;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (dimension: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P') => void;
}

export function CoffeeShopGameScreen(props: CoffeeShopGameScreenProps) {
  return <BaseGameScreen {...props} sceneConfig={coffeeShopSceneConfig} />;
}
