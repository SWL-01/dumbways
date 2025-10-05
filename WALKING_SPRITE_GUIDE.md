# 🎮 Walking Sprite Sheet Guide (CodePen Style)

## ✅ New Spritesheet Format

Your game now uses the **same spritesheet format** as the CodePen walking demo!

### 📐 Spritesheet Layout

```
┌────────┬────────┬────────┬────────┐
│ Frame 0│ Frame 1│ Frame 2│ Frame 3│  ← Row 0: DOWN (Y=0)
│  32x32 │  32x32 │  32x32 │  32x32 │
├────────┼────────┼────────┼────────┤
│ Frame 4│ Frame 5│ Frame 6│ Frame 7│  ← Row 1: RIGHT (Y=32)
│  32x32 │  32x32 │  32x32 │  32x32 │
├────────┼────────┼────────┼────────┤
│ Frame 8│ Frame 9│ Frame10│ Frame11│  ← Row 2: UP (Y=64)
│  32x32 │  32x32 │  32x32 │  32x32 │
├────────┼────────┼────────┼────────┤
│ Frame12│ Frame13│ Frame14│ Frame15│  ← Row 3: LEFT (Y=96)
│  32x32 │  32x32 │  32x32 │  32x32 │
└────────┴────────┴────────┴────────┘

Total Size: 128px × 128px
```

### 🎬 Animation Frames

Each direction has **4 frames** for smooth walking animation:

| Direction | Frames | Row | Animation |
|-----------|--------|-----|-----------|
| **DOWN** ↓ | 0-3 | Row 0 | Character walking toward screen |
| **RIGHT** → | 4-7 | Row 1 | Character walking to the right |
| **UP** ↑ | 8-11 | Row 2 | Character walking away from screen |
| **LEFT** ← | 12-15 | Row 3 | Character walking to the left |

## 🎨 Creating Your Sprite Sheet

### Option 1: Use Example Sprites from CodePen

Download from the CodePen demo:
- https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/WalkingDemo-HANK-2-SHEET.png
- https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/WalkingDemo-EMMY-SHEET.png
- https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/WalkingDemo-SARA-SHEET.png

Save as: `/public/assets/characters/player.png`

### Option 2: Create Custom Sprite

**Requirements:**
- ✅ **Total size**: 128x128 pixels
- ✅ **Frame size**: 32x32 pixels each
- ✅ **Layout**: 4 columns × 4 rows = 16 frames
- ✅ **Format**: PNG with transparency
- ✅ **Order**: Down, Right, Up, Left (top to bottom)

