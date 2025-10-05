import { SceneConfig } from '../types/game';

export const partySceneConfig: SceneConfig = {
  name: 'Party Scene',
  backgroundUrl: '/scenes/party.png',
  npcPosition: { x: 900, y: 500 },
  npcImage: '/assets/characters/ernest.png',
  npcScale: 0.3,
  characterImage: '/assets/characters/ernest.png',
  playerConfig: {
    startX: 200, 
    startY: 600,
  },
  collisionObjects: [
    { x: 680, y: 400, width: 1500, height: 80 },
    { x: 80, y: 550, width: 150, height: 200 },
    { x: 680, y: 600, width: 350, height: 80 },
  ],
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
  characterImage: '/assets/characters/boss.png',
  playerConfig: {
    startX: 120,
    startY: 280,
  },
  collisionObjects: [
    { x: 680, y: 380, width: 960, height: 100 },
    { x: 800, y: 150, width: 850, height: 120 },
    { x: 120, y: 580, width: 60, height: 120 },
    { x: 620, y: 650, width: 350, height: 80 },
  ],
  objects: [
    { 
      x: 350, 
      y: 600, 
      name: 'Colleague', 
      image: '/assets/characters/colleague.png', 
      interaction: 'Have you heard about the company retreat next month? It\'s going to be fun!' ,
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
  characterImage: '/assets/characters/sillygirl.png',
  collisionObjects: [
    { x: 350, y: 550, width: 120, height: 180 },
    { x: 570, y: 550, width: 120, height: 180 },
    { x: 810, y: 550, width: 120, height: 180 },
    { x: 1050, y: 550, width: 120, height: 180 },
    { x: 700, y: 300, width: 250, height: 80 },
  ],
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
  characterImage: '/assets/characters/girlfriend.png',
  playerConfig: {
    startX: 445,
    startY: 570,
  },
  collisionObjects: [
    { x: 470, y: 420, width: 500, height: 60 },
    { x: 320, y: 540, width: 70, height: 40 },
    { x: 680, y: 500, width: 250, height: 40 },
  ],
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
