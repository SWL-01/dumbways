import { useEffect, useState, useRef } from 'react';
import { PersonalityType, MBTIScores } from '../types/mbti';
import { Mic, MicOff, MessageSquare, Volume2 } from 'lucide-react';

interface CareerCounselorProps {
  personality: PersonalityType;
  scores: MBTIScores;
  aiResult: Record<string, string> | null;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export function CareerCounselor({ personality }: CareerCounselorProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const hasInitializedRef = useRef(false);



  // Auto-connect when component mounts (only once)
  useEffect(() => {
    if (hasInitializedRef.current) return; // Prevent multiple initializations
    
    const initializeCareerCounselor = async () => {
      try {
        setIsLoading(true);
        hasInitializedRef.current = true; // Mark as initialized immediately
        
        // Capture personality data at mount time to avoid dependency issues
        const personalityType = personality.type;
        const personalityTitle = personality.title;
        
        // Send initial message from the career counselor
        const initialMessage: Message = {
          role: 'assistant',
          content: `Congratulations on completing your MBTI assessment! I can see you're a ${personalityType} - ${personalityTitle}. I'm here to help you explore how your unique personality strengths can guide your career path. What aspect of your career would you like to discuss first?`,
          timestamp: new Date()
        };
        
        setMessages([initialMessage]);
        setIsConnected(true);
        
        // Speak the initial message
        await speakMessage(initialMessage.content);
        
      } catch (err) {
        console.error('Failed to initialize career counselor:', err);
        setError('Failed to initialize career counselor. Please refresh and try again.');
      } finally {
        setIsLoading(false);
      }
    };

    initializeCareerCounselor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Intentionally empty - we want this to run only once on mount

  // Text-to-speech function
  const speakMessage = async (text: string) => {
    if (!import.meta.env.VITE_ELEVENLABS_API_KEY) {
      console.warn('ElevenLabs API key not found for voice synthesis');
      return;
    }

    try {
      const { ElevenLabsClient } = await import('@elevenlabs/elevenlabs-js');
      const client = new ElevenLabsClient({
        apiKey: import.meta.env.VITE_ELEVENLABS_API_KEY,
      });

      const audio = await client.textToSpeech.convert(
        import.meta.env.VITE_ELEVENLABS_VOICE_ID || 'pFZP5JQG7iQjIQuC4Bku',
        {
          text,
          modelId: 'eleven_monolingual_v1',
          voiceSettings: { stability: 0.5, similarityBoost: 0.5 }
        }
      );

      const response = new Response(audio);
      const arrayBuffer = await response.arrayBuffer();
      const audioBlob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audioElement = new Audio(audioUrl);

      audioElement.onended = () => URL.revokeObjectURL(audioUrl);
      audioElement.onerror = () => URL.revokeObjectURL(audioUrl);
      
      await audioElement.play();
    } catch (err) {
      console.warn('Could not synthesize speech:', err);
    }
  };

  // Speech recognition
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError('Speech recognition not supported in this browser');
      return;
    }

    const SpeechRecognitionClass = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognitionClass();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      const userMessage: Message = {
        role: 'user',
        content: transcript,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setIsListening(false);
      setIsProcessing(true);

      // Get AI response
      await getAIResponse(transcript);
    };

    recognition.onerror = (event: any) => {
      setError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Get AI response using a simple AI service
  const getAIResponse = async (userInput: string) => {
    try {
      // For demo purposes, we'll use a simple response system
      // In production, you would integrate with your preferred AI service
      const responses = {
        greeting: "That's wonderful! Your personality type gives you unique strengths in the workplace.",
        strengths: `As a ${personality.type}, your key strengths include ${personality.strengths.slice(0, 2).join(' and ')}. How do you see these showing up in your current work?`,
        careers: `Based on your personality, some great career paths include ${personality.careers.slice(0, 3).join(', ')}. Do any of these interest you?`,
        goals: "What are your biggest career goals right now? I'd love to help you create a plan that aligns with your personality strengths.",
        default: "That's a great point. How do you think your ${personality.type} personality influences your approach to work and career decisions?"
      };

      // Simple keyword matching for demo
      let responseKey = 'default';
      if (userInput.toLowerCase().includes('strength') || userInput.toLowerCase().includes('good')) {
        responseKey = 'strengths';
      } else if (userInput.toLowerCase().includes('career') || userInput.toLowerCase().includes('job')) {
        responseKey = 'careers';
      } else if (userInput.toLowerCase().includes('goal') || userInput.toLowerCase().includes('future')) {
        responseKey = 'goals';
      } else if (userInput.toLowerCase().includes('hello') || userInput.toLowerCase().includes('hi')) {
        responseKey = 'greeting';
      }

      const responseText = responses[responseKey as keyof typeof responses].replace('${personality.type}', personality.type);
      
      const assistantMessage: Message = {
        role: 'assistant',
        content: responseText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      await speakMessage(responseText);
      
    } catch (err) {
      console.error('Failed to get AI response:', err);
      setError('Failed to get response from career counselor');
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Connecting to your career counselor...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800">AI Career Counselor</h3>
          <div className="flex items-center gap-2">
            {isConnected && (
              <>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-700 text-sm font-medium">Connected</span>
              </>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Chat Messages */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4 max-h-60 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-3 ${
              message.role === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg max-w-[80%] ${
                message.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-800 shadow-sm'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <span className="text-xs opacity-70">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        
        {isProcessing && (
          <div className="text-left mb-3">
            <div className="inline-block p-3 bg-white rounded-lg shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce delay-200"></div>
                <span className="text-sm text-gray-600 ml-2">Thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Voice Controls */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={startListening}
          disabled={isListening || isProcessing}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
            isListening
              ? 'bg-red-500 text-white animate-pulse'
              : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transform hover:scale-105'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isListening ? (
            <>
              <MicOff className="w-5 h-5" />
              Listening...
            </>
          ) : (
            <>
              <Mic className="w-5 h-5" />
              Speak to Counselor
            </>
          )}
        </button>
      </div>

      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Volume2 className="w-4 h-4 text-blue-600" />
          <h4 className="font-semibold text-blue-800 text-sm">Your Career Counseling Session</h4>
        </div>
        <ul className="text-blue-700 text-xs space-y-1">
          <li>• Personalized for your {personality.type} personality type</li>
          <li>• Voice conversation with AI-powered responses</li>
          <li>• Career guidance based on your assessment results</li>
          <li>• Click "Speak to Counselor" to respond via voice</li>
        </ul>
      </div>
    </div>
  );
}