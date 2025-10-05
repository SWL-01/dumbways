#!/bin/bash

# List of scene components that need voiceId prop added
SCENE_FILES=(
  "src/components/scenes/OfficeGameScreen.tsx"
  "src/components/scenes/WorkshopGameScreen.tsx"
  "src/components/scenes/LivingRoomGameScreen.tsx"
  "src/components/scenes/LibraryGameScreen.tsx"
  "src/components/scenes/ParkGameScreen.tsx"
  "src/components/scenes/TravelAgencyGameScreen.tsx"
  "src/components/scenes/ConferenceGameScreen.tsx"
  "src/components/scenes/ClassroomGameScreen.tsx"
  "src/components/scenes/CubicleGameScreen.tsx"
  "src/components/scenes/MessyRoomGameScreen.tsx"
)

# Function to add voiceId prop to a scene component
add_voice_id_prop() {
  local file="$1"
  
  # Check if the file exists and doesn't already have voiceId
  if [[ -f "$file" ]] && ! grep -q "voiceId?: string;" "$file"; then
    echo "Updating $file..."
    
    # Add voiceId prop to the interface
    sed -i '/onAnswer: (dimension:.*) => void;/a \  voiceId?: string;' "$file"
    
    echo "✓ Updated $file"
  else
    echo "⚠ Skipped $file (file doesn't exist or already has voiceId)"
  fi
}

echo "Adding voiceId prop to remaining scene components..."

# Update each scene file
for file in "${SCENE_FILES[@]}"; do
  add_voice_id_prop "$file"
done

echo ""
echo "All scene components updated! ✨"