import { useState, useCallback } from 'react';
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';

export const useTextToSpeech = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const speak = useCallback(async (
    text: string, 
    voiceId: string = 'JBFqnCBsd6RMkjVDRZzb',
    modelId: string = 'eleven_multilingual_v2'
  ) => {
    if (isPlaying || isLoading) return;

    try {
      setIsLoading(true);
      
      const elevenlabs = new ElevenLabsClient({
        apiKey: import.meta.env.VITE_ELEVENLABS_API_KEY,
      });

      const audio = await elevenlabs.textToSpeech.convert(
        voiceId,
        {
          text: text,
          modelId: modelId,
          outputFormat: 'mp3_44100_128',
        }
      );

      setIsPlaying(true);
      
      // Create an audio element and play it
      const audioBlob = new Blob([await new Response(audio).arrayBuffer()], { type: 'audio/mpeg' });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audioElement = new Audio(audioUrl);
      
      audioElement.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      audioElement.onerror = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      await audioElement.play();
    } catch (err) {
      console.error('Error playing audio:', err);
      setIsPlaying(false);
    } finally {
      setIsLoading(false);
    }
  }, [isPlaying, isLoading]);

  return { speak, isPlaying, isLoading };
};