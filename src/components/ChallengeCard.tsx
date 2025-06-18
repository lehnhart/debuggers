import React from 'react';
import { Challenge } from '../types';
import { Star, Clock, BookOpen } from 'lucide-react';

interface ChallengeCardProps {
  challenge: Challenge;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge,
  isActive,
  isCompleted,
  onClick
}) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyStars = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 1;
      case 'medium': return 2;
      case 'hard': return 3;
      default: return 1;
    }
  };

  return (
    <div
      onClick={onClick}
      className={`
        relative p-6 rounded-xl cursor-pointer transition-all duration-300 transform hover:scale-105
        ${isActive 
          ? 'bg-gradient-to-br from-purple-500 to-blue-600 text-white shadow-xl' 
          : 'bg-white hover:bg-gray-50 shadow-lg hover:shadow-xl'
        }
        ${isCompleted ? 'ring-2 ring-green-400' : ''}
      `}
    >
      {isCompleted && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
      
      <div className="flex items-start justify-between mb-3">
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
          {challenge.difficulty.toUpperCase()}
        </div>
        <div className="flex items-center space-x-1">
          {[...Array(getDifficultyStars(challenge.difficulty))].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
          ))}
        </div>
      </div>

      <h3 className={`text-lg font-bold mb-2 ${isActive ? 'text-white' : 'text-gray-900'}`}>
        {challenge.title}
      </h3>
      
      <p className={`text-sm mb-3 ${isActive ? 'text-blue-100' : 'text-gray-600'}`}>
        {challenge.description}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-1">
          <BookOpen className={`w-4 h-4 ${isActive ? 'text-blue-200' : 'text-gray-500'}`} />
          <span className={`text-xs ${isActive ? 'text-blue-200' : 'text-gray-500'}`}>
            {challenge.category}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className={`w-4 h-4 ${isActive ? 'text-blue-200' : 'text-gray-500'}`} />
          <span className={`text-xs ${isActive ? 'text-blue-200' : 'text-gray-500'}`}>
            {challenge.correctSequence.length} steps
          </span>
        </div>
      </div>
    </div>
  );
};