import { useState } from 'react';
import { TextToSpeech } from './TextToSpeech';
import { GAME_VOICES } from '../data/voices';

interface VoiceSelectorProps {
  selectedVoiceId: string;
  onVoiceSelect: (voiceId: string) => void;
  className?: string;
}

export function VoiceSelector({ selectedVoiceId, onVoiceSelect, className = "" }: VoiceSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedVoice = GAME_VOICES.find(v => v.id === selectedVoiceId) || GAME_VOICES[0];

  return (
    <div className={`relative ${className}`}>
      {/* Voice Selection Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white hover:bg-white/20 transition-all duration-200 flex items-center gap-3 w-full justify-between shadow-lg"
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="font-medium">{selectedVoice.name}</span>
          <span className="text-white/70 text-sm">({selectedVoice.accent})</span>
        </div>
        <div className="text-white/50 text-xs">
          {isOpen ? '▲' : '▼'}
        </div>
      </button>

      {/* Voice Options Dropdown */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white/95 backdrop-blur-sm rounded-xl border border-white/20 shadow-xl z-50 max-h-96 overflow-y-auto">
          <div className="p-2">
            <h3 className="text-gray-800 font-semibold mb-3 px-2">Choose Your Voice Guide:</h3>
            
            {GAME_VOICES.map((voice) => (
              <div
                key={voice.id}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                  selectedVoiceId === voice.id
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-white/50 border-transparent hover:bg-gray-50 hover:border-gray-200'
                }`}
                onClick={() => {
                  onVoiceSelect(voice.id);
                  setIsOpen(false);
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-800">{voice.name}</span>
                      <span className="text-xs bg-gray-200 px-2 py-1 rounded-full text-gray-600">
                        {voice.accent}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        voice.gender === 'female' ? 'bg-pink-100 text-pink-700' :
                        voice.gender === 'male' ? 'bg-blue-100 text-blue-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {voice.gender}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{voice.description}</p>
                    <p className="text-xs font-medium text-gray-500">{voice.personality}</p>
                  </div>
                  
                  {/* Voice Preview Button */}
                  <div className="ml-3">
                    <TextToSpeech
                      text={`Hi there! I'm ${voice.name}. I'll be your guide through this personality adventure!`}
                      voiceId={voice.id}
                      className="scale-75"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}