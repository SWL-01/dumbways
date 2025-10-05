# Player Start Position Guide

## How to Set Custom Player Starting Position for Each Scene

The player's starting position can be customized for each scene using the `playerConfig` property in your scene configuration.

## Example Usage

```typescript
export const yourSceneConfig: SceneConfig = {
  name: 'Your Scene Name',
  backgroundUrl: '/scenes/yourscene.png',
  npcPosition: { x: 600, y: 300 },
  
  // 👇 Add this to customize player start position
  playerConfig: {
    startX: 200,  // X coordinate where player spawns
    startY: 450,  // Y coordinate where player spawns
  },
  
  objects: [
    // your objects...
  ],
};
```

## Available Player Config Options

You can customize more than just the starting position:

```typescript
playerConfig: {
  startX: 200,           // Starting X position
  startY: 450,           // Starting Y position
  speed: 200,            // Movement speed (default: 180)
  scale: 5,              // Player sprite size (default: 4)
  // ... and more (see types/game.ts)
}
```

## Default Values

If you don't specify `playerConfig`, these defaults are used:
- **startX**: 150
- **startY**: 450
- **speed**: 180
- **scale**: 4

## Current Scene Positions

### Party Scene
```typescript
playerConfig: {
  startX: 200,
  startY: 450,
}
```

### Office Scene
```typescript
playerConfig: {
  startX: 300,
  startY: 500,
}
```

## Tips for Choosing Start Positions

1. **Make sure player doesn't spawn inside objects** - Check object positions
2. **Consider NPC location** - Don't spawn too close to NPCs (min 80px distance triggers interaction)
3. **Stay within bounds** - Scene boundaries are at 50px from edges
4. **Game dimensions**: 1400px (width) × 800px (height)

## Quick Position Reference

```
Top-left corner:     (50, 50)
Top-right corner:    (1350, 50)
Bottom-left corner:  (50, 750)
Bottom-right corner: (1350, 750)
Center:              (700, 400)
```

## How to Apply to All Scenes

Simply add the `playerConfig` property to each scene configuration in `/src/data/sceneConfigs.ts`:

- ✅ `partySceneConfig` - Already configured
- ✅ `officeSceneConfig` - Already configured
- ⏳ `workshopSceneConfig` - Add as needed
- ⏳ `coffeeShopSceneConfig` - Add as needed
- ⏳ `livingRoomSceneConfig` - Add as needed
- ⏳ `librarySceneConfig` - Add as needed
- ⏳ `parkSceneConfig` - Add as needed
- ⏳ `travelAgencySceneConfig` - Add as needed
- ⏳ `conferenceSceneConfig` - Add as needed
- ⏳ `classroomSceneConfig` - Add as needed
- ⏳ `cubicleSceneConfig` - Add as needed
- ⏳ `messyRoomSceneConfig` - Add as needed

Happy coding! 🎮
