import { MBTIQuestion } from '../types/mbti';

export const mbtiQuestions: MBTIQuestion[] = [
  {
    id: 1,
    scenario: "You're at a party and someone starts a conversation with you...",
    optionA: {
      text: "Jump in excitedly and share stories!",
      dimension: 'E'
    },
    optionB: {
      text: "Listen carefully and respond thoughtfully",
      dimension: 'I'
    },
    animation: "party"
    , voice: "party"
  },
  {
    id: 2,
    scenario: "Can you make a plan for the company retreat? ... what will you answer it?",
    optionA: {
      text: "I will create a detailed schedule with backup plans",
      dimension: 'J'
    },
    optionB: {
      text: "I will keep it flexible and see what happens!",
      dimension: 'P'
    },
    animation: "planning"
    , voice: "party"
  },
  // {
  //   id: 3,
  //   scenario: "You need to solve a problem at work...",
  //   optionA: {
  //     text: "Look at the facts and data first",
  //     dimension: 'T'
  //   },
  //   optionB: {
  //     text: "Consider how it affects people's feelings",
  //     dimension: 'F'
  //   },
  //   animation: "problem"
  //   , voice: "party"}
  // ,
  // {
  //   id: 4,
  //   scenario: "Someone tells you about their amazing weekend...",
  //   optionA: {
  //     text: "Ask for specific details about what they did",
  //     dimension: 'S'
  //   },
  //   optionB: {
  //     text: "Imagine the bigger picture and what it meant to them",
  //     dimension: 'N'
  //   },
  //   animation: "listening"
  //   , voice: "party"}
  // ,
  // {
  //   id: 5,
  //   scenario: "It's Friday night after a long week...",
  //   optionA: {
  //     text: "Call up friends and hit the town!",
  //     dimension: 'E'
  //   },
  //   optionB: {
  //     text: "Netflix, pajamas, and silence = perfect",
  //     dimension: 'I'
  //   },
  //   animation: "weekend"
  //   , voice: "party"}
  // ,
  // {
  //   id: 6,
  //   scenario: "You're reading a book and...",
  //   optionA: {
  //     text: "You notice every detail and remember facts",
  //     dimension: 'S'
  //   },
  //   optionB: {
  //     text: "You imagine possibilities beyond the story",
  //     dimension: 'N'
  //   },
  //   animation: "reading"
  //   , voice: "party"}
  // ,
  // {
  //   id: 7,
  //   scenario: "Your friend is upset and comes to you...",
  //   optionA: {
  //     text: "Offer logical solutions to fix the problem",
  //     dimension: 'T'
  //   },
  //   optionB: {
  //     text: "Give them a hug and empathize",
  //     dimension: 'F'
  //   },
  //   animation: "comfort"
  //   , voice: "party"}
  // ,
  // {
  //   id: 8,
  //   scenario: "You're planning a vacation...",
  //   optionA: {
  //     text: "Book everything in advance with an itinerary",
  //     dimension: 'J'
  //   },
  //   optionB: {
  //     text: "Wing it and figure it out as you go!",
  //     dimension: 'P'
  //   },
  //   animation: "vacation"
  //   , voice: "party"}
  // ,
  // {
  //   id: 9,
  //   scenario: "At a group project meeting...",
  //   optionA: {
  //     text: "You're energized by brainstorming with everyone",
  //     dimension: 'E'
  //   },
  //   optionB: {
  //     text: "You prefer to think things through alone first",
  //     dimension: 'I'
  //   },
  //   animation: "meeting"
  //   , voice: "party"}
  // ,
  // {
  //   id: 10,
  //   scenario: "You're learning something new...",
  //   optionA: {
  //     text: "Focus on practical, hands-on experience",
  //     dimension: 'S'
  //   },
  //   optionB: {
  //     text: "Explore theories and future possibilities",
  //     dimension: 'N'
  //   },
  //   animation: "learning"
  //   , voice: "party"}
  // ,
  // {
  //   id: 11,
  //   scenario: "Someone criticizes your work...",
  //   optionA: {
  //     text: "Analyze if they're right objectively",
  //     dimension: 'T'
  //   },
  //   optionB: {
  //     text: "Feel hurt but try to understand their perspective",
  //     dimension: 'F'
  //   },
  //   animation: "criticism"
  //   , voice: "party"}
  // ,
  // {
  //   id: 12,
  //   scenario: "Your room is getting messy...",
  //   optionA: {
  //     text: "Clean it now before it gets worse!",
  //     dimension: 'J'
  //   },
  //   optionB: {
  //     text: "It's organized chaos, I know where everything is",
  //     dimension: 'P'
  //   },
  //   animation: "mess"
  //   , voice: "party"
  // }
];
