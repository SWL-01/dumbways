import { SceneConfig } from '../types/game';

export const partySceneConfig: SceneConfig = {
  name: 'Party Scene',
  backgroundUrl: '/scenes/party.png',
  npcPosition: { x: 620, y: 320 },
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
      x: 300, 
      y: 200, 
      name: 'Cullen', 
      image: '/characters/cullen.png', 
      interaction: '"This music is amazing! Want to dance?"'
    },
  ],
};

export const officeSceneConfig: SceneConfig = {
  name: 'Office Meeting Room',
  backgroundUrl: '/scenes/office.png',
  npcPosition: { x: 650, y: 280 },
  objects: [
    { 
      x: 500, 
      y: 300, 
      name: 'Conference Table', 
      image: '/objects/desk.png', 
      interaction: 'A large conference table with meeting notes scattered around.' 
    },
    { 
      x: 350, 
      y: 400, 
      name: 'Whiteboard', 
      image: '/objects/whiteboard.png', 
      interaction: 'The whiteboard shows a detailed project timeline with tasks and deadlines.' 
    },
  ],
};

export const workshopSceneConfig: SceneConfig = {
  name: 'Workshop',
  backgroundUrl: '/scenes/workshop.png',
  npcPosition: { x: 550, y: 320 },
  objects: [
    { 
      x: 400, 
      y: 380, 
      name: 'Toolbox', 
      image: '/objects/toolbox.png', 
      interaction: 'A well-organized toolbox filled with wrenches, screwdrivers, and other repair tools.' 
    },
    { 
      x: 700, 
      y: 280, 
      name: 'Workbench', 
      image: '/objects/workbench.png', 
      interaction: 'A sturdy workbench with a project in progress. Looks like someone is building something.' 
    },
  ],
};

export const coffeeShopSceneConfig: SceneConfig = {
  name: 'Coffee Shop',
  backgroundUrl: '/scenes/coffee.png',
  npcPosition: { x: 580, y: 310 },
  objects: [
    { 
      x: 450, 
      y: 350, 
      name: 'Coffee Table', 
      image: '/objects/table.png', 
      interaction: 'A cozy coffee table with two cups of freshly brewed coffee.' 
    },
    { 
      x: 700, 
      y: 250, 
      name: 'Counter', 
      image: '/objects/counter.png', 
      interaction: 'The counter displays various pastries and the aroma of fresh coffee fills the air.' 
    },
  ],
};

export const livingRoomSceneConfig: SceneConfig = {
  name: 'Living Room',
  backgroundUrl: '/scenes/livingroom.png',
  npcPosition: { x: 620, y: 290 },
  objects: [
    { 
      x: 500, 
      y: 340, 
      name: 'Sofa', 
      image: '/objects/couch.png', 
      interaction: 'A comfortable sofa perfect for lounging and relaxing on the weekend.' 
    },
    { 
      x: 380, 
      y: 280, 
      name: 'TV', 
      image: '/objects/tv.png', 
      interaction: 'The TV is showing your favorite series. Very tempting to binge-watch!' 
    },
  ],
};

export const librarySceneConfig: SceneConfig = {
  name: 'Library',
  backgroundUrl: '/scenes/library.png',
  npcPosition: { x: 590, y: 300 },
  objects: [
    { 
      x: 450, 
      y: 350, 
      name: 'Bookshelf', 
      image: '/objects/bookshelf.png', 
      interaction: 'Shelves filled with books on philosophy, fiction, science, and more.' 
    },
    { 
      x: 720, 
      y: 270, 
      name: 'Reading Chair', 
      image: '/objects/chair.png', 
      interaction: 'A comfy reading chair with good lighting. Perfect spot to dive into a book.' 
    },
  ],
};

export const parkSceneConfig: SceneConfig = {
  name: 'Park Bench',
  backgroundUrl: '/scenes/park.png',
  npcPosition: { x: 600, y: 310 },
  objects: [
    { 
      x: 500, 
      y: 370, 
      name: 'Park Bench', 
      image: '/objects/bench.png', 
      interaction: 'A peaceful bench overlooking the park. Great place to sit and think.' 
    },
    { 
      x: 350, 
      y: 290, 
      name: 'Tree', 
      image: '/objects/tree.png', 
      interaction: 'A large oak tree providing shade. Birds are chirping in its branches.' 
    },
  ],
};

