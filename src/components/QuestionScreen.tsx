import { useState } from 'react';
import { MBTIQuestion } from '../types/mbti';
import { Zap, Heart, Brain, Target, Coffee, Book, Sparkles, Users, Compass, Rocket, Trophy, Sun } from 'lucide-react';

interface QuestionScreenProps {
  question: MBTIQuestion;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (dimension: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P') => void;
}

const icons = [Zap, Heart, Brain, Target, Coffee, Book, Sparkles, Users, Compass, Rocket, Trophy, Sun];

export function QuestionScreen({ question, currentQuestion, totalQuestions, onAnswer }: QuestionScreenProps) {
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null);
  const Icon = icons[currentQuestion % icons.length];

  const handleSelect = (option: 'A' | 'B') => {
    setSelectedOption(option);
    const dimension = option === 'A' ? question.optionA.dimension : question.optionB.dimension;

    setTimeout(() => {
      onAnswer(dimension);
      setSelectedOption(null);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <Icon className="w-20 h-20 text-white animate-bounce" />
          </div>

          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-2 inline-block mb-4">
            <span className="text-white font-bold text-lg">
              Question {currentQuestion} of {totalQuestions}
            </span>
          </div>

          <div className="w-full bg-white bg-opacity-30 rounded-full h-4 mb-8 overflow-hidden">
            <div
              className="bg-white h-full transition-all duration-500 ease-out rounded-full"
              style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-slideIn">
          <h2 className="text-3xl md:text-4xl font-black text-gray-800 mb-8 text-center leading-tight">
            {question.scenario}
          </h2>

          <div className="space-y-4">
            <button
              onClick={() => handleSelect('A')}
              className={`w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-6 rounded-2xl text-xl md:text-2xl font-bold hover:scale-105 transform transition-all duration-200 shadow-lg ${
                selectedOption === 'A' ? 'scale-105 ring-4 ring-white' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="flex-1 text-left">{question.optionA.text}</span>
                <span className="text-4xl ml-4">A</span>
              </div>
            </button>

            <button
              onClick={() => handleSelect('B')}
              className={`w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white p-6 rounded-2xl text-xl md:text-2xl font-bold hover:scale-105 transform transition-all duration-200 shadow-lg ${
                selectedOption === 'B' ? 'scale-105 ring-4 ring-white' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="flex-1 text-left">{question.optionB.text}</span>
                <span className="text-4xl ml-4">B</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
