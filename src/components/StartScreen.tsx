
interface StartScreenProps {
  onStart: () => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('/background.png')`,
          imageRendering: 'pixelated'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="max-w-2xl w-full text-center animate-fadeIn relative z-10">

        <h1 className="text-6xl md:text-8xl font-black text-white mb-6 animate-pulse drop-shadow-lg">
          PathQuest
        </h1>

        <p className="text-xl md:text-2xl text-white mb-12 drop-shadow">
          Answer 12 scenarios to discover your unique personality type!
        </p>

        <button
          onClick={onStart}
          className="bg-white text-orange-600 px-12 py-6 rounded-full text-2xl font-black hover:bg-gray-100 transform hover:scale-110 transition-all duration-300 shadow-2xl animate-wiggle"
        >
          Click Here to Start!
        </button>
      </div>
    </div>
  );
}
