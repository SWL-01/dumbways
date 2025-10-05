import { useState, useEffect } from 'react';
import { StartScreen } from './components/StartScreen';
import { IsometricGameScreen } from './components/IsometricGameScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { LoadingScreen } from './components/LoadingScreen';
import { mbtiQuestions } from './data/questions';
import { personalityTypes } from './data/personalities';
import { MBTIScores } from './types/mbti';
import { calculateMBTIType, generateSessionId } from './utils/mbtiCalculator';

type Screen = 'start' | 'question' | 'questionLoading' | 'results';

function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sessionId, setSessionId] = useState<string>('');
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>('pFZP5JQG7iQjIQuC4Bku'); // Default to Lily
  const [scores, setScores] = useState<MBTIScores>({
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  });
  const [personalityType, setPersonalityType] = useState<string>('');

  useEffect(() => {
    setSessionId(generateSessionId());
  }, []);

  // Handle loading screen transitions
  useEffect(() => {
    if (screen === 'questionLoading') {
      const timer = setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setScreen('question');
      }, 2000); // 2 second loading screen

      return () => clearTimeout(timer);
    }
  }, [screen, currentQuestionIndex]);

  const handleStart = (age?: number) => {
    if (age) {
      console.log('User age:', age); // TODO: Store age for AI analysis
    }
    setScreen('question');
    setCurrentQuestionIndex(0);
    setScores({
      E: 0,
      I: 0,
      S: 0,
      N: 0,
      T: 0,
      F: 0,
      J: 0,
      P: 0,
    });
  };

  const handleAnswer = (dimension: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P') => {
    const newScores = {
      ...scores,
      [dimension]: scores[dimension] + 1,
    };
    setScores(newScores);

    if (currentQuestionIndex < mbtiQuestions.length - 1) {
      // Show loading screen before next question
      setScreen('questionLoading');
    } else {
      const type = calculateMBTIType(newScores);
      setPersonalityType(type);

      saveResults(type, newScores);

      setScreen('results');
    }
  };

  const saveResults = async (type: string, finalScores: MBTIScores) => {
    // Database saving removed - not needed
    console.log('Results:', { type, finalScores, sessionId });
  };

  const handleRestart = () => {
    setSessionId(generateSessionId());
    setScreen('start');
    setCurrentQuestionIndex(0);
    setScores({
      E: 0,
      I: 0,
      S: 0,
      N: 0,
      T: 0,
      F: 0,
      J: 0,
      P: 0,
    });
    setPersonalityType('');
  };

  return (
    <>
      {screen === 'start' && (
        <StartScreen 
          onStart={handleStart} 
          selectedVoiceId={selectedVoiceId}
          onVoiceSelect={setSelectedVoiceId}
        />
      )}

      {screen === 'question' && (
        <IsometricGameScreen
          question={mbtiQuestions[currentQuestionIndex]}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={mbtiQuestions.length}
          onAnswer={handleAnswer}
          voiceId={selectedVoiceId}
        />
      )}

      {screen === 'questionLoading' && (
        <LoadingScreen
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={mbtiQuestions.length}
        />
      )}

      {screen === 'results' && personalityType && (
        <ResultsScreen
          personality={personalityTypes[personalityType]}
          scores={scores}
          onRestart={handleRestart}
          voiceId={selectedVoiceId}
        />
      )}
    </>
  );
}

export default App;