**Tools:**
- [Piskel](https://www.piskelapp.com/) - Free online pixel art editor
- [Aseprite](https://www.aseprite.org/) - Professional pixel art tool ($20)
- [GraphicsGale](https://graphicsgale.com/) - Free pixel animation software

### Option 3: AI Generation

Prompt for AI (like Midjourney/DALL-E):

```
Create a pixel art sprite sheet, 128x128 pixels total, 
4 rows of 4 frames (32x32 each), character walking animation,
Row 1: walking down toward camera
Row 2: walking right side view
Row 3: walking up away from camera  
Row 4: walking left side view
Retro 16-bit RPG style, transparent background
```

## 📁 File Structure

Place your sprite sheet here:

```
dumbways/
  public/
    assets/
      characters/
        player.png    ← Your 128×128 sprite sheet
        shadow.png    ← Optional: character shadow (32×32)
```

## 🎯 How The Animation Works

### CSS-Style Animation (Like CodePen)

The CodePen example uses CSS `@keyframes walkAnimation`:
```css
@keyframes walkAnimation {
  from { transform: translate3d(0%, 0%, 0); }
  to { transform: translate3d(-100%, 0%, 0); }
}
```

### Phaser Animation (Our Implementation)

We achieve the same effect using Phaser's animation system:

```tsx
// Creates 4-frame walking animation
this.anims.create({
  key: 'walk-down',
  frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
  frameRate: 8,    // 8 frames per second (like CSS steps(4) at 0.6s)
  repeat: -1,      // Loop forever
});
```

**Frame Rate Calculation:**
- CodePen: `0.6s` total ÷ `4 steps` = `0.15s` per frame = **6.67 FPS**
- Our game: **8 FPS** (slightly faster, smoother animation)

## 🎮 Direction Detection

When you click, the game calculates angle and picks the right animation:

| Angle Range | Direction | Animation |
|-------------|-----------|-----------|
| -45° to 45° | → Right | `walk-right` |
| 45° to 135° | ↓ Down | `walk-down` |
| 135° to -135° | ← Left | `walk-left` |
| -135° to -45° | ↑ Up | `walk-up` |

```
        UP (-90°)
           ↑
           |
LEFT ←-----+-----→ RIGHT
  (180°)   |      (0°)
           |
           ↓
       DOWN (90°)
```

## 🔧 Advanced: Character Scaling

Want your character bigger? The CodePen uses CSS `--pixel-size` variable:

```css
:root {
  --pixel-size: 4; /* 32px → 128px */
}
.Character {
  width: calc(var(--pixel-size) * 32px);
}
```

**In Phaser (our game):**

Update the player creation line:

```tsx
player = this.physics.add.sprite(150, 450, 'player');
player.setScale(3); // Make character 3x bigger (32px → 96px)
```

Try different scales:
- `setScale(2)` = 64px (2x size)
- `setScale(3)` = 96px (3x size)
- `setScale(4)` = 128px (4x size) - like CodePen default

## 🎨 Adding Character Shadow

CodePen includes a shadow sprite. To add one:

1. **Create shadow image** (32×32 pixels, black circle with transparency)
2. **Save as**: `/public/assets/characters/shadow.png`
3. **Add to preload:**

```tsx
this.load.image('shadow', '/assets/characters/shadow.png');
```

4. **Add to create:**

```tsx
const shadow = this.add.sprite(player.x, player.y, 'shadow');
shadow.setAlpha(0.25);
shadow.setScale(player.scaleX);
```

5. **Update in game loop:**

```tsx
shadow.setPosition(player.x, player.y + 8); // Offset below character
```

## 🐛 Troubleshooting

### Character appears as blue square?
✅ **Solution**: Sprite sheet not found or wrong path
- Check: `/public/assets/characters/player.png` exists
- File name must be exactly `player.png` (lowercase)

### Character is too small?
✅ **Solution**: Add scaling after creating player sprite
```tsx
player.setScale(3); // 3x size
```

### Animation not playing?
✅ **Solution**: Sprite sheet not loaded properly
- Verify image is 128×128 pixels
- Verify 4×4 grid layout
- Check browser console for errors

### Animation too fast/slow?
✅ **Solution**: Adjust `frameRate` in animation creation
```tsx
frameRate: 8,  // Higher = faster, Lower = slower
```

Try:
- `frameRate: 6` (slower, like CodePen)
- `frameRate: 10` (faster, more energetic)
- `frameRate: 12` (very fast)

### Wrong direction facing?
✅ **Solution**: Sprite sheet row order might be different
- Row 0 MUST be DOWN
- Row 1 MUST be RIGHT
- Row 2 MUST be UP
- Row 3 MUST be LEFT

### Character walking backwards?
✅ **Solution**: Frames in wrong order (should be left-to-right)
- Each row should show walking cycle from start to end

## 🎯 Current Implementation Status

✅ **Completed:**
- 4-direction walking animations (DOWN, RIGHT, UP, LEFT)
- 4-frame animation per direction
- Auto-detection based on click angle
- Idle animation when stopped
- Smooth frameRate (8 FPS)
- Graceful fallback to blue square

⏳ **Next Steps (Optional):**
1. Add character shadow sprite
2. Scale character to 3x or 4x size
3. Add diagonal directions (8-way movement)
4. Create more character sprites for NPC variety
5. Add footstep sound effects

## 📝 Frame-by-Frame Breakdown

Example of a 4-frame walking cycle:

### DOWN Direction (Frames 0-3):
```
Frame 0: Left foot forward
Frame 1: Both feet together
Frame 2: Right foot forward  
Frame 3: Both feet together
```

This creates the classic "walk cycle" animation.

## 🎮 Testing Your Sprite

1. Save sprite sheet as `/public/assets/characters/player.png`
2. Run `npm run dev`
3. Click START
4. Click different directions on screen
5. Character should:
   - Walk with animated legs
   - Face the direction they're moving
   - Show idle pose when stopped

## 🌟 Pro Tips

1. **Keep it simple**: 4 frames per direction is perfect for retro style
2. **Consistent size**: All frames must be exactly 32×32 pixels
3. **Transparent background**: Use PNG format with alpha channel
4. **Test in browser**: Zoom in to check individual frames
5. **Reference the CodePen**: Use their sprites as a template

---

**Ready to animate!** 🚀

Save your 128×128 sprite sheet as `/public/assets/characters/player.png` and watch your character come to life!
