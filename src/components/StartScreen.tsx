
import { TextToSpeech } from './TextToSpeech';
import { VoiceSelector } from './VoiceSelector';

interface StartScreenProps {
  onStart: () => void;
  selectedVoiceId: string;
  onVoiceSelect: (voiceId: string) => void;
}

export function StartScreen({ onStart, selectedVoiceId, onVoiceSelect }: StartScreenProps) {
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

      {/* Voice Selector - Top Right */}
      <div className="absolute top-4 right-4 z-20">
        <div className="text-right mb-2">
          <span className="text-white/80 text-sm font-medium">Voice Guide</span>
        </div>
        <VoiceSelector
          selectedVoiceId={selectedVoiceId}
          onVoiceSelect={onVoiceSelect}
          className="w-64"
        />
      </div>

      {/* Content */}
      <div className="max-w-2xl w-full text-center animate-fadeIn relative z-10">

        <h1 className="text-6xl md:text-8xl font-black text-white mb-6 animate-pulse drop-shadow-lg">
          PathQuest
        </h1>

        <div className="flex items-center justify-center gap-4 mb-12">
          <p className="text-xl md:text-2xl text-white drop-shadow">
            Answer 12 scenarios to discover your unique personality type!
          </p>
          <TextToSpeech 
            text="Answer 12 scenarios to discover your unique personality type!"
            voiceId={selectedVoiceId}
            className="ml-2"
          />
        </div>

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
