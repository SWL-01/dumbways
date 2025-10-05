import { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import { MBTIQuestion } from '../types/mbti';
import { DialogueBox } from './DialogueBox';

interface IsometricGameScreenProps {
  question: MBTIQuestion;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (dimension: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P') => void;
  voiceId?: string;
}

// Scene configurations for each scenario type
const sceneConfigs: Record<string, {
  name: string;
  backgroundUrl: string;
  npcPosition: { x: number; y: number };
  objects: Array<{ x: number; y: number; type: string; name: string }>;
}> = {
  party: {
    name: 'Party Scene',
    backgroundUrl: '/scenes/party.png',
    npcPosition: { x: 600, y: 300 },
    objects: [
      { x: 400, y: 350, type: 'table', name: 'Snack Table' },
      { x: 750, y: 250, type: 'couch', name: 'Couch' },
      { x: 300, y: 200, type: 'music', name: 'Music System' },
    ],
  },
  planning: {
    name: 'Office Meeting Room',
    backgroundUrl: '/scenes/office.png',
    npcPosition: { x: 650, y: 280 },
    objects: [
      { x: 500, y: 300, type: 'desk', name: 'Conference Table' },
      { x: 350, y: 400, type: 'whiteboard', name: 'Whiteboard' },
    ],
  },
  problem: {
    name: 'Workshop',
    backgroundUrl: '/scenes/workshop.png',
    npcPosition: { x: 550, y: 320 },
    objects: [
      { x: 400, y: 380, type: 'toolbox', name: 'Toolbox' },
      { x: 700, y: 280, type: 'workbench', name: 'Workbench' },
    ],
  },
  listening: {
    name: 'Coffee Shop',
    backgroundUrl: '/scenes/coffee.png',
    npcPosition: { x: 580, y: 310 },
    objects: [
      { x: 450, y: 350, type: 'table', name: 'Coffee Table' },
      { x: 700, y: 250, type: 'counter', name: 'Counter' },
    ],
  },
  weekend: {
    name: 'Living Room',
    backgroundUrl: '/scenes/livingroom.png',
    npcPosition: { x: 620, y: 290 },
    objects: [
      { x: 500, y: 340, type: 'couch', name: 'Sofa' },
      { x: 380, y: 280, type: 'tv', name: 'TV' },
    ],
  },
  reading: {
    name: 'Library',
    backgroundUrl: '/scenes/library.png',
    npcPosition: { x: 590, y: 300 },
    objects: [
      { x: 450, y: 350, type: 'bookshelf', name: 'Bookshelf' },
      { x: 720, y: 270, type: 'reading_chair', name: 'Reading Chair' },
    ],
  },
  comfort: {
    name: 'Park Bench',
    backgroundUrl: '/scenes/park.png',
    npcPosition: { x: 600, y: 310 },
    objects: [
      { x: 500, y: 370, type: 'bench', name: 'Park Bench' },
      { x: 350, y: 290, type: 'tree', name: 'Tree' },
    ],
  },
  vacation: {
    name: 'Travel Agency',
    backgroundUrl: '/scenes/travel.png',
    npcPosition: { x: 610, y: 295 },
    objects: [
      { x: 480, y: 340, type: 'desk', name: 'Travel Desk' },
      { x: 700, y: 260, type: 'map', name: 'World Map' },
    ],
  },
  meeting: {
    name: 'Conference Hall',
    backgroundUrl: '/scenes/conference.png',
    npcPosition: { x: 580, y: 305 },
    objects: [
      { x: 500, y: 350, type: 'podium', name: 'Podium' },
      { x: 650, y: 280, type: 'projector', name: 'Projector' },
    ],
  },
  learning: {
    name: 'Classroom',
    backgroundUrl: '/scenes/classroom.png',
    npcPosition: { x: 590, y: 300 },
    objects: [
      { x: 450, y: 360, type: 'desk', name: 'Student Desk' },
      { x: 700, y: 250, type: 'blackboard', name: 'Blackboard' },
    ],
  },
  criticism: {
    name: 'Office Cubicle',
    backgroundUrl: '/scenes/cubicle.png',
    npcPosition: { x: 600, y: 310 },
    objects: [
      { x: 500, y: 350, type: 'desk', name: 'Work Desk' },
      { x: 380, y: 290, type: 'computer', name: 'Computer' },
    ],
  },
  mess: {
    name: 'Messy Room',
    backgroundUrl: '/scenes/messyroom.png',
    npcPosition: { x: 570, y: 315 },
    objects: [
      { x: 450, y: 370, type: 'pile', name: 'Clothes Pile' },
      { x: 680, y: 270, type: 'bed', name: 'Unmade Bed' },
    ],
  },
};

export function IsometricGameScreen({
  question,
  currentQuestion,
  totalQuestions,
  onAnswer,
  voiceId,
}: IsometricGameScreenProps) {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const phaserGameRef = useRef<Phaser.Game | null>(null);
  const [showDialogue, setShowDialogue] = useState(false);
  const [npcName, setNpcName] = useState('Character');

  useEffect(() => {
    if (!gameContainerRef.current) return;

    const sceneConfig = sceneConfigs[question.animation] || sceneConfigs.party;
    setNpcName(sceneConfig.name);

    // Phaser game configuration
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 1000,
      height: 600,
      parent: gameContainerRef.current,
      backgroundColor: '#2d2d2d',
      pixelArt: true, // Enable pixel-perfect rendering
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: false,
        },
      },
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };

    let player: Phaser.Physics.Arcade.Sprite;
    let npc: Phaser.Physics.Arcade.Sprite;
    let interactiveObjects: Phaser.Physics.Arcade.Sprite[] = [];
    let interactionPrompt: Phaser.GameObjects.Text;
    let nearestInteractive: Phaser.Physics.Arcade.Sprite | null = null;
    let cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    let keyW: Phaser.Input.Keyboard.Key;
    let keyA: Phaser.Input.Keyboard.Key;
    let keyS: Phaser.Input.Keyboard.Key;
    let keyD: Phaser.Input.Keyboard.Key;

    function preload(this: Phaser.Scene) {
      // Load background
      this.load.image('background', sceneConfig.backgroundUrl);

      // Load custom player sprite as spritesheet (4x4 grid)
      // Frame layout based on the attached image:
      // Row 0 (frames 0-3): Down-facing positions
      // Row 1 (frames 4-7): Down-Right diagonal positions  
      // Row 2 (frames 8-11): Right-facing positions
      // Row 3 (frames 12-15): Up-Right diagonal positions
      // (Pattern continues for all 8 directions in a 4x4 or larger grid)
      try {
        this.load.spritesheet('player', '/assets/characters/player.png', {
          frameWidth: 32,  // Each character is 32x32 in the grid
          frameHeight: 32,
        });
      } catch (e) {
        // Fallback to colored square
        const graphics = this.add.graphics();
        graphics.fillStyle(0x4a9eff, 1);
        graphics.fillRect(0, 0, 128, 128);
        graphics.generateTexture('player', 128, 128);
        graphics.clear();
        graphics.destroy();
      }

      // NPC sprite (orange) - static for now
      const graphics = this.add.graphics();
      graphics.fillStyle(0xff9d4a, 1);
      graphics.fillRect(0, 0, 24, 36);
      graphics.generateTexture('npc', 24, 36);
      graphics.clear();

      // Interactive objects
      graphics.fillStyle(0x4aff9d, 1);
      graphics.fillRect(0, 0, 30, 30);
      graphics.generateTexture('object', 30, 30);
      graphics.clear();

      graphics.destroy();
    }

    function create(this: Phaser.Scene) {
      // Add background with fallback color
      const bg = this.add.rectangle(500, 300, 1000, 600, 0x1a1a1a);
      
      // Try to load the background image
      try {
        const bgImage = this.add.image(500, 300, 'background');
        bgImage.setDisplaySize(1000, 600);
      } catch (e) {
        console.log('Background image not loaded, using fallback');
      }

      // Add floor grid for 2.5D effect
      const gridGraphics = this.add.graphics();
      gridGraphics.lineStyle(1, 0x444444, 0.3);
      
      // Draw isometric grid
      for (let i = 0; i < 20; i++) {
        gridGraphics.moveTo(i * 50, 100);
        gridGraphics.lineTo(i * 50, 550);
      }
      for (let i = 2; i < 12; i++) {
        gridGraphics.moveTo(0, i * 50);
        gridGraphics.lineTo(1000, i * 50);
      }
      gridGraphics.strokePath();

      // Create interactive objects
      sceneConfig.objects.forEach((objConfig) => {
        const obj = this.physics.add.sprite(objConfig.x, objConfig.y, 'object');
        obj.setInteractive();
        obj.setData('name', objConfig.name);
        obj.setData('type', objConfig.type);
        obj.setDepth(objConfig.y); // Pseudo-isometric depth sorting
        interactiveObjects.push(obj);

        // Add label
        const label = this.add.text(objConfig.x, objConfig.y - 30, objConfig.name, {
          fontSize: '12px',
          color: '#ffffff',
          backgroundColor: '#000000',
          padding: { x: 4, y: 2 },
        });
        label.setOrigin(0.5);
        label.setAlpha(0.7);
      });

      // Create NPC
      npc = this.physics.add.sprite(
        sceneConfig.npcPosition.x,
        sceneConfig.npcPosition.y,
        'npc'
      );
      npc.setData('name', 'NPC');
      npc.setDepth(sceneConfig.npcPosition.y);

      // Add NPC label
      const npcLabel = this.add.text(npc.x, npc.y - 35, '❗ Talk', {
        fontSize: '14px',
        color: '#ffeb3b',
        backgroundColor: '#000000',
        padding: { x: 6, y: 3 },
      });
      npcLabel.setOrigin(0.5);

      // Create player
      player = this.physics.add.sprite(150, 450, 'player', 0);
      player.setCollideWorldBounds(true);
      player.setDepth(1000); // Always on top initially
      player.setScale(4); // Scale up 4x (32px → 128px)
      
      // Ensure physics body is properly set up
      const body = player.body as Phaser.Physics.Arcade.Body;
      body.setCollideWorldBounds(true);
      body.setSize(24, 24); // Collision box size (smaller than visual)
      body.setOffset(4, 8); // Center collision box on character feet

      // Log spritesheet info
      if (this.textures.exists('player')) {
        const texture = this.textures.get('player');
        console.log('Player spritesheet loaded. Total frames:', texture.frameTotal);
      }

      // Interaction prompt
      interactionPrompt = this.add.text(0, 0, 'Press E or SPACE', {
        fontSize: '16px',
        color: '#ffffff',
        backgroundColor: '#000000',
        padding: { x: 8, y: 4 },
      });
      interactionPrompt.setOrigin(0.5);
      interactionPrompt.setVisible(false);
      interactionPrompt.setDepth(2000);

      // Setup WASD keyboard controls
      cursors = this.input.keyboard!.createCursorKeys();
      keyW = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      keyA = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A);
      keyS = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.S);
      keyD = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D);

      // Keyboard interaction
      this.input.keyboard!.on('keydown-E', () => {
        if (nearestInteractive && !showDialogue) {
          setShowDialogue(true);
        }
      });

      this.input.keyboard!.on('keydown-SPACE', () => {
        if (nearestInteractive && !showDialogue) {
          setShowDialogue(true);
        }
      });
    }

    function update(this: Phaser.Scene) {
      if (!player) return;

      const speed = 180;
      
      // Update depth for pseudo-isometric sorting
      player.setDepth(player.y);

      // WASD keyboard movement
      if (!showDialogue) {
        let velocityX = 0;
        let velocityY = 0;

        // Check WASD keys
        if (keyW.isDown || cursors.up!.isDown) {
          velocityY = -speed;
        } else if (keyS.isDown || cursors.down!.isDown) {
          velocityY = speed;
        }

        if (keyA.isDown || cursors.left!.isDown) {
          velocityX = -speed;
        } else if (keyD.isDown || cursors.right!.isDown) {
          velocityX = speed;
        }

        // Normalize diagonal movement (so moving diagonally isn't faster)
        if (velocityX !== 0 && velocityY !== 0) {
          velocityX *= 0.707;
          velocityY *= 0.707;
        }

        // Apply velocity to physics body
        const body = player.body as Phaser.Physics.Arcade.Body;
        body.setVelocity(velocityX, velocityY);

        // Update sprite frame based on movement direction (8-directional)
        if (velocityX !== 0 || velocityY !== 0) {
          // Calculate angle in degrees
          let angle = Math.atan2(velocityY, velocityX) * (180 / Math.PI);
          
          // Normalize to 0-360 range
          if (angle < 0) angle += 360;
          
          // Map angle to frame (assuming 8-directional spritesheet)
          // 0°=Right, 45°=Down-Right, 90°=Down, 135°=Down-Left, 
          // 180°=Left, 225°=Up-Left, 270°=Up, 315°=Up-Right
          let frame = 0;
          if (angle >= 337.5 || angle < 22.5) {
            frame = 2;  // Right (row 0, frame 2)
          } else if (angle >= 22.5 && angle < 67.5) {
            frame = 4;  // Down-Right (row 1, frame 0)
          } else if (angle >= 67.5 && angle < 112.5) {
            frame = 0;  // Down (row 0, frame 0)
          } else if (angle >= 112.5 && angle < 157.5) {
            frame = 5;  // Down-Left (row 1, frame 1)
          } else if (angle >= 157.5 && angle < 202.5) {
            frame = 3;  // Left (row 0, frame 3)
          } else if (angle >= 202.5 && angle < 247.5) {
            frame = 7;  // Up-Left (row 1, frame 3)
          } else if (angle >= 247.5 && angle < 292.5) {
            frame = 1;  // Up (row 0, frame 1)
          } else {
            frame = 6;  // Up-Right (row 1, frame 2)
          }
          
          player.setFrame(frame);
        }
        
        player.setScale(4.0); // Keep consistent scale
      } else {
        // Dialogue is showing - stop movement
        const body = player.body as Phaser.Physics.Arcade.Body;
        body.setVelocity(0, 0);
        player.setFrame(0); // Reset to default down-facing frame
        player.setScale(4.0);
      }

      // Check distance to NPC and objects
      nearestInteractive = null;
      let minDistance = 80;

      // Check NPC
      const npcDistance = Phaser.Math.Distance.Between(
        player.x,
        player.y,
        npc.x,
        npc.y
      );
      if (npcDistance < minDistance) {
        nearestInteractive = npc;
        minDistance = npcDistance;
      }

      // Check objects
      interactiveObjects.forEach((obj) => {
        const objDistance = Phaser.Math.Distance.Between(
          player.x,
          player.y,
          obj.x,
          obj.y
        );
        if (objDistance < minDistance) {
          nearestInteractive = obj;
          minDistance = objDistance;
        }
      });

      // Show interaction prompt
      if (nearestInteractive && !showDialogue) {
        const objName = nearestInteractive.getData('name');
        interactionPrompt.setText(`Press E or SPACE to interact with ${objName}`);
        interactionPrompt.setVisible(true);
        interactionPrompt.setPosition(player.x, player.y - 60);

        // Add glow effect to nearest object
        nearestInteractive.setTint(0xffff00);
      } else {
        interactionPrompt.setVisible(false);
        
        // Remove tint from all objects
        interactiveObjects.forEach((obj) => obj.clearTint());
        npc.clearTint();
      }

      // Stop movement when dialogue opens
      if (showDialogue) {
        const body = player.body as Phaser.Physics.Arcade.Body;
        body.setVelocity(0, 0);
      }
    }

    // Create and start the game
    const game = new Phaser.Game(config);
    phaserGameRef.current = game;

    // Cleanup
    return () => {
      game.destroy(true);
      phaserGameRef.current = null;
    };
  }, [question.animation, currentQuestion, showDialogue]);

  const handleDialogueChoice = (option: 'A' | 'B') => {
    const dimension =
      option === 'A' ? question.optionA.dimension : question.optionB.dimension;
    setShowDialogue(false);

    // Delay before moving to next question
    setTimeout(() => {
      onAnswer(dimension);
    }, 500);
  };

  return (
    <div className="relative w-full h-screen bg-gray-900 flex items-center justify-center overflow-hidden">
      {/* Progress Bar */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-30 w-2/3 max-w-2xl">
        <div className="bg-black/60 backdrop-blur-md rounded-2xl px-8 py-4 mb-4 text-center">
          <span className="text-white font-bold text-xl">
            Question {currentQuestion} of {totalQuestions}
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden shadow-lg">
          <div
            className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full transition-all duration-700 ease-out rounded-full"
            style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Controls Guide */}
      <div className="absolute top-6 left-6 z-30 bg-black/70 text-white p-5 rounded-xl text-sm space-y-2 backdrop-blur-sm">
        <div className="font-bold text-lg mb-3 text-cyan-400">🎮 Controls</div>
        <div className="flex items-center gap-2">
          <span className="bg-gray-700 px-2 py-1 rounded text-xs font-mono">WASD / ⬆️⬇️⬅️➡️</span>
          <span>Move character</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-gray-700 px-2 py-1 rounded text-xs font-mono">E / SPACE</span>
          <span>Interact</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-yellow-400">💡</span>
          <span className="text-xs text-gray-300">Walk near objects & NPCs</span>
        </div>
      </div>

      {/* Game Container */}
      <div
        ref={gameContainerRef}
        className="shadow-2xl border-4 border-gray-700 rounded-lg overflow-hidden"
        style={{ imageRendering: 'pixelated' }}
      />

      {/* Dialogue Overlay */}
      {showDialogue && (
        <div className="absolute inset-0 z-40 flex items-end justify-center pb-8">
          <div className="w-full max-w-5xl px-6">
            <DialogueBox
              npcName={npcName}
              scenario={question.scenario}
              options={[
                { text: question.optionA.text, key: 'A' as const },
                { text: question.optionB.text, key: 'B' as const },
              ]}
              onSelect={handleDialogueChoice}
              voiceId={voiceId}
            />
          </div>
        </div>
      )}
    </div>
  );
}
