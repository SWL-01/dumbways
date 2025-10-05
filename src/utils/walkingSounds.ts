// Sound utility for generating walking sound effects
export class WalkingSoundManager {
  private audioContext: AudioContext | null = null;
  private isPlaying = false;
  private intervalId: number | null = null;
  private footstepCount = 0;

  constructor() {
    // Initialize audio context on first user interaction
    this.initAudioContext();
  }

  private initAudioContext() {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioContext = new AudioContextClass();
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  private async ensureAudioContext() {
    if (!this.audioContext) {
      this.initAudioContext();
    }

    if (this.audioContext && this.audioContext.state === 'suspended') {
      try {
        await this.audioContext.resume();
      } catch (error) {
        console.warn('Could not resume audio context:', error);
      }
    }
  }

  private createFootstepSound() {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filterNode = this.audioContext.createBiquadFilter();

    // Connect the audio nodes
    oscillator.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Alternate between left and right foot sounds
    const isLeftFoot = this.footstepCount % 2 === 0;
    
    // Configure sound parameters
    oscillator.type = 'sawtooth'; // Sawtooth wave for footstep base
    oscillator.frequency.setValueAtTime(
      isLeftFoot ? 80 : 85, // Slight variation between feet
      this.audioContext.currentTime
    );

    // Low-pass filter for muffled effect
    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(200, this.audioContext.currentTime);
    filterNode.Q.setValueAtTime(1, this.audioContext.currentTime);

    // Envelope for natural footstep attack and decay
    const now = this.audioContext.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.1, now + 0.01); // Quick attack
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15); // Decay

    // Play the sound
    oscillator.start(now);
    oscillator.stop(now + 0.15);

    this.footstepCount++;
  }

  async startWalking(speed: number = 200) {
    if (this.isPlaying) return;

    await this.ensureAudioContext();
    if (!this.audioContext) return;

    this.isPlaying = true;
    
    // Adjust footstep interval based on movement speed
    const footstepInterval = Math.max(200, 400 - speed);
    
    this.intervalId = window.setInterval(() => {
      if (this.isPlaying) {
        this.createFootstepSound();
      }
    }, footstepInterval);
  }

  stopWalking() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  // Clean up resources
  destroy() {
    this.stopWalking();
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close();
    }
  }
}

// Singleton instance for global use
export const walkingSoundManager = new WalkingSoundManager();