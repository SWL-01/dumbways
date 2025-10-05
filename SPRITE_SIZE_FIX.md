# 🎨 Character Sprite Size Troubleshooting

## ⚠️ Issue: Only Seeing Hat, Not Full Character

If you're only seeing the top part (hat) of your character, the sprite frame size is likely incorrect!

## 🔍 Quick Diagnosis

### Step 1: Check Your Sprite Sheet Dimensions

Open `/public/assets/characters/player.png` and check the total size:

**Common sprite sheet sizes:**
- 128×128 px = 4×4 grid of 32×32 frames ✅ CodePen style
- 192×192 px = 4×4 grid of 48×48 frames ✅ **Updated to this!**
- 256×256 px = 4×4 grid of 64×64 frames
- 512×512 px = 4×4 grid of 128×128 frames

### Step 2: Calculate Frame Size

```
Frame Width = Total Width ÷ 4 columns
Frame Height = Total Height ÷ 4 rows
```

**Examples:**
- 128×128 image → 32×32 frames
- 192×192 image → 48×48 frames ✅ **Current setting**
- 256×256 image → 64×64 frames
- 512×512 image → 128×128 frames

## 🛠️ Solutions

### Solution 1: I Already Updated to 48×48 Frames

I've changed the settings from 32×32 to 48×48:

**Before:**
```tsx
frameWidth: 32,
frameHeight: 32,
player.setScale(3); // 32px → 96px display
```

**After:**
```tsx
frameWidth: 48,
frameHeight: 48,
player.setScale(2.5); // 48px → 120px display
```

This should show more of your character!

### Solution 2: If Still Not Working - Check Your Sprite

Open your sprite sheet in an image editor and verify:

1. **Total dimensions** - What's the full image size?
2. **Grid layout** - Is it 4 columns × 4 rows?
3. **Character position** - Is the character centered in each frame?

### Solution 3: Adjust Frame Size for Your Sprite

Edit `/src/components/IsometricGameScreen.tsx` line ~193:

**If your sprite is 256×256:**
```tsx
this.load.spritesheet('player', '/assets/characters/player.png', {
  frameWidth: 64,  // 256 ÷ 4
  frameHeight: 64, // 256 ÷ 4
});

// And update scale at line ~291:
player.setScale(2); // 64px → 128px display
```

**If your sprite is 512×512:**
```tsx
this.load.spritesheet('player', '/assets/characters/player.png', {
  frameWidth: 128,  // 512 ÷ 4
  frameHeight: 128, // 512 ÷ 4
});

// And update scale at line ~291:
player.setScale(1.5); // 128px → 192px display
```

**If your sprite is custom size:**
```tsx
// Measure your sprite sheet total size
const totalWidth = ???;  // Your sprite width in pixels
const totalHeight = ???; // Your sprite height in pixels

this.load.spritesheet('player', '/assets/characters/player.png', {
  frameWidth: totalWidth / 4,
  frameHeight: totalHeight / 4,
});
```

## 🎯 Understanding Scale

The scale multiplier affects the final display size:

```
Final Display Size = Frame Size × Scale

Examples:
32px frame × 3.0 scale = 96px display
48px frame × 2.5 scale = 120px display
64px frame × 2.0 scale = 128px display
128px frame × 1.5 scale = 192px display
```

**Recommended display sizes:**
- 96px - Good for small characters
- 120px - Current setting (balanced) ✅
- 128px - Good for medium characters
- 160px - Large characters
- 192px - Very large characters

## 🔧 Quick Fixes

### Fix 1: Character Too Small (Can't See Details)

**Increase scale:**
```tsx
player.setScale(3);   // Larger
player.setScale(4);   // Even larger
player.setScale(5);   // Very large
```

Update in 4 places in IsometricGameScreen.tsx:
- Line ~291: Initial scale
- Line ~446: When moving
- Line ~450: When idle
- Line ~455: When dialogue showing

### Fix 2: Character Too Large (Takes Up Whole Screen)

