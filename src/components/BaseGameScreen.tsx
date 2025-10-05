import { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import { MBTIQuestion } from '../types/mbti';
import { DialogueBox } from './DialogueBox';
import { TextToSpeech } from './TextToSpeech';
import { 
  SceneConfig, 
  DEFAULT_PLAYER_CONFIG, 
  DEFAULT_GAME_DIMENSIONS, 
  DEFAULT_BOUNDARY_CONFIG 
} from '../types/game';

interface BaseGameScreenProps {
  question: MBTIQuestion;
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (dimension: 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P') => void;
  sceneConfig: SceneConfig;
  voiceId?: string;
}

export function BaseGameScreen({
  question,
  currentQuestion,
  totalQuestions,
  onAnswer,
  sceneConfig,
  voiceId,
}: BaseGameScreenProps) {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const phaserGameRef = useRef<Phaser.Game | null>(null);
  const [showDialogue, setShowDialogue] = useState(false);
  const [npcName, setNpcName] = useState('Character');
  const [showObjectInteraction, setShowObjectInteraction] = useState(false);
  const [objectInteractionText, setObjectInteractionText] = useState('');
  const [interactedObjectName, setInteractedObjectName] = useState('');
  
  // Refs to track dialogue states for Phaser to access current values
  const showDialogueRef = useRef(false);
  const showObjectInteractionRef = useRef(false);

  useEffect(() => {
    if (!gameContainerRef.current) return;

    setNpcName(sceneConfig.name);

    // Merge player config with defaults
    const playerConfig = { ...DEFAULT_PLAYER_CONFIG, ...sceneConfig.playerConfig };

    // Phaser game configuration
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: DEFAULT_GAME_DIMENSIONS.width,
      height: DEFAULT_GAME_DIMENSIONS.height,
      parent: gameContainerRef.current,
      backgroundColor: '#2d2d2d',
      pixelArt: true,
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
    const interactiveObjects: Phaser.Physics.Arcade.Sprite[] = [];
    let interactionPrompt: Phaser.GameObjects.Text;
    let nearestInteractive: Phaser.Physics.Arcade.Sprite | null = null;
    let cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    let keyW: Phaser.Input.Keyboard.Key;
    let keyA: Phaser.Input.Keyboard.Key;
    let keyS: Phaser.Input.Keyboard.Key;
    let keyD: Phaser.Input.Keyboard.Key;
    let boundaries: Phaser.Physics.Arcade.StaticGroup;

    function preload(this: Phaser.Scene) {
      // Load background
      this.load.image('background', sceneConfig.backgroundUrl);

      // Load player spritesheet
      try {
        this.load.spritesheet(playerConfig.spriteKey, playerConfig.spriteUrl, {
          frameWidth: playerConfig.frameWidth,
          frameHeight: playerConfig.frameHeight,
        });
      } catch (e) {
        // Fallback to colored square
        const graphics = this.add.graphics();
        graphics.fillStyle(0x4a9eff, 1);
        graphics.fillRect(0, 0, 128, 128);
        graphics.generateTexture(playerConfig.spriteKey, 128, 128);
        graphics.clear();
        graphics.destroy();
      }

      // Load NPC sprite
      if (sceneConfig.npcImage) {
        this.load.image('npc', sceneConfig.npcImage);
      } else {
        // Fallback NPC sprite (orange)
        const npcGraphics = this.add.graphics();
        npcGraphics.fillStyle(0xff9d4a, 1);
        npcGraphics.fillRect(0, 0, 24, 36);
        npcGraphics.generateTexture('npc', 24, 36);
        npcGraphics.clear();
        npcGraphics.destroy();
      }

      // Interactive objects - default texture
      const objGraphics = this.add.graphics();
      objGraphics.fillStyle(0x4aff9d, 1);
      objGraphics.fillRect(0, 0, 30, 30);
      objGraphics.generateTexture('object', 30, 30);
      objGraphics.clear();
      objGraphics.destroy();

      // Load object images from scene config
      sceneConfig.objects.forEach((objConfig, index) => {
        if (objConfig.image) {
          this.load.image(`object_${index}`, objConfig.image);
        }
      });
    }

    function create(this: Phaser.Scene) {
      // Add background with fallback color
      this.add.rectangle(
        DEFAULT_GAME_DIMENSIONS.width / 2,
        DEFAULT_GAME_DIMENSIONS.height / 2,
        DEFAULT_GAME_DIMENSIONS.width,
        DEFAULT_GAME_DIMENSIONS.height,
        0x1a1a1a
      );

      // Try to load the background image
      try {
        const bgImage = this.add.image(
          DEFAULT_GAME_DIMENSIONS.width / 2,
          DEFAULT_GAME_DIMENSIONS.height / 2,
          'background'
        );
        bgImage.setDisplaySize(DEFAULT_GAME_DIMENSIONS.width, DEFAULT_GAME_DIMENSIONS.height);
      } catch (e) {
        console.log('Background image not loaded, using fallback');
      }

      // Add floor grid for 2.5D effect
      const gridGraphics = this.add.graphics();
      gridGraphics.lineStyle(1, 0x444444, 0.3);

      // Draw isometric grid
      for (let i = 0; i < 30; i++) {
        gridGraphics.moveTo(i * 50, 100);
        gridGraphics.lineTo(i * 50, 750);
      }
      for (let i = 2; i < 16; i++) {
        gridGraphics.moveTo(0, i * 50);
        gridGraphics.lineTo(DEFAULT_GAME_DIMENSIONS.width, i * 50);
      }
      gridGraphics.strokePath();

      // Create boundary walls
      boundaries = this.physics.add.staticGroup();

      // Create invisible wall texture
      const wallGraphics = this.add.graphics();
      wallGraphics.fillStyle(0xff0000, 0);
      wallGraphics.fillRect(0, 0, 10, 10);
      wallGraphics.generateTexture('wall', 10, 10);
      wallGraphics.destroy();

      // Top wall
      const topWall = boundaries.create(
        DEFAULT_GAME_DIMENSIONS.width / 2,
        DEFAULT_BOUNDARY_CONFIG.margin,
        'wall'
      );
      topWall.setDisplaySize(DEFAULT_GAME_DIMENSIONS.width, DEFAULT_BOUNDARY_CONFIG.thickness);
      topWall.refreshBody();
      topWall.setVisible(false);

      // Bottom wall
      const bottomWall = boundaries.create(
        DEFAULT_GAME_DIMENSIONS.width / 2,
        DEFAULT_GAME_DIMENSIONS.height - DEFAULT_BOUNDARY_CONFIG.margin,
        'wall'
      );
      bottomWall.setDisplaySize(DEFAULT_GAME_DIMENSIONS.width, DEFAULT_BOUNDARY_CONFIG.thickness);
      bottomWall.refreshBody();
      bottomWall.setVisible(false);

      // Left wall
      const leftWall = boundaries.create(
        DEFAULT_BOUNDARY_CONFIG.margin,
        DEFAULT_GAME_DIMENSIONS.height / 2,
        'wall'
      );
      leftWall.setDisplaySize(DEFAULT_BOUNDARY_CONFIG.thickness, DEFAULT_GAME_DIMENSIONS.height);
      leftWall.refreshBody();
      leftWall.setVisible(false);

      // Right wall
      const rightWall = boundaries.create(
        DEFAULT_GAME_DIMENSIONS.width - DEFAULT_BOUNDARY_CONFIG.margin,
        DEFAULT_GAME_DIMENSIONS.height / 2,
        'wall'
      );
      rightWall.setDisplaySize(DEFAULT_BOUNDARY_CONFIG.thickness, DEFAULT_GAME_DIMENSIONS.height);
      rightWall.refreshBody();
      rightWall.setVisible(false);

      // Create interactive objects
      sceneConfig.objects.forEach((objConfig, index) => {
        const textureKey = objConfig.image ? `object_${index}` : 'object';
        const obj = this.physics.add.sprite(objConfig.x, objConfig.y, textureKey);
        obj.setInteractive();
        obj.setData('name', objConfig.name);
        obj.setData('interaction', objConfig.interaction || 'Nothing special here.');
        obj.setDepth(objConfig.y);

        // Apply custom scale if provided, otherwise use default (2 for images, 1 for default texture)
        if (objConfig.scale !== undefined) {
          obj.setScale(objConfig.scale);
        } else if (objConfig.image) {
          obj.setScale(2);
        }

        // Apply alpha/opacity if provided (0 = invisible, 1 = fully visible)
        if (objConfig.alpha !== undefined) {
          obj.setAlpha(objConfig.alpha);
        }

        // Experimental: Try to remove white/light backgrounds
        if (objConfig.removeWhiteBackground) {
          obj.setBlendMode(Phaser.BlendModes.MULTIPLY);
        }

        interactiveObjects.push(obj);

        const label = this.add.text(objConfig.x, objConfig.y - 80, objConfig.name, {
          fontSize: '12px',
          color: '#ffffff',
          backgroundColor: '#000000',
          padding: { x: 4, y: 2 },
        });
        label.setOrigin(0.5);
        label.setAlpha(0.7);
      });

      npc = this.physics.add.sprite(
        sceneConfig.npcPosition.x,
        sceneConfig.npcPosition.y,
        'npc'
      );
      npc.setData('name', 'NPC');
      npc.setDepth(sceneConfig.npcPosition.y);
      
      // Scale NPC if custom image is used
      if (sceneConfig.npcImage) {
        npc.setScale(sceneConfig.npcScale || 0.15);
      }

      const npcLabel = this.add.text(npc.x, npc.y - 80, '❗ Talk', {
        fontSize: '14px',
        color: '#ffeb3b',
        backgroundColor: '#000000',
        padding: { x: 6, y: 3 },
        
      });
      npcLabel.setOrigin(0.5);

      // Create player
      player = this.physics.add.sprite(
        playerConfig.startX,
        playerConfig.startY,
        playerConfig.spriteKey,
        0
      );
      player.setCollideWorldBounds(true);
      player.setDepth(1000);
      player.setScale(playerConfig.scale);

      const body = player.body as Phaser.Physics.Arcade.Body;
      body.setCollideWorldBounds(true);
      body.setSize(playerConfig.collisionBoxWidth, playerConfig.collisionBoxHeight);
      body.setOffset(playerConfig.collisionOffsetX, playerConfig.collisionOffsetY);

      // Add collision between player and boundaries
      this.physics.add.collider(player, boundaries);

      // Log spritesheet info
      if (this.textures.exists(playerConfig.spriteKey)) {
        const texture = this.textures.get(playerConfig.spriteKey);
        console.log('Player spritesheet loaded. Total frames:', texture.frameTotal);
      }

      // Create walking animations for 8 directions
      this.anims.create({
        key: 'walk-down',
        frames: this.anims.generateFrameNumbers(playerConfig.spriteKey, { frames: [0, 1, 2, 3] }),
        frameRate: 8,
        repeat: -1 // Loop forever
      });

      this.anims.create({
        key: 'walk-up',
        frames: this.anims.generateFrameNumbers(playerConfig.spriteKey, { frames: [8,9,10,11] }),
        frameRate: 8,
        repeat: -1
      });

      this.anims.create({
        key: 'walk-right',
        frames: this.anims.generateFrameNumbers(playerConfig.spriteKey, { frames: [4, 5, 6, 7] }),
        frameRate: 8,
        repeat: -1
      });

      this.anims.create({
        key: 'walk-left',
        frames: this.anims.generateFrameNumbers(playerConfig.spriteKey, { frames: [12, 13, 14, 15] }),
        frameRate: 8,
        repeat: -1
      });

      this.anims.create({
        key: 'walk-down-right',
        frames: this.anims.generateFrameNumbers(playerConfig.spriteKey, { frames: [0,1,2,3] }),
        frameRate: 8,
        repeat: -1
      });

      this.anims.create({
        key: 'walk-down-left',
        frames: this.anims.generateFrameNumbers(playerConfig.spriteKey, { frames: [0,1,2,3] }), 
        frameRate: 8,
        repeat: -1
      });

      this.anims.create({
        key: 'walk-up-right',
        frames: this.anims.generateFrameNumbers(playerConfig.spriteKey, { frames: [8,9,10,11] }),
        frameRate: 8,
        repeat: -1
      });

      this.anims.create({
        key: 'walk-up-left',
        frames: this.anims.generateFrameNumbers(playerConfig.spriteKey, { frames: [8,9,10,11] }),
        frameRate: 8,
        repeat: -1
      });

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

      // Keyboard interaction - E key toggles interaction
      this.input.keyboard!.on('keydown-E', () => {
        // Close if dialogue or interaction is open
        if (showDialogue) {
          setShowDialogue(false);
          return;
        }
        if (showObjectInteraction) {
          setShowObjectInteraction(false);
          return;
        }
        
        // Open if near an interactive object
        if (nearestInteractive && !showDialogue && !showObjectInteraction) {
          const objName = nearestInteractive.getData('name');
          if (objName === 'NPC') {
            setShowDialogue(true);
          } else {
            const interactionText = nearestInteractive.getData('interaction');
            setInteractedObjectName(objName);
            setObjectInteractionText(interactionText);
            setShowObjectInteraction(true);
          }
        }
      });

      this.input.keyboard!.on('keydown-SPACE', () => {
        // Close if dialogue or interaction is open
        if (showDialogue) {
          setShowDialogue(false);
          return;
        }
        if (showObjectInteraction) {
          setShowObjectInteraction(false);
          return;
        }
        
        // Open if near an interactive object
        if (nearestInteractive && !showDialogue && !showObjectInteraction) {
          const objName = nearestInteractive.getData('name');
          if (objName === 'NPC') {
            setShowDialogue(true);
          } else {
            const interactionText = nearestInteractive.getData('interaction');
            setInteractedObjectName(objName);
            setObjectInteractionText(interactionText);
            setShowObjectInteraction(true);
          }
        }
      });
    }

    function update(this: Phaser.Scene) {
      if (!player) return;

      // Update depth for pseudo-isometric sorting
      player.setDepth(player.y);

      // WASD keyboard movement (check refs for current state)
      if (!showDialogueRef.current && !showObjectInteractionRef.current) {
        let velocityX = 0;
        let velocityY = 0;

        if (keyW.isDown || cursors.up!.isDown) {
          velocityY = -playerConfig.speed;
        } else if (keyS.isDown || cursors.down!.isDown) {
          velocityY = playerConfig.speed;
        }

        if (keyA.isDown || cursors.left!.isDown) {
          velocityX = -playerConfig.speed;
        } else if (keyD.isDown || cursors.right!.isDown) {
          velocityX = playerConfig.speed;
        }

        // Normalize diagonal movement
        if (velocityX !== 0 && velocityY !== 0) {
          velocityX *= 0.707;
          velocityY *= 0.707;
        }

        const body = player.body as Phaser.Physics.Arcade.Body;
        body.setVelocity(velocityX, velocityY);

        // Update sprite animation based on movement direction
        if (velocityX !== 0 || velocityY !== 0) {
          let angle = Math.atan2(velocityY, velocityX) * (180 / Math.PI);
          if (angle < 0) angle += 360;

          let animKey = 'walk-down';
          if (angle >= 337.5 || angle < 22.5) {
            animKey = 'walk-right'; // Right →
          } else if (angle >= 22.5 && angle < 67.5) {
            animKey = 'walk-down-right'; // Down-Right ↘
          } else if (angle >= 67.5 && angle < 112.5) {
            animKey = 'walk-down'; // Down ↓
          } else if (angle >= 112.5 && angle < 157.5) {
            animKey = 'walk-down-left'; // Down-Left ↙
          } else if (angle >= 157.5 && angle < 202.5) {
            animKey = 'walk-left'; // Left ←
          } else if (angle >= 202.5 && angle < 247.5) {
            animKey = 'walk-up-left'; // Up-Left ↖
          } else if (angle >= 247.5 && angle < 292.5) {
            animKey = 'walk-up'; // Up ↑
          } else {
            animKey = 'walk-up-right'; // Up-Right ↗
          }

          // Play animation if not already playing
          if (player.anims.currentAnim?.key !== animKey) {
            player.play(animKey);
          }
        } else {
          // Stop animation when not moving
          player.stop();
          player.setFrame(0); // Reset to idle frame
        }

        player.setScale(3);
      } else {
        const body = player.body as Phaser.Physics.Arcade.Body;
        body.setVelocity(0, 0);
        player.setFrame(0);
        player.setScale(4.0);
      }

      // Check distance to NPC and objects
      nearestInteractive = null;
      let minDistance = 80;

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
      if (nearestInteractive && !showDialogueRef.current && !showObjectInteractionRef.current) {
        const objName = nearestInteractive.getData('name');
        interactionPrompt.setText(`Press E or SPACE to interact with ${objName}`);
        interactionPrompt.setVisible(true);
        interactionPrompt.setPosition(player.x, player.y - 60);
        nearestInteractive.setTint(0xffff00);
      } else {
        interactionPrompt.setVisible(false);
        interactiveObjects.forEach((obj) => obj.clearTint());
        npc.clearTint();
      }

      // Stop movement when dialogue or object interaction is showing
      if (showDialogue || showObjectInteraction) {
        const body = player.body as Phaser.Physics.Arcade.Body;
        body.setVelocity(0, 0);
      }
    }

    const game = new Phaser.Game(config);
    phaserGameRef.current = game;

    return () => {
      game.destroy(true);
      phaserGameRef.current = null;
    };
  }, [question.animation, currentQuestion, sceneConfig]);

  // Sync refs with state for Phaser to access
  useEffect(() => {
    showDialogueRef.current = showDialogue;
  }, [showDialogue]);

  useEffect(() => {
    showObjectInteractionRef.current = showObjectInteraction;
  }, [showObjectInteraction]);

  // ESC key handler at React level (has access to current state)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (showDialogue) {
          setShowDialogue(false);
        }
        if (showObjectInteraction) {
          setShowObjectInteraction(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showDialogue, showObjectInteraction]);

  const handleDialogueChoice = (option: 'A' | 'B') => {
    const dimension =
      option === 'A' ? question.optionA.dimension : question.optionB.dimension;
    setShowDialogue(false);

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
          <span>Interact </span>
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

      {/* Object Interaction Overlay */}
      {showObjectInteraction && (
        <div className="absolute inset-0 z-40 flex items-end justify-center pb-8">
          <div className="w-full max-w-4xl px-6">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-4 border-cyan-500 rounded-2xl shadow-2xl p-8 backdrop-blur-md">
              <div className="flex items-start gap-4 mb-6">
                <div className="bg-cyan-500 rounded-full p-3 flex-shrink-0">
                  <span className="text-2xl">🔍</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-cyan-400">{interactedObjectName}</h3>
                    {voiceId && (
                      <TextToSpeech
                        text={objectInteractionText}
                        voiceId={voiceId}
                        className="ml-2"
                      />
                    )}
                  </div>
                  <p className="text-white text-lg leading-relaxed">{objectInteractionText}</p>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowObjectInteraction(false)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
