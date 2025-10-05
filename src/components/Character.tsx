import { LucideIcon } from 'lucide-react';

interface CharacterProps {
  icon: LucideIcon;
  position: 'left' | 'right';
  name?: string;
  isSpeaking?: boolean;
}

export function Character({ icon: Icon, position, name, isSpeaking = false }: CharacterProps) {
  const positionClasses = position === 'left' ? 'left-8' : 'right-8';
  const flipClass = position === 'right' ? 'scale-x-[-1]' : '';

  return (
    <div className={`absolute bottom-32 ${positionClasses} flex flex-col items-center z-10`}>
      <div
        className={`relative transition-all duration-300 ${
          isSpeaking ? 'scale-110 animate-bounce' : 'scale-100'
        }`}
      >
        <div
          className={`bg-gradient-to-br from-purple-400 to-pink-400 rounded-full p-8 shadow-2xl ${flipClass}`}
        >
          <Icon className="w-24 h-24 md:w-32 md:h-32 text-white" strokeWidth={2} />
        </div>
        {isSpeaking && (
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping" />
        )}
      </div>
      {name && (
        <div className="mt-4 bg-white bg-opacity-90 px-4 py-2 rounded-full shadow-lg">
          <span className="font-bold text-gray-800">{name}</span>
        </div>
      )}
    </div>
  );
}