**Decrease scale:**
```tsx
player.setScale(1.5); // Smaller
player.setScale(1);   // Original size
player.setScale(0.5); // Half size
```

### Fix 3: Only Top of Character Showing

This means **frame size is too small**. Increase frameWidth and frameHeight:

```tsx
// If currently 32×32, try 48×48
frameWidth: 48,
frameHeight: 48,

// If currently 48×48, try 64×64
frameWidth: 64,
frameHeight: 64,
```

### Fix 4: Character Appears Stretched or Squished

Frame size doesn't match actual sprite dimensions. Check:
1. Is your sprite square? (same width and height)
2. Are all frames the same size?
3. Is there extra padding in the sprite sheet?

## 📊 Common Sprite Dimensions

### CodePen Style (Small)
- **Frame:** 32×32 px
- **Total:** 128×128 px
- **Scale:** 3-4x
- **Display:** 96-128 px

### Standard RPG (Medium)
- **Frame:** 48×48 px ✅ **Current**
- **Total:** 192×192 px
- **Scale:** 2-3x
- **Display:** 96-144 px

### HD RPG (Large)
- **Frame:** 64×64 px
- **Total:** 256×256 px
- **Scale:** 1.5-2x
- **Display:** 96-128 px

### High Resolution (Very Large)
- **Frame:** 128×128 px
- **Total:** 512×512 px
- **Scale:** 1-1.5x
- **Display:** 128-192 px

## 🎮 Test Your Changes

1. **Edit the code** with your new frame size and scale
2. **Save the file**
3. **Restart dev server:**
   ```bash
   npm run dev
   ```
4. **Check in browser** - Can you see the full character now?

## 🖼️ Visual Guide

### ❌ Problem: Only Seeing Hat
```
┌─────────┐
│   🎩    │  ← Only top visible
│         │
└─────────┘
Frame too small or scale too high!
```

### ✅ Solution: Full Character Visible
```
┌─────────┐
│   🎩    │
│   👤    │  ← Full character visible
│   👖    │
│   👞    │
└─────────┘
Correct frame size and scale!
```

## 📝 Checklist

Before asking for help, verify:

- [ ] Sprite sheet is 4 columns × 4 rows
- [ ] Frame size = Total size ÷ 4
- [ ] Character is centered in each frame
- [ ] Scale is between 1-5
- [ ] All 4 scale values updated in code
- [ ] Dev server restarted after changes

## 🆘 Still Having Issues?

### Debug Info to Collect:

1. **Sprite sheet size:** Check in file properties or image editor
   - Total width: _____ px
   - Total height: _____ px

2. **Current settings:** Check your code
   - frameWidth: _____ 
   - frameHeight: _____
   - scale: _____

3. **What you see:** Describe the issue
   - [ ] Only hat visible
   - [ ] Character cut off at waist
   - [ ] Character too small to see
   - [ ] Character too large (off screen)
   - [ ] Character stretched/squished

### Manual Calculation Example:

**Your sprite:** 256×256 px
```
Frame width = 256 ÷ 4 = 64px
Frame height = 256 ÷ 4 = 64px

Recommended scale for 120px display:
120 ÷ 64 = 1.875 → use 2.0

Code:
frameWidth: 64,
frameHeight: 64,
player.setScale(2);
```

## 🎨 Alternative: Use Different Sprite

If your current sprite doesn't work, download a working one:

**CodePen sprites (128×128):**
- [Hank](https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/WalkingDemo-HANK-2-SHEET.png)
- [Emmy](https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/WalkingDemo-EMMY-SHEET.png)
- [Bear](https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/WalkingDemo-BEAR-SHEET.png)

These are guaranteed to work with:
```tsx
frameWidth: 32,
frameHeight: 32,
player.setScale(3);
```

---

## 🚀 Current Settings

I've updated your game to use:
- **Frame size:** 48×48 pixels
- **Scale:** 2.5×
- **Display size:** 120×120 pixels

This should show your full character! Try it and let me know if you need further adjustments.
