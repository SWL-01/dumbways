import { Award, TrendingUp, Briefcase, Share2 } from 'lucide-react';
import { PersonalityType } from '../types/mbti';
import { getPercentages } from '../utils/mbtiCalculator';
import { MBTIScores } from '../types/mbti';
import { TextToSpeech } from './TextToSpeech';

interface ResultsScreenProps {
  personality: PersonalityType;
  scores: MBTIScores;
  onRestart: () => void;
  voiceId?: string;
}

export function ResultsScreen({ personality, scores, onRestart, voiceId }: ResultsScreenProps) {
  const percentages = getPercentages(scores);
  const type = personality.type;

  const dimensions = [
    { left: 'E', right: 'I', leftPercent: percentages.E, rightPercent: percentages.I },
    { left: 'S', right: 'N', leftPercent: percentages.S, rightPercent: percentages.N },
    { left: 'T', right: 'F', leftPercent: percentages.T, rightPercent: percentages.F },
    { left: 'J', right: 'P', leftPercent: percentages.J, rightPercent: percentages.P },
  ];

  const handleShare = () => {
    const text = `I'm an ${type} - ${personality.title}! Take the MBTI personality test and discover your type!`;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-fadeIn">
          <div className="inline-block bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-8 py-3 mb-6">
            <span className="text-white text-xl font-semibold">You Survived!</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white mb-4 drop-shadow-lg animate-bounce">
            {type}
          </h1>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow">
            {personality.title}
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8 animate-slideIn">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-purple-600" />
              <h3 className="text-2xl font-bold text-gray-800">Your Personality</h3>
            </div>
            {voiceId && (
              <TextToSpeech
                text={`You are ${personality.title}. ${personality.description}`}
                voiceId={voiceId}
              />
            )}
          </div>

          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            {personality.description}
          </p>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-purple-600" />
              <h3 className="text-2xl font-bold text-gray-800">Your Scores</h3>
            </div>

            <div className="space-y-4">
              {dimensions.map((dim, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-bold text-purple-600">{dim.left}</span>
                    <span className="font-bold text-pink-600">{dim.right}</span>
                  </div>
                  <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="absolute left-0 h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-1000"
                      style={{ width: `${dim.leftPercent}%` }}
                    />
                    <div
                      className="absolute right-0 h-full bg-gradient-to-l from-pink-500 to-pink-600 transition-all duration-1000"
                      style={{ width: `${dim.rightPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-sm text-gray-600">
                    <span>{dim.leftPercent}%</span>
                    <span>{dim.rightPercent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-purple-600" />
              <h3 className="text-2xl font-bold text-gray-800">Your Strengths</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {personality.strengths.map((strength, idx) => (
                <span
                  key={idx}
                  className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-semibold"
                >
                  {strength}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-8 h-8 text-purple-600" />
              <h3 className="text-2xl font-bold text-gray-800">Ideal Careers</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {personality.careers.map((career, idx) => (
                <span
                  key={idx}
                  className="bg-pink-100 text-pink-800 px-4 py-2 rounded-full font-semibold"
                >
                  {career}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fadeIn">
          <button
            onClick={handleShare}
            className="bg-white text-purple-600 px-8 py-4 rounded-full text-xl font-bold hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
          >
            <Share2 className="w-6 h-6" />
            Share Results
          </button>

          <button
            onClick={onRestart}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full text-xl font-bold hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            Take Again
          </button>
        </div>
      </div>
    </div>
  );
}
