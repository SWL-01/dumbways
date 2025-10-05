# 🎮 PathQuest - Interactive MBTI Personality Test

> **StormHacks 2025 @ SFU Hackathon Project**  
> Discover your personality through an immersive gaming experience!

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-PathQuest-blue?style=for-the-badge)](https://pathquest-ten.vercel.app/)
[![StormHacks 2025](https://img.shields.io/badge/🏆_StormHacks-2025-orange?style=for-the-badge)](https://stormhacks2025.devpost.com/)

## 📖 About

PathQuest transforms the traditional MBTI personality test into an engaging, interactive adventure. Instead of answering boring questions, users navigate through four unique social scenarios as a game character, making choices that reveal their true personality type.

### ✨ Key Features

- **🎮 Interactive Gameplay**: Navigate through 4 beautifully designed Phaser.js game scenes
- **🎯 Realistic Scenarios**: Party, Office, Classroom, and Coffee Shop environments
- **🤖 AI-Powered Analysis**: Personalized insights using Google Gemini 2.5 Flash
- **🎙️ Voice Narration**: Immersive audio experience with ElevenLabs text-to-speech
- **📊 Detailed Results**: MBTI type breakdown with percentage analysis
- **🎨 Beautiful UI**: Modern, responsive design with Tailwind CSS
- **♿ Accessible**: Age-appropriate recommendations (1-120 years)

## 🚀 Live Demo

**Try it now:** [https://pathquest-ten.vercel.app/](https://pathquest-ten.vercel.app/)

## 🛠️ Tech Stack

### Frontend
- **React 18.3** - UI library
- **TypeScript** - Type safety
- **Vite 5.4** - Build tool & dev server
- **Tailwind CSS** - Styling
- **Phaser 3.90** - Game engine
- **Lucide React** - Icons

### Backend & AI
- **Google Gemini 2.5 Flash** - AI personality analysis
- **ElevenLabs API** - Text-to-speech narration
- **Express 5.1** - Local development server
- **Vercel Serverless Functions** - Production API

### Infrastructure
- **Vercel** - Hosting & deployment
- **Node.js 21** - Runtime environment
- **ESLint** - Code linting

## 🎯 How It Works

1. **Enter Your Age** - Personalized analysis based on your life stage
2. **Choose Your Voice** - Select your preferred narrator
3. **Play Through Scenarios** - Navigate 4 social situations as a character
4. **Make Choices** - Interact with objects and people in each scene
5. **Get Results** - Receive your MBTI type with AI-powered insights
6. **Discover Careers** - See recommended career paths for your personality

## 🎮 Game Scenes

### 🎉 Party Scene
Navigate a lively party with snack tables, speakers, and decorations. Do you mingle with the crowd or stick to familiar faces?

### 💼 Office Scene
Experience a professional workplace environment. Are you the team player or the independent contributor?

### 📚 Classroom Scene
Return to an academic setting with desks, a teacher's area, and study materials. Group project or solo work?

### ☕ Coffee Shop Scene
Relaxed café atmosphere with seating areas and a counter. Work alone or join the conversation?

## 🏗️ Project Structure

```
dumbways/
├── src/
│   ├── components/
│   │   ├── StartScreen.tsx       # Age input & voice selection
│   │   ├── QuestionScreen.tsx    # Game scenes container
│   │   ├── ResultsScreen.tsx     # MBTI results & AI analysis
│   │   └── BaseGameScreen.tsx    # Phaser game logic
│   ├── data/
│   │   ├── questions.ts          # Scene configurations
│   │   ├── personalities.ts      # MBTI type descriptions
│   │   └── sceneConfigs.ts       # Collision & layout data
│   ├── types/
│   │   ├── mbti.ts              # TypeScript interfaces
│   │   └── game.ts              # Game type definitions
│   └── utils/
│       └── mbtiCalculator.ts    # Personality scoring logic
├── server/
│   └── index.ts                 # Local Express server
├── api/
│   └── gemini.ts               # Vercel serverless function
└── public/
    └── images/                  # Scene backgrounds & assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 21+ 
- npm or yarn
- Google Gemini API key
- ElevenLabs API key (optional for voice)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/minecraftcodingcamper/dumbways.git
cd dumbways
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
```

4. **Run the development servers**

Terminal 1 - Frontend:
```bash
npm run dev
```

Terminal 2 - Backend:
```bash
npm run dev:server
```

5. **Open your browser**
```
http://localhost:5173
```

## 📦 Building for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## 🌐 Deployment

This project is configured for Vercel deployment:

1. Push your code to GitHub
2. Import the project in Vercel
3. Set environment variables in Vercel dashboard:
   - `GEMINI_API_KEY`
   - `VITE_ELEVENLABS_API_KEY`
4. Deploy!

The serverless function at `/api/gemini.ts` will automatically handle production API requests.

## 🎨 Features Deep Dive

### Collision System
- Realistic invisible boundaries around furniture and objects
- Phaser arcade physics for smooth movement
- 21+ collision objects across 4 scenes
- Debug mode available for development

### AI Analysis
- Age-specific personality insights
- Career recommendations based on MBTI type
- Detailed trait explanations (E/I, S/N, T/F, J/P)
- Powered by Google's latest Gemini 2.5 Flash model

### Voice System
- Multiple voice options for narration
- Text-to-speech powered by ElevenLabs
- Accessible audio controls
- Voice selection persists across sessions

## 🤝 Contributing

This project was created for StormHacks 2025. Feel free to fork and adapt for your own use!

## 📝 License

This project is open source and available under the MIT License.

## 🏆 Hackathon

**StormHacks 2025 @ Simon Fraser University**  
[View on Devpost](https://stormhacks2025.devpost.com/)

## 👥 Team

Built with ❤️ by the PathQuest team for StormHacks 2025

## 🙏 Acknowledgments

- Google Gemini API for AI-powered personality analysis
- ElevenLabs for text-to-speech technology
- Phaser.js community for game engine documentation
- StormHacks organizers for hosting an amazing event

---

**🎮 Ready to discover your path? [Play PathQuest Now!](https://pathquest-ten.vercel.app/)**