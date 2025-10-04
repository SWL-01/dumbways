import { PersonalityType } from '../types/mbti';

export const personalityTypes: Record<string, PersonalityType> = {
  INTJ: {
    type: 'INTJ',
    title: 'The Mastermind',
    description: 'Strategic, analytical, and always thinking three steps ahead. You see patterns others miss and turn complex problems into elegant solutions.',
    strengths: ['Strategic thinking', 'Independent', 'Analytical', 'Determined', 'Innovative'],
    careers: ['Scientist', 'Engineer', 'Strategist', 'Architect', 'Developer']
  },
  INTP: {
    type: 'INTP',
    title: 'The Architect',
    description: 'Curious and inventive, you love exploring theories and understanding how things work. Your mind is a playground of ideas and possibilities.',
    strengths: ['Logical', 'Creative problem-solving', 'Open-minded', 'Objective', 'Innovative'],
    careers: ['Researcher', 'Programmer', 'Philosopher', 'Mathematician', 'Analyst']
  },
  ENTJ: {
    type: 'ENTJ',
    title: 'The Commander',
    description: 'Natural-born leaders who excel at organizing people and resources. You see the big picture and know how to get there efficiently.',
    strengths: ['Leadership', 'Strategic', 'Efficient', 'Confident', 'Decisive'],
    careers: ['CEO', 'Executive', 'Entrepreneur', 'Manager', 'Consultant']
  },
  ENTP: {
    type: 'ENTP',
    title: 'The Visionary',
    description: 'Quick-witted innovators who love debating ideas and challenging the status quo. You see possibilities everywhere and inspire others with your enthusiasm.',
    strengths: ['Innovative', 'Charismatic', 'Adaptable', 'Energetic', 'Quick-thinking'],
    careers: ['Inventor', 'Entrepreneur', 'Lawyer', 'Consultant', 'Marketing Director']
  },
  INFJ: {
    type: 'INFJ',
    title: 'The Advocate',
    description: 'Quietly insightful and deeply caring, you understand people at a profound level. You dream of making the world a better place and actually do it.',
    strengths: ['Insightful', 'Idealistic', 'Empathetic', 'Creative', 'Principled'],
    careers: ['Counselor', 'Writer', 'Psychologist', 'Teacher', 'Social Worker']
  },
  INFP: {
    type: 'INFP',
    title: 'The Mediator',
    description: 'Idealistic dreamers with a strong sense of values. You see beauty in the world and strive to align your life with your deeply held beliefs.',
    strengths: ['Empathetic', 'Creative', 'Passionate', 'Open-minded', 'Idealistic'],
    careers: ['Writer', 'Artist', 'Counselor', 'Teacher', 'Humanitarian']
  },
  ENFJ: {
    type: 'ENFJ',
    title: 'The Protagonist',
    description: 'Charismatic and inspiring leaders who genuinely care about others. You have a gift for bringing out the best in people and building strong communities.',
    strengths: ['Charismatic', 'Empathetic', 'Altruistic', 'Natural leader', 'Inspiring'],
    careers: ['Teacher', 'Coach', 'HR Manager', 'Diplomat', 'Public Speaker']
  },
  ENFP: {
    type: 'ENFP',
    title: 'The Campaigner',
    description: 'Enthusiastic and creative spirits who see life as full of possibilities. Your infectious energy and genuine interest in people make you a natural connector.',
    strengths: ['Enthusiastic', 'Creative', 'Sociable', 'Empathetic', 'Optimistic'],
    careers: ['Actor', 'Journalist', 'Designer', 'Entrepreneur', 'Social Media Manager']
  },
  ISTJ: {
    type: 'ISTJ',
    title: 'The Logistician',
    description: 'Reliable and practical, you value tradition and order. Your attention to detail and commitment to doing things right makes you the backbone of any organization.',
    strengths: ['Responsible', 'Organized', 'Practical', 'Honest', 'Loyal'],
    careers: ['Accountant', 'Manager', 'Auditor', 'Military Officer', 'Administrator']
  },
  ISFJ: {
    type: 'ISFJ',
    title: 'The Defender',
    description: 'Warm and conscientious protectors who never forget important details about people. You go above and beyond to make others feel cared for.',
    strengths: ['Supportive', 'Reliable', 'Patient', 'Practical', 'Loyal'],
    careers: ['Nurse', 'Teacher', 'Administrator', 'Social Worker', 'Librarian']
  },
  ESTJ: {
    type: 'ESTJ',
    title: 'The Executive',
    description: 'Organized administrators who excel at managing people and processes. You believe in order, rules, and getting things done efficiently.',
    strengths: ['Organized', 'Practical', 'Direct', 'Strong-willed', 'Dedicated'],
    careers: ['Manager', 'Police Officer', 'Judge', 'Business Owner', 'Administrator']
  },
  ESFJ: {
    type: 'ESFJ',
    title: 'The Consul',
    description: 'Caring and social, you thrive on helping others and bringing people together. Your warmth and organizational skills make any gathering feel special.',
    strengths: ['Caring', 'Social', 'Organized', 'Loyal', 'Practical'],
    careers: ['Event Planner', 'Teacher', 'Nurse', 'Sales Rep', 'Office Manager']
  },
  ISTP: {
    type: 'ISTP',
    title: 'The Virtuoso',
    description: 'Bold and practical experimenters who love working with their hands. You stay calm in crises and excel at understanding how things work.',
    strengths: ['Practical', 'Calm', 'Logical', 'Flexible', 'Hands-on'],
    careers: ['Mechanic', 'Engineer', 'Pilot', 'Carpenter', 'Forensic Scientist']
  },
  ISFP: {
    type: 'ISFP',
    title: 'The Adventurer',
    description: 'Flexible and charming artists who live in the moment. You appreciate beauty in everyday life and express yourself through creative pursuits.',
    strengths: ['Creative', 'Passionate', 'Curious', 'Artistic', 'Spontaneous'],
    careers: ['Artist', 'Designer', 'Musician', 'Chef', 'Veterinarian']
  },
  ESTP: {
    type: 'ESTP',
    title: 'The Entrepreneur',
    description: 'Energetic and perceptive, you dive into action and learn by doing. You excel at spotting opportunities and living life on the edge.',
    strengths: ['Bold', 'Practical', 'Direct', 'Sociable', 'Perceptive'],
    careers: ['Entrepreneur', 'Sales Rep', 'Paramedic', 'Detective', 'Athlete']
  },
  ESFP: {
    type: 'ESFP',
    title: 'The Entertainer',
    description: 'Spontaneous and enthusiastic performers who love being center stage. Your energy and warmth light up any room you enter.',
    strengths: ['Enthusiastic', 'Fun-loving', 'Spontaneous', 'Practical', 'Friendly'],
    careers: ['Performer', 'Event Planner', 'Teacher', 'Tour Guide', 'Sales Rep']
  }
};
