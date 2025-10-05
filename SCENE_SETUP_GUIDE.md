# Scene Setup Guide for PathQuest 2.5D Game

## 📁 Folder Structure

Create a `scenes` folder in your `public` directory:

```
dumbways/
  public/
    scenes/
      party.png
      office.png
      workshop.png
      coffee.png
      livingroom.png
      library.png
      park.png
      travel.png
      conference.png
      classroom.png
      cubicle.png
      messyroom.png
```

## 🎨 Scene Requirements for Each Scenario

### 1. **party.png** - Party Scene
- **Style**: Colorful living room with party decorations
- **Elements**: Couch, snack table, music system, balloons, lights
- **Color Palette**: Warm, vibrant (purples, pinks, reds)
- **Mood**: Energetic, social

### 2. **office.png** - Office Meeting Room
- **Style**: Professional conference room
- **Elements**: Large table, chairs, whiteboard, presentation screen
- **Color Palette**: Blues, grays, neutrals
- **Mood**: Formal, organized

### 3. **workshop.png** - Workshop/Garage
- **Style**: Industrial workspace
- **Elements**: Workbench, toolbox, equipment, projects
- **Color Palette**: Grays, browns, metallic
- **Mood**: Practical, hands-on

### 4. **coffee.png** - Coffee Shop
- **Style**: Cozy café interior
- **Elements**: Small tables, coffee counter, plants, cozy chairs
- **Color Palette**: Warm browns, creams, greens
- **Mood**: Relaxed, conversational

### 5. **livingroom.png** - Living Room (Weekend)
- **Style**: Comfortable home living space
- **Elements**: Sofa, TV, coffee table, bookshelf
- **Color Palette**: Warm neutrals, earth tones
- **Mood**: Comfortable, homey

### 6. **library.png** - Library
- **Style**: Quiet reading space with books
- **Elements**: Bookshelves, reading chairs, desk lamps
- **Color Palette**: Dark woods, deep reds, warm lighting
- **Mood**: Quiet, intellectual

### 7. **park.png** - Park Bench
- **Style**: Outdoor park setting
- **Elements**: Bench, trees, path, grass
- **Color Palette**: Greens, blues, natural
- **Mood**: Peaceful, supportive

### 8. **travel.png** - Travel Agency
- **Style**: Travel office with maps and posters
- **Elements**: Desk, world map, travel posters, brochures
- **Color Palette**: Blues, yellows, bright
- **Mood**: Adventurous, exciting

### 9. **conference.png** - Conference Hall
- **Style**: Large presentation space
- **Elements**: Podium, projector, rows of chairs
- **Color Palette**: Formal blues, grays
- **Mood**: Professional, collaborative

### 10. **classroom.png** - Classroom
- **Style**: Educational setting
- **Elements**: Student desks, blackboard, teacher's desk
- **Color Palette**: Yellows, whites, educational
- **Mood**: Learning, structured

### 11. **cubicle.png** - Office Cubicle
- **Style**: Personal workspace
- **Elements**: Desk, computer, filing cabinets, personal items
- **Color Palette**: Neutral grays, blues
- **Mood**: Professional, personal

### 12. **messyroom.png** - Messy Room
- **Style**: Disorganized bedroom
- **Elements**: Unmade bed, clothes piles, scattered items
- **Color Palette**: Varied, chaotic
- **Mood**: Casual, lived-in

## 🖼️ Image Specifications

- **Size**: 1000x600 pixels (16:9 aspect ratio)
- **Format**: PNG with transparency OR JPG
- **Style**: Pixel art or illustrated 2D/2.5D perspective
- **View**: Slight isometric or top-down view works best
- **Lighting**: Varied per scene mood

## 🎨 Where to Get Scene Images

### Option 1: AI Generation
Use AI art generators with prompts like:
```
"pixel art party scene, isometric view, colorful decorations, 
cozy living room, video game style, 16-bit graphics"
```

Tools:
- Midjourney
- DALL-E
- Stable Diffusion
- Leonardo.AI

### Option 2: Game Asset Marketplaces
- itch.io (search "pixel art backgrounds")
- OpenGameArt.org
- Kenney.nl (free assets)
- Unity Asset Store

### Option 3: Create Your Own
Use pixel art tools:
- Aseprite
- Piskel
- Photoshop (with pixel grid)

### Option 4: Placeholder Colors
If you don't have images yet, the game will use fallback colors!
Each scene already has a gradient background configured.

## 🚀 Quick Start (No Images Required!)

The game will work without images! It uses:
- ✅ Colored gradient backgrounds
- ✅ Colored character sprites
- ✅ Interactive objects as colored squares
- ✅ Isometric grid overlay

Simply run `npm run dev` and start playing!

## 📝 Adding Images Later

1. Create or download your scene images
2. Name them exactly as listed above
3. Place in `/public/scenes/` folder
4. Refresh your browser - images load automatically!

## 🎮 Game Features

Your game now includes:
- 🖱️ Click-to-move navigation
- ⌨️ Keyboard interaction (E / SPACE)
- 🎯 Multiple interactive objects per scene
- 👥 NPCs to trigger dialogues
- 📊 Progress tracking
- 🎨 Pixel-perfect rendering
- 🌟 Depth sorting for 2.5D effect
- ✨ Object highlighting on proximity

## 💡 Tips

- Use consistent art style across all scenes
- Keep important interactive areas clear
- Add visual variety between scenes
- Consider color psychology for each scenario's mood
- Test on different screen sizes

---

**Your game is ready to play right now!** 
Add custom scene images anytime to enhance the visual experience.
