# 🎨 How to Add Custom Sprites & Object Images

## 📁 Sprite Folder Structure

Create an `assets` folder in your `public` directory:

```
dumbways/
  public/
    assets/
      characters/
        player.png           ← Player character sprite
        npc.png             ← NPC sprite
      objects/
        table.png
        couch.png
        desk.png
        toolbox.png
        workbench.png
        counter.png
        bookshelf.png
        bench.png
        tree.png
        map.png
        podium.png
        blackboard.png
        computer.png
        bed.png
        (add more as needed)
```

## 🎮 Character Sprites

### Simple Static Sprites (Easiest)
**Size**: 32x48 pixels (width x height)
**Format**: PNG with transparency
**Style**: Pixel art, 16-bit style

Example player sprite:
- Standing pose
- Facing forward
- Clear silhouette

### Animated Sprite Sheets (Advanced)
**Size**: 128x48 pixels (4 frames @ 32x48 each)
**Layout**: Horizontal strip (frame1, frame2, frame3, frame4)
**Animations**: Walking, idle

```
[Idle] [Walk1] [Walk2] [Walk3]
  32px   32px    32px    32px
```

## 🪑 Object Sprites

### Object Size Guide
- **Small objects** (cups, tools): 24x24 pixels
- **Medium objects** (chairs, tables): 40x40 pixels
- **Large objects** (beds, couches): 64x48 pixels

### Object Types You Need

| Object Type | Used In Scenes | Suggested Size |
|------------|----------------|----------------|
| table | party, coffee, travel | 40x40 |
| couch | party, livingroom | 64x48 |
| desk | office, classroom, cubicle | 48x40 |
| toolbox | workshop | 32x32 |
| workbench | workshop | 64x40 |
| counter | coffee | 48x36 |
| bookshelf | library | 40x56 |
| bench | park | 48x32 |
| tree | park | 48x64 |
| tv | livingroom | 40x30 |
| map | travel | 48x48 |
| podium | conference | 32x40 |
| projector | conference | 36x24 |
| blackboard | classroom | 56x40 |
| computer | cubicle | 32x28 |
| bed | messyroom | 64x48 |
| pile | messyroom | 40x32 |

## 🔧 How to Add Sprites to Your Game

### Method 1: Using Code (What I'll Update)

I'll update `IsometricGameScreen.tsx` to:
1. Load sprite images from `/public/assets/`
2. Fall back to colored squares if images don't exist
3. Support both static images and sprite sheets

### Method 2: Quick Test with Existing Images

You can use **any PNG image** as a placeholder:

```tsx
// In preload function, change:
this.load.image('player', '/assets/characters/player.png');
this.load.image('npc', '/assets/characters/npc.png');
this.load.image('table', '/assets/objects/table.png');
```

## 🎨 Where to Get Sprite Images

### Free Pixel Art Assets

1. **Kenney.nl** (Free!)
   - https://kenney.nl/assets
   - Huge collection of game assets
   - Search for "topdown" or "isometric"

2. **OpenGameArt.org**
   - https://opengameart.org/
   - Free game sprites
   - Filter by "pixel art" and "2D"

3. **itch.io**
   - https://itch.io/game-assets/free
   - Search "pixel art character" or "pixel art objects"
   - Many free asset packs

4. **Craft Pix**
   - https://craftpix.net/freebies/
   - Free game assets section

### AI Generation

Use AI with these prompts:

```
"pixel art character sprite, 32x48 pixels, top-down view, 
 standing pose, blue shirt, simple design, transparent background"

"pixel art table sprite, 40x40 pixels, isometric view, 
 wooden texture, game asset, transparent background"
```

Tools:
- **Pixelied.com** - Pixel art generator
- **Piskel** - Free online pixel editor
- **Aseprite** - Professional pixel art tool ($20)

### Create Your Own

**Tools:**
- **Piskel** (Free, web-based): https://www.piskelapp.com/
- **Aseprite** ($20): https://www.aseprite.org/
- **GIMP** (Free): Enable pixel grid, zoom in

**Quick Tutorial:**
1. Create new image (32x48 for character)
2. Enable pixel grid
3. Zoom to 400-800%
4. Draw with pencil tool
5. Export as PNG with transparency

## 📝 Step-by-Step: Adding Your First Sprite

