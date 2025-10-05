import { MBTIQuestion } from '../types/mbti';
import { PartyGameScreen } from './scenes/PartyGameScreen';
import { OfficeGameScreen } from './scenes/OfficeGameScreen';
import { WorkshopGameScreen } from './scenes/WorkshopGameScreen';
import { CoffeeShopGameScreen } from './scenes/CoffeeShopGameScreen';
import { LivingRoomGameScreen } from './scenes/LivingRoomGameScreen';
import { LibraryGameScreen } from './scenes/LibraryGameScreen';
import { ParkGameScreen } from './scenes/ParkGameScreen';
import { TravelAgencyGameScreen } from './scenes/TravelAgencyGameScreen';
import { ConferenceGameScreen } from './scenes/ConferenceGameScreen';
import { ClassroomGameScreen } from './scenes/ClassroomGameScreen';
import { CubicleGameScreen } from './scenes/CubicleGameScreen';
import { MessyRoomGameScreen } from './scenes/MessyRoomGameScreen';

interface IsometricGameScreenProps {
  question: MBTIQuestion;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (dimension: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P') => void;
}

/**
 * IsometricGameScreen Router Component
 * Routes to the appropriate scene component based on question.animation
 */
export function IsometricGameScreen(props: IsometricGameScreenProps) {
  const { question } = props;

  // Route to the appropriate scene component based on animation type
  switch (question.animation) {
    case 'party':
      return <PartyGameScreen {...props} />;
    
    case 'planning':
      return <OfficeGameScreen {...props} />;
    
    case 'problem':
      return <WorkshopGameScreen {...props} />;
    
    case 'listening':
      return <CoffeeShopGameScreen {...props} />;
    
    case 'weekend':
      return <LivingRoomGameScreen {...props} />;
    
    case 'reading':
      return <LibraryGameScreen {...props} />;
    
    case 'comfort':
      return <ParkGameScreen {...props} />;
    
    case 'vacation':
      return <TravelAgencyGameScreen {...props} />;
    
    case 'meeting':
      return <ConferenceGameScreen {...props} />;
    
    case 'learning':
      return <ClassroomGameScreen {...props} />;
    
    case 'criticism':
      return <CubicleGameScreen {...props} />;
    
    case 'mess':
      return <MessyRoomGameScreen {...props} />;
    
    default:
      // Fallback to PartyGameScreen for unknown animation types
      console.warn(`Unknown animation type: ${question.animation}. Falling back to PartyGameScreen.`);
      return <PartyGameScreen {...props} />;
  }
}
