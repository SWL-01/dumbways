// Game object types
export interface GameObject {
  x: number;
  y: number;
  name: string;
  image?: string;
  interaction?: string;
  scale?: number; // Scale multiplier for the object sprite (default: 2 for images, 1 for default)
  removeWhiteBackground?: boolean; // Attempt to remove white/light backgrounds (experimental)
  alpha?: number; // Opacity: 0 = invisible, 1 = fully visible (default: 1)
  characterImage?: string; // Character portrait for dialogue interactions (if this object represents a character)
}

// Invisible collision object for realistic boundaries
export interface CollisionObject {
  x: number;
  y: number;
  width: number;
  height: number;
  name?: string; // Optional name for debugging
}

// Player configuration
export interface PlayerConfig {
  startX: number;
  startY: number;
  spriteKey: string;
  spriteUrl: string;
  frameWidth: number;
  frameHeight: number;
  scale: number;
  speed: number;
  collisionBoxWidth: number;
  collisionBoxHeight: number;
  collisionOffsetX: number;
  collisionOffsetY: number;
}

// NPC configuration
export interface NPCConfig {
  x: number;
  y: number;
  name: string;
  spriteKey?: string;
  spriteUrl?: string;
}

// Scene configuration for each game scenario
export interface SceneConfig {
  name: string;
  backgroundUrl: string;
  npcPosition: { x: number; y: number };
  npcImage?: string; // Custom NPC sprite image path
  npcScale?: number; // Scale for NPC sprite (default: 0.15 for custom images)
  characterImage?: string; // Character portrait for dialogue (visual novel style)
  objects: GameObject[];
  collisionObjects?: CollisionObject[]; // Invisible collision boundaries for realistic game design
  playerConfig?: Partial<PlayerConfig>;
}

// Boundary configuration
export interface BoundaryConfig {
  margin: number;
  thickness: number;
}

// Game dimensions
export interface GameDimensions {
  width: number;
  height: number;
}

// Props for individual scene components
export interface SceneGameScreenProps<T = unknown> {
  question: T;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (dimension: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P') => void;
}

// Default configurations
export const DEFAULT_PLAYER_CONFIG: PlayerConfig = {
  startX: 150,
  startY: 450,
  spriteKey: 'player',
  spriteUrl: '/assets/characters/player.png',
  frameWidth: 32,
  frameHeight: 32,
  scale: 4,
  speed: 180,
  collisionBoxWidth: 24,
  collisionBoxHeight: 24,
  collisionOffsetX: 4,
  collisionOffsetY: 8,
};

export const DEFAULT_GAME_DIMENSIONS: GameDimensions = {
  width: 1400,
  height: 800,
};

export const DEFAULT_BOUNDARY_CONFIG: BoundaryConfig = {
  margin: 50,
  thickness: 20,
};
