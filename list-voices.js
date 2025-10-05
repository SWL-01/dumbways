// Simple script to list all ElevenLabs voices
// Run with: node list-voices.js

import fs from 'fs';
import path from 'path';

// Read API key from .env file
function getApiKey() {
  try {
    const envContent = fs.readFileSync('.env', 'utf8');
    const match = envContent.match(/VITE_ELEVENLABS_API_KEY=(.+)/);
    return match ? match[1].trim() : null;
  } catch (error) {
    console.error('Error reading .env file:', error.message);
    return null;
  }
}

async function listVoices() {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    console.error('API key not found. Make sure VITE_ELEVENLABS_API_KEY is set in your .env file');
    return;
  }

  try {
    console.log('Fetching voices from ElevenLabs...\n');
    
    const response = await fetch('https://api.elevenlabs.io/v1/voices', {
      headers: {
        'xi-api-key': apiKey,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    console.log(`Found ${data.voices.length} voices:\n`);
    console.log('| Voice ID | Name | Category | Preview |');
    console.log('|----------|------|----------|---------|');
    
    data.voices.forEach(voice => {
      const preview = voice.preview_url ? `[Preview](${voice.preview_url})` : 'No preview';
      console.log(`| \`${voice.voice_id}\` | ${voice.name} | ${voice.category || 'Unknown'} | ${preview} |`);
    });

    // Also save to a JSON file for easier inspection
    fs.writeFileSync('voices.json', JSON.stringify(data, null, 2));
    console.log('\n✅ Voice data saved to voices.json');
    
  } catch (error) {
    console.error('Error fetching voices:', error.message);
  }
}

listVoices();