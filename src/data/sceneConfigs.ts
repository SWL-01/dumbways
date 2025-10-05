import { SceneConfig } from '../types/game';

export const partySceneConfig: SceneConfig = {
  name: 'Party Scene',
  backgroundUrl: '/scenes/party.png',
  npcPosition: { x: 900, y: 500 },
  npcImage: '/assets/characters/ernest.png',
  npcScale: 0.3,
  playerConfig: {
    startX: 200, 
    startY: 600,
  },
  objects: [
    { 
      x: 680, 
      y: 550, 
      name: 'Snack Table', 
      image: '', 
      interaction: 'The snacks look delicious! There are chips, dips, and some cookies.',
      alpha: 0  
    },
    { 
      x: 300, 
      y: 500, 
      name: 'Siwoon', 
      image: '/assets/characters/siwoon.png', 
      interaction: '"Hey! Great party, right? I\'m having a blast!"',
      scale: 0.15,
    },
    { 
      x: 520, 
      y: 400, 
      name: 'Cullen', 
      image: '/assets/characters/cullen.png', 
      interaction: '"This music is amazing! Want to dance?"',
      scale: 0.3,
    },
  ],
};

export const officeSceneConfig: SceneConfig = {
  name: 'Office Meeting Room',
  backgroundUrl: '/scenes/office.png',
  npcPosition: { x: 1150, y: 600 },
  npcImage: '/assets/characters/boss.png',
  npcScale: 0.4,
  playerConfig: {
    startX: 120,
    startY: 280,
  },
  objects: [
    { 
      x: 350, 
      y: 600, 
      name: 'Colleague', 
      image: '/assets/characters/colleague.png', 
      interaction: 'Have you heared about the company retreat next month? It\'s going to be fun!' ,
      scale: 0.15,
    },
  ],
};

export const classroomSceneConfig: SceneConfig = {
  name: 'Classroom',
  backgroundUrl: '/scenes/classroom.png',
  npcPosition: { x: 1000, y: 400 },
  npcImage: '/assets/characters/sillygirl.png',
  npcScale: 0.25,
  objects: [
    { 
      x: 300, 
      y: 400, 
      name: 'Classmate', 
      image: '/assets/characters/classmate.png', 
      interaction: 'How was test? I think I did okay, but that last question was tricky.' ,
      scale: 0.25,
    },
    { 
      x: 700, 
      y: 250, 
      name: 'Teacher', 
      image: '/assets/characters/teacher.png', 
      interaction: 'Remember to review the feedback on your test.' ,
      scale: 0.30,
    },
  ],
};

export const coffeeShopSceneConfig: SceneConfig = {
  name: 'Coffee Shop',
  backgroundUrl: '/scenes/coffeshop.png',
  npcPosition: { x: 850, y: 500 },
  npcImage: '/assets/characters/girlfriend.png',
  npcScale: 0.3,
  objects: [
    { 
      x: 445, 
      y: 400, 
      name: 'Counter employee', 
      image: 'assets/characters/counter.png', 
      interaction: "Welcome! What can I get started for you today?" ,
      scale: 0.3,
    },
  ],
};

// Map of animation names to scene configs
export const sceneConfigMap: Record<string, SceneConfig> = {
  party: partySceneConfig,
  planning: officeSceneConfig,
  listening: coffeeShopSceneConfig,
  learning: classroomSceneConfig,
};
