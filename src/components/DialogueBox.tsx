import { useState, useEffect } from 'react';
import { TextToSpeech } from './TextToSpeech';

interface DialogueBoxProps {
  scenario: string;
  options: Array<{
    text: string;
    key: 'A' | 'B';
  }>;
  onSelect: (key: 'A' | 'B') => void;
  npcName?: string;
  voiceId?: string;
  characterImage?: string;
}

export function DialogueBox({ scenario, options, onSelect, npcName = 'Stranger', voiceId, characterImage }: DialogueBoxProps) {
  // Use the passed characterImage or fallback to ernest.png
  const displayCharacterImage = characterImage || '/assets/characters/ernest.png';
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null);
  const [showChoices, setShowChoices] = useState(false);

  // Handle keyboard input for advancing dialogue
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!showChoices && (event.key === '>' || event.key === 'ArrowRight' || event.key === ' ' || event.key === 'Enter')) {
        setShowChoices(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showChoices]);

  const handleSelect = (key: 'A' | 'B') => {
    setSelectedOption(key);
    setTimeout(() => {
      onSelect(key);
      setSelectedOption(null);
      setShowChoices(false); // Reset for next dialogue
    }, 300);
  };

  const handleAdvanceClick = () => {
    setShowChoices(true);
  };

  return (
    <div className="absolute inset-0 z-20 bg-black bg-opacity-50">
      {/* Character Portrait */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="relative">
          <img 
            src={displayCharacterImage} 
            alt={npcName}
            className="w-96 h-96 object-contain drop-shadow-2xl animate-slideIn"
            style={{ imageRendering: 'pixelated' }}
            onError={(e) => {
              // Fallback to ernest.png if image fails to load
              const target = e.target as HTMLImageElement;
              if (target.src !== '/assets/characters/ernest.png') {
                target.src = '/assets/characters/ernest.png';
              }
            }}
          />
        </div>
      </div>

      {/* Bottom Dialogue Area */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="max-w-6xl mx-auto">
          {!showChoices ? (
            /* Initial Dialogue Display */
            <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t-4 border-cyan-400 rounded-t-2xl shadow-2xl backdrop-blur-md">
              {/* Name Tab */}
              <div className="relative">
                <div className="absolute -top-8 left-8 bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 rounded-t-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-white font-bold text-lg">{npcName}</span>
                    {voiceId && (
                      <TextToSpeech
                        text={scenario}
                        voiceId={voiceId}
                        className="text-white"
                      />
                    )}
                  </div>
                </div>
              </div>
              
              {/* Dialogue Content */}
              <div className="p-8 pt-12">
                <p className="text-white text-xl md:text-2xl leading-relaxed mb-6 font-medium">
                  {scenario}
                </p>
                
                {/* Continue Prompt */}
                <div className="flex justify-end items-center">
                  <button
                    onClick={handleAdvanceClick}
                    className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-200 animate-pulse"
                  >
                    <span className="text-lg font-medium">Press to continue</span>
                    <div className="flex">
                      <span className="text-2xl">▶</span>
                      <span className="text-2xl">▶</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Choice Selection Display */
            <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t-4 border-cyan-400 rounded-t-2xl shadow-2xl backdrop-blur-md p-8">
              <h3 className="text-cyan-400 text-xl font-bold mb-6 text-center">Choose your response:</h3>
              
              <div className="space-y-4">
                {options.map((option) => (
                  <button
                    key={option.key}
                    onClick={() => handleSelect(option.key)}
                    className={`w-full bg-gradient-to-r ${
                      option.key === 'A'
                        ? 'from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500'
                        : 'from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500'
                    } text-white p-6 rounded-xl text-lg md:text-xl font-bold hover:scale-105 transform transition-all duration-200 shadow-lg border-2 border-transparent hover:border-white ${
                      selectedOption === option.key ? 'scale-105 ring-4 ring-white' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex-1 text-left">{option.text}</span>
                      <span className="text-3xl ml-4 bg-white bg-opacity-20 rounded-full w-12 h-12 flex items-center justify-center">
                        {option.key}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
