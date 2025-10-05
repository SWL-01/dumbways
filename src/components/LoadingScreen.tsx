interface LoadingScreenProps {
  currentQuestion: number;
  totalQuestions: number;
}

export function LoadingScreen({ currentQuestion, totalQuestions }: LoadingScreenProps) {
  const progress = Math.round((currentQuestion / totalQuestions) * 100);

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <span className="loading-text">Loading</span>
        <span className="loading-dots">
          <span className="dot dot-1">.</span>
          <span className="dot dot-2">.</span>
          <span className="dot dot-3">.</span>
        </span>
        <span className="loading-progress">{progress}%</span>
      </div>
    </div>
  );
}