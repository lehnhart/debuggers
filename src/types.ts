export interface CardType {
  id: number;
  name: string;
  description: string;
  color: string;
  bgColor: string;
  category: 'data' | 'operation' | 'control' | 'input' | 'output';
}

export interface Challenge {
  id: number;
  title: string;
  description: string;
  problem: string;
  correctSequence: number[]; // Array of card IDs
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
  expectedCards?: CardType[];
  actualCards?: CardType[];
}