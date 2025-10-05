import { useState, useEffect, useRef } from 'react';
import { MBTIQuestion } from '../types/mbti';
import { DialogueBox } from './DialogueBox';
import {
  Users,
  Briefcase,
  Wrench,
  BookOpen,
  Home,
  Heart,
  MapPin,
  Lightbulb,
  MessageCircle,
  AlertCircle,
  Sparkles,
  LucideIcon,
} from 'lucide-react';

interface GameScreenProps {
  question: MBTIQuestion;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (dimension: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P') => void;
}

interface Position {
  x: number;
  y: number;
}

// Map animation types to scene configurations
const sceneConfigs: Record<string, { npc: LucideIcon; npcName: string; background: string }> = {
  party: { npc: Users, npcName: 'Party Guest', background: 'from-purple-600 via-pink-500 to-red-500' },
  planning: { npc: Briefcase, npcName: 'Your Boss', background: 'from-blue-600 via-indigo-500 to-purple-600' },
  problem: { npc: Wrench, npcName: 'Colleague', background: 'from-gray-600 via-slate-500 to-blue-600' },
  listening: { npc: MessageCircle, npcName: 'Friend', background: 'from-teal-600 via-cyan-500 to-blue-500' },
  weekend: { npc: Home, npcName: 'Your Inner Voice', background: 'from-orange-600 via-amber-500 to-yellow-500' },
  reading: { npc: BookOpen, npcName: 'Narrator', background: 'from-emerald-600 via-green-500 to-teal-500' },
  comfort: { npc: Heart, npcName: 'Friend in Need', background: 'from-rose-600 via-pink-500 to-purple-500' },
  vacation: { npc: MapPin, npcName: 'Travel Buddy', background: 'from-sky-600 via-blue-500 to-cyan-500' },
  meeting: { npc: Users, npcName: 'Team Member', background: 'from-violet-600 via-purple-500 to-fuchsia-500' },
  learning: { npc: Lightbulb, npcName: 'Instructor', background: 'from-amber-600 via-yellow-500 to-orange-500' },
  criticism: { npc: AlertCircle, npcName: 'Critic', background: 'from-red-600 via-orange-500 to-amber-500' },
  mess: { npc: Sparkles, npcName: 'Your Conscience', background: 'from-indigo-600 via-blue-500 to-teal-500' },
};

export function GameScreen({ question, currentQuestion, totalQuestions, onAnswer }: GameScreenProps) {
  const scene = sceneConfigs[question.animation] || sceneConfigs.party;
  const [playerPos, setPlayerPos] = useState<Position>({ x: 100, y: 400 });
  const [targetPos, setTargetPos] = useState<Position | null>(null);
  const [showDialogue, setShowDialogue] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  // NPC position (centered) - use constant values
  const NPC_X = 500;
  const NPC_Y = 300;
  const interactionDistance = 120;

  // Reset player position when question changes
  useEffect(() => {
    setPlayerPos({ x: 100, y: 400 });
    setTargetPos(null);
    setShowDialogue(false);
    setIsMoving(false);
  }, [currentQuestion]);

  // Handle click-to-move
  const handleGameAreaClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (showDialogue) return; // Don't move while in dialogue

    const rect = gameAreaRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setTargetPos({ x, y });
    setIsMoving(true);
  };

