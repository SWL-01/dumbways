import { useState } from 'react';

interface DialogueBoxProps {
  scenario: string;
  options: Array<{
    text: string;
    key: 'A' | 'B';
  }>;
  onSelect: (key: 'A' | 'B') => void;
  npcName?: string;
}

export function DialogueBox({ scenario, options, onSelect, npcName = 'Stranger' }: DialogueBoxProps) {
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null);

  const handleSelect = (key: 'A' | 'B') => {
    setSelectedOption(key);
    setTimeout(() => {
      onSelect(key);
      setSelectedOption(null);
    }, 300);
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 z-20">
      <div className="max-w-4xl mx-auto">
        {/* Scenario dialogue bubble */}
        <div className="mb-4 animate-slideIn">
          <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 relative">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">💬</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="font-bold text-gray-800 mb-2">{npcName}</div>
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">{scenario}</p>
              </div>
            </div>
            {/* Speech bubble tail */}
            <div className="absolute -bottom-2 left-12 w-4 h-4 bg-white transform rotate-45" />
          </div>
        </div>

        {/* Choice buttons */}
        <div className="space-y-3">
          {options.map((option) => (
            <button
              key={option.key}
              onClick={() => handleSelect(option.key)}
              className={`w-full bg-gradient-to-r ${
                option.key === 'A'
                  ? 'from-cyan-500 to-blue-500'
                  : 'from-pink-500 to-rose-500'
              } text-white p-5 rounded-2xl text-lg md:text-xl font-bold hover:scale-105 transform transition-all duration-200 shadow-lg ${
                selectedOption === option.key ? 'scale-105 ring-4 ring-white' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="flex-1 text-left">{option.text}</span>
                <span className="text-3xl ml-4">{option.key}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
