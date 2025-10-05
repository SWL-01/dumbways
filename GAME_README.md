# 🎮 PathQuest - 2.5D Isometric MBTI Personality Game

## ✨ What's Been Created

I've built a complete **Duolingo-style RPG game** with Phaser.js for your MBTI personality quiz!

### 🎯 Features Implemented

#### 1. **2.5D Isometric Game Engine**
- ✅ Built with Phaser.js physics engine
- ✅ Pseudo-isometric depth sorting (objects closer to bottom appear in front)
- ✅ Pixel-perfect rendering (`pixelArt: true`)
- ✅ Smooth animations and movement

#### 2. **Interactive Gameplay**
- 🖱️ **Click-to-Move**: Click anywhere to walk there
- ⌨️ **Keyboard Interaction**: Press `E` or `SPACE` to interact
- 🎯 **Target Marker**: Green circle shows where you're walking
- ✨ **Object Highlighting**: Objects glow yellow when you're near
- 📢 **Interaction Prompts**: "Press E to interact with..." text appears

#### 3. **12 Unique Scenes**
Each MBTI scenario has its own themed environment:

| Scenario | Scene | Interactive Objects |
|----------|-------|-------------------|
| Party | Living room with party vibe | Snack Table, Couch, Music System |
| Planning | Office meeting room | Conference Table, Whiteboard |
| Problem | Workshop/Garage | Toolbox, Workbench |
| Listening | Coffee Shop | Coffee Table, Counter |
| Weekend | Living Room | Sofa, TV |
| Reading | Library | Bookshelf, Reading Chair |
| Comfort | Park Bench | Park Bench, Tree |
| Vacation | Travel Agency | Travel Desk, World Map |
| Meeting | Conference Hall | Podium, Projector |
| Learning | Classroom | Student Desk, Blackboard |
| Criticism | Office Cubicle | Work Desk, Computer |
| Mess | Messy Room | Clothes Pile, Unmade Bed |

#### 4. **Game Mechanics**
- **Player Character**: Blue sprite that you control
- **NPC Characters**: Orange sprite for each scene
- **Interactive Objects**: Green sprites (2-3 per scene)
- **Collision Detection**: Walk close to trigger interactions
- **Smooth Movement**: Physics-based pathfinding
- **Progress Tracking**: Question counter and progress bar

#### 5. **Visual Design**
- Isometric grid overlay for depth perception
- Color-coded sprites (Blue=Player, Orange=NPC, Green=Objects)
- Pixel art rendering mode
- Gradient backgrounds as fallbacks
- Object labels that appear on approach
- Depth-based layering

## 🚀 How to Play

1. **Run the game**:
   ```bash
   npm run dev
   ```

2. **Start Screen**: Click "START" button

3. **Game Controls**:
   - Click anywhere to move your character
   - Walk near NPCs or objects until you see the prompt
   - Press `E` or `SPACE` to interact
   - Choose your answer in the dialogue box
   - Automatically moves to next scene

4. **Complete all 12 scenarios** to get your MBTI result!

## 📁 File Structure

```
src/
  components/
    IsometricGameScreen.tsx  ← New Phaser 2.5D game
    DialogueBox.tsx          ← Question UI
    StartScreen.tsx          ← Landing page  
    ResultsScreen.tsx        ← MBTI results
  App.tsx                    ← Updated to use IsometricGameScreen

public/
  scenes/                    ← Scene images folder (created)
    (Add your 12 scene images here)
```

## 🎨 Adding Custom Scene Images

### Quick Method
Place your pixel art images in `/public/scenes/` with these exact names:
- `party.png`
- `office.png`
- `workshop.png`
- `coffee.png`
- `livingroom.png`
- `library.png`
- `park.png`
- `travel.png`
- `conference.png`
- `classroom.png`
- `cubicle.png`
- `messyroom.png`

### Image Requirements
- **Size**: 1000x600 pixels
- **Format**: PNG or JPG
- **Style**: Pixel art, isometric, or top-down view
- **No images?** No problem! Colored backgrounds are used as fallbacks

## 🎯 Game Flow

```
StartScreen 
    ↓
IsometricGameScreen (Scene 1: Party)
    - Walk to NPC/objects
    - Press E to interact
    - Answer question via DialogueBox
    ↓
IsometricGameScreen (Scene 2: Office)
    - Different background
    - New NPCs and objects
    - Next question
    ↓
... (repeat for all 12 questions)
    ↓
ResultsScreen
    - Shows MBTI type
    - Personality description
```

## ✨ Key Improvements Over Previous Version

| Old System | New Isometric System |
|------------|---------------------|
| CSS-based movement | Phaser physics engine |
| Single background | 12 unique themed scenes |
| 1 NPC per scene | NPCs + 2-3 interactive objects |
| Simple click detection | Proximity-based collision |
| No depth sorting | Isometric depth layering |
| Static sprites | Scalable, animated system |

## 🔧 Customization Options

### Change NPC Position
Edit line in `IsometricGameScreen.tsx`:
```tsx
party: {
  npcPosition: { x: 600, y: 300 }, // Change X, Y here
  ...
}
```

### Add More Objects
```tsx
objects: [
  { x: 400, y: 350, type: 'table', name: 'Snack Table' },
  // Add more here
],
```

### Adjust Interaction Distance
Line 338:
```tsx
let minDistance = 80; // Make smaller for closer interaction
```

### Change Movement Speed
Line 324:
```tsx
const speed = 180; // Increase for faster movement
```

## 🎮 Future Enhancements

Want to make it even better? Consider:

1. **Animated Sprites**
   - Add walking animations (left, right, up, down)
   - Idle animations
   - Interaction animations

2. **Sound Effects**
   - Footstep sounds
   - Interaction sounds
   - Background music per scene

3. **Visual Effects**
   - Particle effects on interaction
   - Screen transitions between scenes
   - Character shadows

4. **More Interactions**
   - Multiple NPCs per scene
   - Branching conversations
   - Mini-games

## 📊 Technical Details

- **Engine**: Phaser 3 (installed via npm)
- **Physics**: Arcade Physics for 2D collision
- **Rendering**: WebGL with pixel art mode
- **Framework**: React + TypeScript
- **State Management**: React hooks

## 🐛 Troubleshooting

**Black screen with green border?**
- Background images not loaded (fallback colors are shown)
- Add your scene images to `/public/scenes/`
- Or ignore it - the game works with colored backgrounds!

**Character not moving?**
- Try clicking different areas
- Check browser console for errors

**Interaction not working?**
- Walk closer to the NPC/object
- Wait for the yellow highlight
- Press E or SPACE key

## 🎉 You're Done!

Your game is **ready to play right now**! Run `npm run dev` and enjoy your Duolingo-style MBTI personality game!

Add custom pixel art scene images anytime to make it look even better. 🚀
