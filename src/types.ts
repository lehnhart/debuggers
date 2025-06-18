export interface Challenge {
  id: number;
  title: string;
  description: string;
  problem: string;
  correctSequence: number[];
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export interface GameState {
  currentChallenge: number;
  score: number;
  attempts: number;
  completedChallenges: number[];
}

export interface ValidationResult {
  isCorrect: boolean;
  message: string;
  correctPositions: number[];
  incorrectPositions: number[];
}