### Example: Adding a Player Character

1. **Get or create** a player sprite (32x48 PNG)

2. **Save it** as `/public/assets/characters/player.png`

3. **The game automatically loads it!** (I'll update the code to do this)

4. **No code changes needed** - just add the file

### Example: Adding a Table Object

1. **Get or create** a table sprite (40x40 PNG)

2. **Save it** as `/public/assets/objects/table.png`

3. **Done!** The game loads it automatically for all scenes with tables

## 🖼️ Sprite Image Requirements

### Technical Specs
- **Format**: PNG (with transparency)
- **Background**: Transparent (no white background)
- **Color Mode**: RGB or RGBA
- **Bit Depth**: 8-bit per channel
- **Compression**: PNG-8 or PNG-24

### Quality Guidelines
- ✅ Clear silhouette
- ✅ Consistent pixel size (no anti-aliasing)
- ✅ Good contrast
- ✅ Simple, readable design
- ✅ Transparent background
- ❌ Avoid blurry edges
- ❌ Avoid too much detail
- ❌ Avoid white backgrounds

## 🎭 Sprite Sheet Animation (Advanced)

### Creating a Walking Animation

1. **Create sprite sheet**: 128x48 pixels (4 frames)
   ```
   [Frame 1] [Frame 2] [Frame 3] [Frame 4]
   Legs    Legs     Legs     Legs
   apart   together  apart    together
   ```

2. **Save** as `/public/assets/characters/player-walk.png`

3. **Load in Phaser**:
   ```tsx
   this.load.spritesheet('player', '/assets/characters/player-walk.png', {
     frameWidth: 32,
     frameHeight: 48
   });
   ```

4. **Create animation**:
   ```tsx
   this.anims.create({
     key: 'walk',
     frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
     frameRate: 8,
     repeat: -1
   });
   ```

5. **Play animation**:
   ```tsx
   player.play('walk');
   ```

## 🚀 Quick Start Without Custom Sprites

**Good news:** Your game already works with colored shapes!

- Blue square = Player ✅
- Orange square = NPC ✅
- Green squares = Objects ✅

These are perfectly fine for:
- Testing gameplay
- Prototyping
- Showing game mechanics

Add custom sprites **later** when you have time!

## 💡 Recommended Workflow

### Phase 1: Start Simple (Now)
- Use colored squares (already done!)
- Focus on gameplay and questions
- Test game mechanics

### Phase 2: Add Characters (Next)
1. Find or create player sprite
2. Find or create NPC sprite
3. Test with 1-2 scenes

### Phase 3: Add Objects (Later)
1. Add common objects (table, chair)
2. Test across multiple scenes
3. Add scene-specific objects

### Phase 4: Polish (Optional)
1. Add walking animations
2. Add idle animations
3. Add interaction effects
4. Add shadows

## 🎨 Color Palette Suggestions

For consistent pixel art style:

**Player Character:**
- Primary: #4A9EFF (blue)
- Secondary: #2D5A8C (dark blue)
- Skin: #FFDBAC (light)
- Outline: #1A1A1A (dark)

**NPC Characters:**
- Primary: #FF9D4A (orange)
- Secondary: #CC6E2C (dark orange)
- Variety: Use different colors per scene

**Objects:**
- Wood: #8B6F47, #654321
- Metal: #888888, #555555
- Fabric: #CC6666, #4A4A8C

## 📦 Asset Pack Recommendations

**Free Options:**
1. **Kenney's Top-Down Pack** - Perfect for your game
2. **Liberated Pixel Cup (LPC) Character Generator** - Customizable characters
3. **Ninja Adventure Asset Pack** - Free on itch.io

**Paid Options (Budget-Friendly):**
1. **Pixel Art Top-Down Bundle** on itch.io ($5-15)
2. **Character Generator** on itch.io ($10-20)

## 🔍 What's Next?

I'll now update your `IsometricGameScreen.tsx` to:
1. ✅ Automatically load sprites from `/public/assets/`
2. ✅ Fall back to colored squares if sprites don't exist
3. ✅ Support different object sprites
4. ✅ Make it easy to swap sprites without code changes

**You won't need to edit any code** - just add PNG files to the folders!

---

Ready for me to update the code? 🚀