export const travelAgencySceneConfig: SceneConfig = {
  name: 'Travel Agency',
  backgroundUrl: '/scenes/travel.png',
  npcPosition: { x: 610, y: 295 },
  objects: [
    { 
      x: 480, 
      y: 340, 
      name: 'Travel Desk', 
      image: '/objects/desk.png', 
      interaction: 'Brochures for exotic destinations are spread across the desk.' 
    },
    { 
      x: 700, 
      y: 260, 
      name: 'World Map', 
      image: '/objects/map.png', 
      interaction: 'A world map with pins marking popular vacation spots. Where would you go?' 
    },
  ],
};

export const conferenceSceneConfig: SceneConfig = {
  name: 'Conference Hall',
  backgroundUrl: '/scenes/conference.png',
  npcPosition: { x: 580, y: 305 },
  objects: [
    { 
      x: 500, 
      y: 350, 
      name: 'Podium', 
      image: '/objects/podium.png', 
      interaction: 'A speaker\'s podium with a microphone. Ready for a presentation.' 
    },
    { 
      x: 650, 
      y: 280, 
      name: 'Projector', 
      image: '/objects/projector.png', 
      interaction: 'The projector displays slides for the upcoming meeting.' 
    },
  ],
};

export const classroomSceneConfig: SceneConfig = {
  name: 'Classroom',
  backgroundUrl: '/scenes/classroom.png',
  npcPosition: { x: 590, y: 300 },
  objects: [
    { 
      x: 450, 
      y: 360, 
      name: 'Student Desk', 
      image: '/objects/desk.png', 
      interaction: 'A student desk with textbooks and notes. Someone has been studying hard.' 
    },
    { 
      x: 700, 
      y: 250, 
      name: 'Blackboard', 
      image: '/objects/blackboard.png', 
      interaction: 'The blackboard shows complex equations and diagrams from today\'s lesson.' 
    },
  ],
};

export const cubicleSceneConfig: SceneConfig = {
  name: 'Office Cubicle',
  backgroundUrl: '/scenes/cubicle.png',
  npcPosition: { x: 600, y: 310 },
  objects: [
    { 
      x: 500, 
      y: 350, 
      name: 'Work Desk', 
      image: '/objects/desk.png', 
      interaction: 'Your work desk with a to-do list and some feedback reports.' 
    },
    { 
      x: 380, 
      y: 290, 
      name: 'Computer', 
      image: '/objects/computer.png', 
      interaction: 'Your computer screen shows an email with constructive feedback from your manager.' 
    },
  ],
};

export const messyRoomSceneConfig: SceneConfig = {
  name: 'Messy Room',
  backgroundUrl: '/scenes/messyroom.png',
  npcPosition: { x: 570, y: 315 },
  objects: [
    { 
      x: 450, 
      y: 370, 
      name: 'Clothes Pile', 
      image: '/objects/pile.png', 
      interaction: 'A mountain of clothes waiting to be sorted. Should probably organize this...' 
    },
    { 
      x: 680, 
      y: 270, 
      name: 'Unmade Bed', 
      image: '/objects/bed.png', 
      interaction: 'An unmade bed with tangled sheets. Cleaning can wait, right?' 
    },
  ],
};

// Map of animation names to scene configs
export const sceneConfigMap: Record<string, SceneConfig> = {
  party: partySceneConfig,
  planning: officeSceneConfig,
  problem: workshopSceneConfig,
  listening: coffeeShopSceneConfig,
  weekend: livingRoomSceneConfig,
  reading: librarySceneConfig,
  comfort: parkSceneConfig,
  vacation: travelAgencySceneConfig,
  meeting: conferenceSceneConfig,
  learning: classroomSceneConfig,
  criticism: cubicleSceneConfig,
  mess: messyRoomSceneConfig,
};
