import { useState, useEffect } from 'react';
import { StartScreen } from './components/StartScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { mbtiQuestions } from './data/questions';
import { personalityTypes } from './data/personalities';
import { MBTIScores } from './types/mbti';
import { calculateMBTIType, generateSessionId } from './utils/mbtiCalculator';
import { supabase } from './lib/supabase';

type Screen = 'start' | 'question' | 'results';

function App() {
  const [screen, setScreen] = useState<Screen>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [sessionId, setSessionId] = useState<string>('');
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

  const handleStart = () => {
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
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const type = calculateMBTIType(newScores);
      setPersonalityType(type);

      saveResults(type, newScores);

      setScreen('results');
    }
  };

  const saveResults = async (type: string, finalScores: MBTIScores) => {
    try {
      await supabase.from('mbti_results').insert({
        personality_type: type,
        scores: finalScores,
        session_id: sessionId,
      });
    } catch (error) {
      console.error('Error saving results:', error);
    }
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
      {screen === 'start' && <StartScreen onStart={handleStart} />}

      {screen === 'question' && (
        <QuestionScreen
          question={mbtiQuestions[currentQuestionIndex]}
          currentQuestion={currentQuestionIndex + 1}
          totalQuestions={mbtiQuestions.length}
          onAnswer={handleAnswer}
        />
      )}

      {screen === 'results' && personalityType && (
        <ResultsScreen
          personality={personalityTypes[personalityType]}
          scores={scores}
          onRestart={handleRestart}
        />
      )}
    </>
  );
}

export default App;
