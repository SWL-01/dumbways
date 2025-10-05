import { useState, useCallback } from 'react';
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { gameEnhancer } from '../utils/gameEnhancer';

interface TextToSpeechProps {
  text: string;
  className?: string;
  voiceId?: string;
}

let isRequestInProgress = false;
let lastRequestTime = 0;
const MIN_REQUEST_DELAY = 3000;

export function TextToSpeech({ 
  text, 
  className = "",
  voiceId = "pFZP5JQG7iQjIQuC4Bku"
}: TextToSpeechProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const playAudio = useCallback(async () => {
    if (isPlaying || isLoading || isRequestInProgress) return;

    try {
      setIsLoading(true);
      setError(null);
      isRequestInProgress = true;

      // Rate limiting
      const now = Date.now();
      const timeSinceLastRequest = now - lastRequestTime;
      if (timeSinceLastRequest < MIN_REQUEST_DELAY) {
        const waitTime = MIN_REQUEST_DELAY - timeSinceLastRequest;
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }

      const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
      if (!apiKey) throw new Error('API key not found');

      const client = new ElevenLabsClient({ apiKey });
      const audio = await client.textToSpeech.convert(voiceId, {
        text,
        modelId: 'eleven_monolingual_v1',
        voiceSettings: { stability: 0.5, similarityBoost: 0.5 }
      });

      lastRequestTime = Date.now();
      setIsPlaying(true);

      const response = new Response(audio);
      const arrayBuffer = await response.arrayBuffer();
      const audioBlob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audioElement = new Audio(audioUrl);

      audioElement.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };

      audioElement.onerror = () => {
        setIsPlaying(false);
        setError('Playback failed');
        URL.revokeObjectURL(audioUrl);
      };

      await audioElement.play();
      
      // Track TTS usage for achievements
      gameEnhancer.trackInteraction('tts');

    } catch (err: unknown) {
      const errorMessage = err instanceof Error && err.message.includes('429') 
        ? 'Rate limited. Please wait.' 
        : 'Speech generation failed';
      setError(errorMessage);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
      isRequestInProgress = false;
    }
  }, [text, voiceId, isPlaying, isLoading]);

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <button
        onClick={playAudio}
        disabled={isLoading || isPlaying}
        className={`
          flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200
          ${isPlaying ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}
          ${isLoading ? 'opacity-75 cursor-not-allowed' : 'hover:scale-110'}
        `}
        title={isLoading ? 'Loading...' : isPlaying ? 'Playing...' : 'Play audio'}
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : isPlaying ? (
          <Volume2 className="w-5 h-5" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </button>
      
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
}