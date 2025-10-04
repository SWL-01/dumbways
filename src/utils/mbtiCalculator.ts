import { MBTIScores } from '../types/mbti';

export function calculateMBTIType(scores: MBTIScores): string {
  let type = '';

  type += scores.E > scores.I ? 'E' : 'I';
  type += scores.S > scores.N ? 'S' : 'N';
  type += scores.T > scores.F ? 'T' : 'F';
  type += scores.J > scores.P ? 'J' : 'P';

  return type;
}

export function getPercentages(scores: MBTIScores) {
  const totalEI = scores.E + scores.I;
  const totalSN = scores.S + scores.N;
  const totalTF = scores.T + scores.F;
  const totalJP = scores.J + scores.P;

  return {
    E: totalEI > 0 ? Math.round((scores.E / totalEI) * 100) : 50,
    I: totalEI > 0 ? Math.round((scores.I / totalEI) * 100) : 50,
    S: totalSN > 0 ? Math.round((scores.S / totalSN) * 100) : 50,
    N: totalSN > 0 ? Math.round((scores.N / totalSN) * 100) : 50,
    T: totalTF > 0 ? Math.round((scores.T / totalTF) * 100) : 50,
    F: totalTF > 0 ? Math.round((scores.F / totalTF) * 100) : 50,
    J: totalJP > 0 ? Math.round((scores.J / totalJP) * 100) : 50,
    P: totalJP > 0 ? Math.round((scores.P / totalJP) * 100) : 50,
  };
}

export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
