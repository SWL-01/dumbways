// Fun game features and achievements system
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  hidden?: boolean;
}

export interface GameStats {
  questionsAnswered: number;
  npcInteractions: number;
  objectsExamined: number;
  secretsFound: number;
  timeSpent: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_steps',
    name: 'First Steps',
    description: 'Started your personality journey',
    icon: '👣',
    unlocked: false
  },
  {
    id: 'social_butterfly',
    name: 'Social Butterfly',
    description: 'Talked to 5 different characters',
    icon: '🦋',
    unlocked: false
  },
  {
    id: 'detective',
    name: 'Detective',
    description: 'Examined 10 objects',
    icon: '🕵️',
    unlocked: false
  },
  {
    id: 'secret_finder',
    name: 'Secret Finder',
    description: 'Found a hidden easter egg',
    icon: '🥚',
    unlocked: false,
    hidden: true
  },
  {
    id: 'speed_runner',
    name: 'Speed Runner',
    description: 'Completed the test in under 2 minutes',
    icon: '⚡',
    unlocked: false
  },
  {
    id: 'explorer',
    name: 'Explorer',
    description: 'Visited every corner of all scenes',
    icon: '🗺️',
    unlocked: false
  },
  {
    id: 'chatter',
    name: 'Chatterbox',
    description: 'Used text-to-speech 20 times',
    icon: '💬',
    unlocked: false
  },
  {
    id: 'completionist',
    name: 'Completionist',
    description: 'Finished the personality test',
    icon: '🏆',
    unlocked: false
  }
];

export const FUN_REACTIONS = [
  '🎉', '✨', '🌟', '💫', '🎊', '🎈', '🎁', '💎', '🔥', '⭐'
];

export const NPC_REACTIONS = {
  excited: ['😄', '🤩', '😍', '🥳', '😁'],
  thoughtful: ['🤔', '💭', '🧐', '😌', '🤨'],
  surprised: ['😲', '😮', '🤯', '😱', '👀'],
  happy: ['😊', '😀', '🙂', '😃', '😆'],
  confused: ['😕', '🤷', '😵', '😐', '🫤']
};

export class GameEnhancer {
  private static instance: GameEnhancer;
  private achievements: Achievement[] = [...ACHIEVEMENTS];
  private stats: GameStats = {
    questionsAnswered: 0,
    npcInteractions: 0,
    objectsExamined: 0,
    secretsFound: 0,
    timeSpent: 0
  };
  private startTime: number = Date.now();
  private particleContainer: HTMLElement | null = null;

  static getInstance(): GameEnhancer {
    if (!GameEnhancer.instance) {
      GameEnhancer.instance = new GameEnhancer();
    }
    return GameEnhancer.instance;
  }

  initParticleContainer(container: HTMLElement) {
    this.particleContainer = container;
  }

  // Create celebration particles
  createParticles(x: number, y: number, type: 'celebration' | 'interaction' | 'achievement' = 'interaction') {
    if (!this.particleContainer) return;

    const particleCount = type === 'achievement' ? 15 : type === 'celebration' ? 20 : 8;
    const particles = type === 'achievement' ? ['🏆', '⭐', '✨'] : 
                     type === 'celebration' ? FUN_REACTIONS : 
                     ['✨', '💫', '⭐'];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute pointer-events-none text-2xl select-none z-50';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.textContent = particles[Math.floor(Math.random() * particles.length)];
      
      // Random animation
      const angle = (Math.PI * 2 * i) / particleCount;
      const velocity = 50 + Math.random() * 100;
      const deltaX = Math.cos(angle) * velocity;
      const deltaY = Math.sin(angle) * velocity - 50; // Slight upward bias
      
      particle.style.transform = 'translate(-50%, -50%)';
      particle.style.animation = `particle-${type} 1.5s ease-out forwards`;
      
      // Set CSS custom properties for animation
      particle.style.setProperty('--deltaX', `${deltaX}px`);
      particle.style.setProperty('--deltaY', `${deltaY}px`);
      
      this.particleContainer.appendChild(particle);
      
      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 1500);
    }
  }

  // Track interactions and unlock achievements
  trackInteraction(type: 'npc' | 'object' | 'question' | 'secret' | 'tts') {
    switch (type) {
      case 'npc':
        this.stats.npcInteractions++;
        this.checkAchievement('social_butterfly', () => this.stats.npcInteractions >= 5);
        break;
      case 'object':
        this.stats.objectsExamined++;
        this.checkAchievement('detective', () => this.stats.objectsExamined >= 10);
        break;
      case 'question':
        this.stats.questionsAnswered++;
        this.checkAchievement('first_steps', () => this.stats.questionsAnswered >= 1);
        break;
      case 'secret':
        this.stats.secretsFound++;
        this.checkAchievement('secret_finder', () => this.stats.secretsFound >= 1);
        break;
      case 'tts': {
        // Track TTS usage for chatterbox achievement
        const ttsCount = (localStorage.getItem('tts_usage_count') || '0');
        const newCount = parseInt(ttsCount) + 1;
        localStorage.setItem('tts_usage_count', newCount.toString());
        this.checkAchievement('chatter', () => newCount >= 20);
        break;
      }
    }
  }

  private checkAchievement(achievementId: string, condition: () => boolean) {
    const achievement = this.achievements.find(a => a.id === achievementId);
    if (achievement && !achievement.unlocked && condition()) {
      achievement.unlocked = true;
      this.showAchievementNotification(achievement);
      // Create achievement particles at center of screen
      if (this.particleContainer) {
        const rect = this.particleContainer.getBoundingClientRect();
        this.createParticles(rect.width / 2, rect.height / 2, 'achievement');
      }
    }
  }

  private showAchievementNotification(achievement: Achievement) {
    // Create achievement toast notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-lg shadow-2xl z-50 transform translate-x-full transition-transform duration-300';
    notification.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="text-2xl">${achievement.icon}</span>
        <div>
          <div class="font-bold">Achievement Unlocked!</div>
          <div class="text-sm opacity-90">${achievement.name}</div>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Slide in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Slide out and remove
    setTimeout(() => {
      notification.style.transform = 'translateX(full)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);

    // Play achievement sound
    this.playAchievementSound();
  }

  private playAchievementSound() {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioContext = new AudioContextClass();
      
      // Create a cheerful achievement sound
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Achievement melody: C-E-G-C (major chord arpeggio)
      const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5
      let noteIndex = 0;
      
      const playNote = () => {
        if (noteIndex < notes.length) {
          oscillator.frequency.setValueAtTime(notes[noteIndex], audioContext.currentTime);
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
          noteIndex++;
          setTimeout(playNote, 150);
        }
      };
      
      oscillator.type = 'triangle';
      oscillator.start();
      oscillator.stop(audioContext.currentTime + 1);
      playNote();
    } catch (error) {
      console.warn('Could not play achievement sound:', error);
    }
  }

  getStats(): GameStats {
    return { ...this.stats };
  }

  getAchievements(): Achievement[] {
    return this.achievements.filter(a => !a.hidden || a.unlocked);
  }

  getRandomReaction(type: keyof typeof NPC_REACTIONS): string {
    const reactions = NPC_REACTIONS[type];
    return reactions[Math.floor(Math.random() * reactions.length)];
  }

  // Add completion tracking
  completeTest() {
    const totalTime = Date.now() - this.startTime;
    this.stats.timeSpent = totalTime;
    
    this.checkAchievement('completionist', () => true);
    this.checkAchievement('speed_runner', () => totalTime < 2 * 60 * 1000); // 2 minutes
  }
}

export const gameEnhancer = GameEnhancer.getInstance();