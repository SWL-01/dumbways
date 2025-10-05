# Sprite Sheet Information

## Current Setup (Single Image)
- **File:** `/public/assets/characters/player.png`
- **Size:** 128×128 pixels (single frame)
- **Type:** Static image (no animation)
- **Status:** ✅ Working - character will move but won't animate

## To Add Walking Animation

You need to create a **4×4 spritesheet** (16 frames total):

### Required Specifications:
- **Total size:** 512×512 pixels
- **Frame size:** 128×128 pixels each
- **Layout:** 4 rows × 4 columns

### Frame Layout:
```
Row 0 (Y=0):   Frame 0-3   = Walking DOWN (4 animation frames)
Row 1 (Y=128): Frame 4-7   = Walking RIGHT (4 animation frames)  
Row 2 (Y=256): Frame 8-11  = Walking UP (4 animation frames)
Row 3 (Y=384): Frame 12-15 = Walking LEFT (4 animation frames)
```

### Example:
```
[DOWN1][DOWN2][DOWN3][DOWN4]
[RIGHT1][RIGHT2][RIGHT3][RIGHT4]
[UP1][UP2][UP3][UP4]
[LEFT1][LEFT2][LEFT3][LEFT4]
```

### How to Create:
1. Take your current 128×128 character image
2. Create 4 walking frames for each direction (16 total frames)
3. Arrange them in a 512×512 grid as shown above
4. Save as `/public/assets/characters/player.png`

### Reference:
See the CodePen example: https://codepen.io/TwigHisDev/pen/bGoxbaK
- Uses the same 4×4 layout
- Each row is a direction
- Each frame in a row is a walking animation step

## Current Controls:
- **WASD** or **Arrow Keys**: Move character
- **E** or **SPACE**: Interact with NPCs/objects
- Character moves at 180 pixels/second
- Diagonal movement is normalized (not faster than straight movement)
