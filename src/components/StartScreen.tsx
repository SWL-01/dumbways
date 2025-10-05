import { useState } from 'react';
import { TextToSpeech } from './TextToSpeech';
import { VoiceSelector } from './VoiceSelector';

interface StartScreenProps {
  onStart: () => void;
  selectedVoiceId: string;
  onVoiceSelect: (voiceId: string) => void;
}

export function StartScreen({ onStart, selectedVoiceId, onVoiceSelect }: StartScreenProps) {
  const [age, setAge] = useState('');
  const [showError, setShowError] = useState(false);

  const handleStart = () => {
    const ageNum = parseInt(age);
    if (!age || isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      setShowError(true);
      return;
    }
    setShowError(false);
    // Store age in localStorage to use later in AI analysis
    localStorage.setItem('user_age', age);
    onStart();
  };

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
            Answer 4 scenarios to discover your unique personality type!
          </p>
          <TextToSpeech 
            text="Answer 4 scenarios to discover your unique personality type!"
            voiceId={selectedVoiceId}
            className="ml-2"
          />
        </div>

        {/* Age Input */}
        <div className="mb-8">
          <label htmlFor="age" className="block text-white text-lg font-bold mb-3 drop-shadow">
            How old are you? <span className="text-red-400">*</span>
          </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter your age"
            min="1"
            max="120"
            className="w-64 px-6 py-4 text-center text-2xl font-bold rounded-full border-4 border-white/50 bg-white/90 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-300 transition-all"
          />
          {showError && (
            <p className="text-red-400 font-bold mt-3 bg-black/50 px-4 py-2 rounded-lg inline-block">
              ⚠️ Please enter a valid age (1-120)
            </p>
          )}
        </div>

        <button
          onClick={handleStart}
          className="bg-white text-orange-600 px-12 py-6 rounded-full text-2xl font-black hover:bg-gray-100 transform hover:scale-110 transition-all duration-300 shadow-2xl animate-wiggle disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          Click Here to Start!
        </button>
      </div>
    </div>
  );
}
