import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { PersonalityType } from '../types/mbti';

interface SystemPromptDisplayProps {
  personality: PersonalityType;
  aiResult: Record<string, string> | null;
}

export function SystemPromptDisplay({ personality, aiResult }: SystemPromptDisplayProps) {
  const [copied, setCopied] = useState(false);

  const generateSystemPrompt = () => {
    const personalityInfo = aiResult?.Personality_info || personality.description;
    const ageInfo = aiResult?.age_info || '';
    const careers = aiResult?.careers || personality.careers.join(', ');

    return `You are a professional career counselor specializing in personality-based career guidance. You are currently counseling someone who has just completed an MBTI personality assessment.

PERSONALITY ASSESSMENT RESULTS:
- Personality Type: ${personality.type} (${personality.title})
- Core Description: ${personalityInfo}
- Age-Specific Insights: ${ageInfo}
- Recommended Career Paths: ${careers}
- Key Strengths: ${personality.strengths.join(', ')}

YOUR ROLE:
- You are a warm, supportive, and knowledgeable career counselor
- Provide personalized career advice based on their ${personality.type} personality type
- Ask thoughtful questions about their interests, values, and goals
- Help them explore how their personality strengths can be leveraged in their career
- Suggest specific next steps for career development
- Be encouraging and help them see their unique value in the workplace

CONVERSATION STYLE:
- Professional but friendly and approachable
- Ask one question at a time to keep the conversation flowing
- Listen actively and respond to what they share
- Provide specific, actionable advice
- Reference their personality type insights when relevant
- Keep responses conversational and not too long

Remember: This person just discovered they are a ${personality.type} personality type. They may be curious about how this applies to their career path and what opportunities might be best suited for them.`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generateSystemPrompt());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 mt-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-800">System Prompt for ElevenLabs Agent</h4>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      
      <div className="bg-white rounded border p-3 max-h-60 overflow-y-auto">
        <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
          {generateSystemPrompt()}
        </pre>
      </div>
      
      <p className="text-xs text-gray-600 mt-2">
        Copy this system prompt and paste it into your ElevenLabs agent configuration for personalized career counseling.
      </p>
    </div>
  );
}