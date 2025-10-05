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
  voiceId?: string;
}

/**
 * Router component that selects the appropriate scene based on the question's animation property
 */
export function IsometricGameScreen(props: IsometricGameScreenProps) {
  const { question } = props;

  // Map animation types to scene components
  const sceneComponents: Record<string, React.ComponentType<IsometricGameScreenProps>> = {
    party: PartyGameScreen,
    planning: OfficeGameScreen,
    problem: WorkshopGameScreen,
    listening: CoffeeShopGameScreen,
    weekend: LivingRoomGameScreen,
    reading: LibraryGameScreen,
    comfort: ParkGameScreen,
    vacation: TravelAgencyGameScreen,
    meeting: ConferenceGameScreen,
    learning: ClassroomGameScreen,
    criticism: CubicleGameScreen,
    mess: MessyRoomGameScreen,
  };

  // Get the appropriate scene component
  const SceneComponent = sceneComponents[question.animation] || PartyGameScreen;

  // Render the selected scene
  return <SceneComponent {...props} />;
}
