// Script to fetch available ElevenLabs voices  
import { ElevenLabsClient } from '@elevenlabs/elevenlabs-js';
import fs from 'fs';

async function fetchVoices() {
  try {
    // Read API key from .env file
    let apiKey;
    try {
      const envContent = fs.readFileSync('.env', 'utf8');
      const match = envContent.match(/VITE_ELEVENLABS_API_KEY=(.+)/);
      apiKey = match ? match[1].trim() : null;
    } catch (err) {
      console.error('Could not read .env file');
    }
    
    if (!apiKey) {
      apiKey = process.env.VITE_ELEVENLABS_API_KEY;
    }
    
    if (!apiKey) {
      console.error('VITE_ELEVENLABS_API_KEY not found in environment variables');
      return;
    }

    console.log('Fetching available voices...\n');
    
    const client = new ElevenLabsClient({
      apiKey: apiKey
    });

    const voices = await client.voices.getAll();
    
    console.log(`Found ${voices.voices.length} voices:\n`);
    
    voices.voices.forEach((voice, index) => {
      console.log(`${index + 1}. Name: ${voice.name}`);
      console.log(`   ID: ${voice.voiceId}`);
      console.log(`   Category: ${voice.category || 'N/A'}`);
      console.log(`   Description: ${voice.description || 'No description'}`);
      console.log(`   Labels: ${voice.labels ? Object.entries(voice.labels).map(([k,v]) => `${k}: ${v}`).join(', ') : 'None'}`);
      console.log(`   Preview URL: ${voice.previewUrl || 'N/A'}`);
      console.log('---');
    });

    // Suggest some good voices for gaming/personality tests
    console.log('\n🎮 RECOMMENDED VOICES FOR PERSONALITY TESTS/GAMES:');
    
    const gameVoices = voices.voices.filter(voice => {
      const name = voice.name.toLowerCase();
      const desc = (voice.description || '').toLowerCase();
      const labels = voice.labels || {};
      
      return (
        name.includes('adam') ||
        name.includes('alice') ||
        name.includes('bill') ||
        name.includes('charlie') ||
        name.includes('antoni') ||
        desc.includes('young') ||
        desc.includes('friendly') ||
        desc.includes('warm') ||
        desc.includes('conversational') ||
        labels.accent === 'american' ||
        labels.use_case === 'narration'
      );
    });

    gameVoices.forEach((voice, index) => {
      console.log(`⭐ ${voice.name} (${voice.voiceId})`);
      console.log(`   ${voice.description || 'No description'}`);
    });

  } catch (error) {
    console.error('Error fetching voices:', error.message);
    
    // If API call fails, provide some popular voice IDs
    console.log('\n📋 POPULAR VOICE IDs (if API call failed):');
    console.log('Adam (energetic male): pNInz6obpgDQGcFmaJgB');
    console.log('Alice (warm female): Xb7hH8MSUJpSbSDYk0k2');
    console.log('Antoni (young male): ErXwobaYiN019PkySvjV');
    console.log('Arnold (narrator): VR6AewLTigWG4xSOukaG');
    console.log('Bella (conversational): EXAVITQu4vr4xnSDxMaL');
    console.log('Bill (documentary): pqHfZKP75CvOlQylNhV4');
    console.log('Brian (deep male): nPczCjzI2devNBz1zQrb');
    console.log('Callum (video game): N2lVS1w4EtoT3dr4eOWO');
    console.log('Charlie (natural): IKne3meq5aSn9XLyUdCD');
    console.log('Chris (casual): iP95p4xoKVk53GoZ742B');
  }
}

fetchVoices();