  // Movement animation loop
  useEffect(() => {
    if (!targetPos || !isMoving) return;

    const checkNPCProximity = (pos: Position) => {
      const distance = Math.hypot(pos.x - NPC_X, pos.y - NPC_Y);
      if (distance < interactionDistance && !showDialogue) {
        setShowDialogue(true);
        setIsMoving(false);
        setTargetPos(null);
      }
    };

    const movePlayer = () => {
      setPlayerPos((current) => {
        const dx = targetPos.x - current.x;
        const dy = targetPos.y - current.y;
        const distance = Math.hypot(dx, dy);

        if (distance < 5) {
          setIsMoving(false);
          setTargetPos(null);
          checkNPCProximity(current);
          return current;
        }

        const speed = 3;
        const ratio = speed / distance;
        const newPos = {
          x: current.x + dx * ratio,
          y: current.y + dy * ratio,
        };

        checkNPCProximity(newPos);
        return newPos;
      });

      animationFrameRef.current = requestAnimationFrame(movePlayer);
    };

    animationFrameRef.current = requestAnimationFrame(movePlayer);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [targetPos, isMoving, showDialogue]);

  const handleSelect = (key: 'A' | 'B') => {
    const dimension = key === 'A' ? question.optionA.dimension : question.optionB.dimension;
    setShowDialogue(false);
    onAnswer(dimension);
  };

  const NpcIcon = scene.npc;

  return (
    <div className={`min-h-screen bg-gradient-to-br ${scene.background} flex flex-col relative overflow-hidden`}>
      {/* Progress bar at top */}
      <div className="absolute top-0 left-0 right-0 p-4 z-30">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-bold text-lg">
              Question {currentQuestion} / {totalQuestions}
            </span>
            <span className="text-white font-bold text-lg">
              {Math.round((currentQuestion / totalQuestions) * 100)}%
            </span>
          </div>
          <div className="w-full bg-white bg-opacity-30 rounded-full h-3 overflow-hidden">
            <div
              className="bg-white h-full transition-all duration-500 ease-out rounded-full"
              style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Game area */}
      <div
        ref={gameAreaRef}
        onClick={handleGameAreaClick}
        className="flex-1 relative cursor-pointer"
        style={{ minHeight: '70vh' }}
      >
        {/* Instruction text */}
        {!showDialogue && (
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bg-white bg-opacity-90 px-6 py-3 rounded-full shadow-lg animate-bounce">
              <span className="text-gray-800 font-bold">Click near the character to interact! 👆</span>
            </div>
          </div>
        )}

        {/* NPC Character */}
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 transition-transform hover:scale-110"
          style={{ left: NPC_X, top: NPC_Y }}
        >
          <div className="relative">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full p-6 shadow-2xl animate-pulse">
              <NpcIcon className="w-16 h-16 text-white" strokeWidth={2} />
            </div>
            {/* Interaction radius indicator */}
            {!showDialogue && (
              <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-4 border-white border-opacity-30 rounded-full pointer-events-none"
                style={{ width: interactionDistance * 2, height: interactionDistance * 2 }}
              />
            )}
            <div className="mt-2 bg-white bg-opacity-90 px-4 py-2 rounded-full shadow-lg text-center">
              <span className="font-bold text-gray-800">{scene.npcName}</span>
            </div>
          </div>
        </div>

        {/* Player Character */}
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-75"
          style={{ left: playerPos.x, top: playerPos.y }}
        >
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full p-5 shadow-xl">
              <div className="w-12 h-12 text-white font-bold text-3xl flex items-center justify-center">
                🚶
              </div>
            </div>
            <div className="mt-1 bg-white bg-opacity-90 px-3 py-1 rounded-full shadow-md text-center">
              <span className="font-bold text-gray-800 text-sm">You</span>
            </div>
          </div>
        </div>

        {/* Target marker */}
        {targetPos && isMoving && (
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-5"
            style={{ left: targetPos.x, top: targetPos.y }}
          >
            <div className="w-4 h-4 bg-white rounded-full animate-ping" />
          </div>
        )}

        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-white rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl" />
        </div>
      </div>

      {/* Dialogue box with choices */}
      {showDialogue && (
        <DialogueBox
          scenario={question.scenario}
          options={[
            { text: question.optionA.text, key: 'A' as const },
            { text: question.optionB.text, key: 'B' as const },
          ]}
          onSelect={handleSelect}
          npcName={scene.npcName}
        />
      )}
    </div>
  );
}
