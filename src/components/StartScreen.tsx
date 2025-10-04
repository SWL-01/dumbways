import { Skull } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center animate-fadeIn">
        <div className="mb-8 flex justify-center">
          <Skull className="w-32 h-32 text-white animate-bounce" />
        </div>

        <h1 className="text-6xl md:text-8xl font-black text-white mb-6 animate-pulse drop-shadow-lg">
          DUMB WAYS
        </h1>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 drop-shadow-lg">
          TO FIND YOUR PERSONALITY
        </h2>

        <p className="text-xl md:text-2xl text-white mb-12 font-semibold drop-shadow">
          Answer 12 silly scenarios to discover your MBTI type!
        </p>

        <button
          onClick={onStart}
          className="bg-white text-orange-600 px-12 py-6 rounded-full text-2xl font-black hover:bg-gray-100 transform hover:scale-110 transition-all duration-300 shadow-2xl animate-wiggle"
        >
          START THE MADNESS!
        </button>

        <div className="mt-12 text-white text-sm opacity-75">
          <p>No actual harm will come to you. Probably.</p>
        </div>
      </div>
    </div>
  );
}
