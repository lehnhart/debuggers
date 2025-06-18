import React from 'react';
import { Trophy, Target, Zap } from 'lucide-react';
import { GameState } from '../types';

interface GameStatsProps {
  gameState: GameState;
  totalChallenges: number;
}

export const GameStats: React.FC<GameStatsProps> = ({ gameState, totalChallenges }) => {
  const successRate = gameState.attempts > 0 ? Math.round((gameState.completedChallenges.length / gameState.attempts) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center space-x-3">
          <Trophy className="w-8 h-8" />
          <div>
            <p className="text-purple-100 text-sm">Pontuação</p>
            <p className="text-2xl font-bold">{gameState.score}</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center space-x-3">
          <Target className="w-8 h-8" />
          <div>
            <p className="text-blue-100 text-sm">Progresso</p>
            <p className="text-2xl font-bold">{gameState.completedChallenges.length}/{totalChallenges}</p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center space-x-3">
          <Zap className="w-8 h-8" />
          <div>
            <p className="text-green-100 text-sm">Taxa de Sucesso</p>
            <p className="text-2xl font-bold">{successRate}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};