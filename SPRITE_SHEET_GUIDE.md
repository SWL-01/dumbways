# 🎮 How to Use Your Character Sprite Sheet

## ✅ Your Sprite Sheet Setup

I can see you have a **9-frame sprite sheet** (3x3 grid) with character facing different directions!

### Frame Layout (Based on Your Image)

```
┌─────────┬─────────┬─────────┐
│ Frame 0 │ Frame 1 │ Frame 2 │  ← Row 1: UP directions
│  Up-L   │   Up    │  Up-R   │
├─────────┼─────────┼─────────┤
│ Frame 3 │ Frame 4 │ Frame 5 │  ← Row 2: SIDE directions  
│  Left   │  Idle   │  Right  │
├─────────┼─────────┼─────────┤
│ Frame 6 │ Frame 7 │ Frame 8 │  ← Row 3: DOWN directions
│ Down-L  │  Down   │ Down-R  │
└─────────┴─────────┴─────────┘
```

## 📁 Step-by-Step: Add Your Sprite

### Step 1: Save Your Sprite Sheet

1. **Right-click** your sprite sheet image
2. **Save as**: `player.png`
3. **Location**: Save to your project

### Step 2: Create the Assets Folder

In your terminal, run:

```bash
mkdir -p public/assets/characters
```

### Step 3: Move the File

Move `player.png` to:
```
dumbways/
  public/
    assets/
      characters/
        player.png  ← Your sprite sheet here
```

### Step 4: Test It!

Run your game:
```bash
npm run dev
```

**That's it!** Your character will now:
- ✅ Face the direction they're walking
- ✅ Show correct sprite for 8 directions
- ✅ Display idle pose when stopped

## 🎯 Direction Mapping

When you click to move, the character automatically changes sprite:

| Movement Direction | Frame Used | Visual |
|-------------------|------------|--------|
| Moving Right → | Frame 5 | Right pose |
| Moving Down-Right ↘ | Frame 8 | Down-right pose |
| Moving Down ↓ | Frame 7 | Down pose |
| Moving Down-Left ↙ | Frame 6 | Down-left pose |
| Moving Left ← | Frame 3 | Left pose |
| Moving Up-Left ↖ | Frame 0 | Up-left pose |
| Moving Up ↑ | Frame 1 | Up pose |
| Moving Up-Right ↗ | Frame 2 | Up-right pose |
| Standing Still | Frame 4 | Idle pose |

## 🔧 Sprite Sheet Requirements

Your sprite sheet should have:

✅ **Dimensions**: Width should be divisible by 3, height should be divisible by 3
- Example: 96x144 pixels (32x48 per frame)
- Example: 120x180 pixels (40x60 per frame)
- Example: 150x225 pixels (50x75 per frame)

✅ **Format**: PNG with transparency

✅ **Layout**: 3 columns × 3 rows = 9 frames

✅ **Frame order**: Top-left to bottom-right

## 🎨 If Your Sprite is Different Size

If your sprite sheet has different dimensions, update this in the code:

Open `/src/components/IsometricGameScreen.tsx` and find line ~188:

```tsx
this.load.spritesheet('player', '/assets/characters/player.png', {
  frameWidth: 32,  // Change to your frame width
  frameHeight: 48, // Change to your frame height
});
```

**How to calculate:**
- `frameWidth` = Total width ÷ 3
- `frameHeight` = Total height ÷ 3

Example: If your sprite sheet is 120x180 pixels:
- frameWidth = 120 ÷ 3 = 40
- frameHeight = 180 ÷ 3 = 60

## 🎭 Animation Details

The game now supports:

✅ **8-directional movement**
- North, South, East, West
- Northeast, Northwest, Southeast, Southwest

✅ **Automatic sprite switching**
- Character faces the direction they're moving
- Changes sprite instantly when direction changes

✅ **Idle animation**
- Shows idle pose (center frame) when stopped

✅ **Smooth transitions**
- No delay between direction changes
- Immediate response to clicks

## 🐛 Troubleshooting

**Character appears as blue square?**
- Sprite sheet not found or not loaded
- Check file path: `/public/assets/characters/player.png`
- Check file name is exactly `player.png` (case-sensitive)

**Character faces wrong direction?**
- Frames might be in different order
- Check sprite sheet layout matches 3x3 grid
- Verify frame order: up-left, up, up-right (row 1), etc.

**Character is wrong size?**
- Update frameWidth and frameHeight
- Should match individual frame size, not total image size

**Sprite looks pixelated or blurry?**
- ✅ Game uses `pixelArt: true` mode - this is correct!
- Pixelated look is intentional for retro style

## 🚀 Advanced: Add Walking Animation

Want to add actual walking animation (legs moving)? 

Create a sprite sheet with more frames:
```
┌─────┬─────┬─────┬─────┐
│ U-L │ U-L │ U-L │ U-L │  ← 4 frames for up-left walk cycle
│  1  │  2  │  3  │  4  │
├─────┼─────┼─────┼─────┤
│  U  │  U  │  U  │  U  │  ← 4 frames for up walk cycle
│  1  │  2  │  3  │  4  │
└─────┴─────┴─────┴─────┘
... (continue for all 8 directions)
```

Then update the animation code to cycle through frames.

## 📝 Current Status

✅ **Code is ready!** I've updated IsometricGameScreen.tsx to:
- Load your 9-frame sprite sheet
- Create animations for all 8 directions
- Switch sprites based on movement angle
- Show idle pose when stopped

✅ **Just add your sprite sheet file and it works!**

---

**Ready to test?** Save your sprite as `/public/assets/characters/player.png` and run `npm run dev`! 🎮
