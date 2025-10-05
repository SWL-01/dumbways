import { useState, useEffect } from 'react';
import { Award, TrendingUp, Share2 } from 'lucide-react';
import { PersonalityType } from '../types/mbti';
import { getPercentages } from '../utils/mbtiCalculator';
import { MBTIScores } from '../types/mbti';

interface ResultsScreenProps {
  personality: PersonalityType;
  scores: MBTIScores;
  onRestart: () => void;
}

export function ResultsScreen({ personality, scores, onRestart }: ResultsScreenProps) {
  const [aiResult, setAiResult] = useState<Record<string, string> | null>(null);

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

  useEffect(() => {
    async function loadAI() {
      try {
        // Hardcoded AI response for testing
        setAiResult({
          Personality_info:
            "About Your Personality\nISFJ stands for Introversion, Sensing, Feeling, and Judging. Individuals with this personality type are often called 'The Defender' or 'The Protector'. They are characterized by their warm-hearted, responsible, and reserved nature. ISFJs are deeply committed to their duties and responsibilities, often putting the needs of others before their own. They are practical, grounded in reality, and pay close attention to details, making them reliable and meticulous. Their strong sense of duty is coupled with a rich inner world of empathy and compassion. They are observant of others' feelings and strive to create harmonious environments, often acting as quiet pillars of support within their communities and families. While they may not always express their feelings openly, their actions speak volumes about their care and dedication. They value tradition, stability, and security, and are known for their loyalty and patience.",
          age_info:
            "Your Age and Personality\nAt age 25, an ISFJ might be fully immersed in establishing their career and personal life, seeking stability and security. They are likely to be deeply invested in their relationships, nurturing their friendships and romantic partnerships with dedication and loyalty. Their strong sense of duty and responsibility will likely manifest in their professional life, where they will strive to be reliable and hardworking, potentially taking on more than their fair share of tasks. An ISFJ at 25 might be grappling with balancing their innate desire to help others with the need to set personal boundaries, as their accommodating nature can sometimes lead to being overwhelmed. They may be seeking to build a stable home environment, reflecting their appreciation for tradition and order. While generally reserved, they might be slowly opening up more to a select few trusted individuals, sharing their rich inner world. They will likely be very attuned to the emotional needs of those around them and will actively work to maintain harmony in their social circles.",
          careers:
            "Nursing, Teaching, Social Work, Counseling, Librarian, Administrative Assistant, Human Resources, Medical Assistant, Child Care Provider, Religious Worker, Accountant, Dental Hygienist, Physical Therapist, Interior Designer, Executive Assistant"
        });

        // For real API testing, uncomment the block below and remove the hardcoded setAiResult above.
        /*
        const res = await fetch('http://localhost:4000/api/gemini', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ personality_type: type, age: 25 }),
        });
        if (!res.ok) throw new Error('Failed to fetch AI result');
        const data = await res.json(); 
        if (Array.isArray(data) && data.length > 0) {
          const item = data[0];
          setAiResult({
            Personality_info: item.Personality_info ?? '',
            age_info: Array.isArray(item.age_info) ? item.age_info.join(' ') : (item.age_info ?? ''),
            careers: Array.isArray(item.careers) ? item.careers.join(', ') : (item.careers ?? '')
          });
        }
        */
      } catch (err) {
        console.error('AI fetch error', err);
      }
    }
    loadAI();
  }, [type]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 animate-fadeIn">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-4 drop-shadow-lg animate-bounce">
            {type}
          </h1>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 drop-shadow">
            {personality.title}
          </h2>
        </div>

        {/* AI Result Section */}
        {aiResult && (
          <div className="bg-white rounded-xl p-6 mt-6 shadow-lg animate-slideIn">
            <h3 className="text-xl font-bold mb-4"> Personality Insights From Gemini </h3>
            {Object.entries(aiResult).map(([title, content]) => (
              <div key={title} className="mb-4">
                <h4 className="text-lg font-semibold text-purple-600 mb-1">{title}</h4>
                <p className="text-gray-700">{content}</p>
              </div>
            ))}
          </div>
        )}

        {/* Scores Section */}
        <div className="mb-8 mt-8">
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

        {/* Buttons */}
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
