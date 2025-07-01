export interface Challenge {
  id: number;
  title: string;
  description: string;
  problem: string;
  correctSequence: string[]; // Array of code strings
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export interface GameState {
  currentChallenge: number;
  score: number;
  attempts: number;
  completedChallenges: number[];
  challengeAttempts: { [challengeId: number]: number }; // Track attempts per challenge
}

export interface ValidationResult {
  isCorrect: boolean;
  message: string;
  correctPositions: number[];
  incorrectPositions: number[];
  attemptsLeft?: number;
  showAnswerOption?: boolean;
}