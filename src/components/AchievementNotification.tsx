import { useEffect, useState } from 'react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export function AchievementNotification() {
  const [achievement, setAchievement] = useState<Achievement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleAchievement = (event: CustomEvent<Achievement>) => {
      setAchievement(event.detail);
      setIsVisible(true);
      
      // Auto-hide after 5 seconds
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setAchievement(null), 300);
      }, 5000);
    };

    window.addEventListener('achievement-unlocked', handleAchievement as EventListener);
    
    return () => {
      window.removeEventListener('achievement-unlocked', handleAchievement as EventListener);
    };
  }, []);

  if (!achievement) return null;

  return (
    <div 
      className={`fixed top-6 right-6 z-50 transform transition-all duration-300 ${
        isVisible 
          ? 'translate-x-0 opacity-100 scale-100' 
          : 'translate-x-full opacity-0 scale-95'
      }`}
    >
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-lg p-4 shadow-lg max-w-sm">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{achievement.icon}</div>
          <div className="flex-1">
            <div className="font-bold text-lg">Achievement Unlocked!</div>
            <div className="font-semibold">{achievement.name}</div>
            <div className="text-sm opacity-80">{achievement.description}</div>
          </div>
          <div className="text-2xl">🎉</div>
        </div>
        
        {/* Celebration particles */}
        <div className="absolute -top-2 -right-2 text-yellow-300 animate-bounce">✨</div>
        <div className="absolute -top-1 -left-1 text-orange-300 animate-bounce delay-100">⭐</div>
        <div className="absolute -bottom-1 -right-1 text-yellow-400 animate-bounce delay-200">💫</div>
      </div>
      
      {/* Progress bar */}
      <div className="mt-2 bg-black bg-opacity-20 rounded-full h-1 overflow-hidden">
        <div className="bg-white h-full animate-pulse"></div>
      </div>
    </div>
  );
}