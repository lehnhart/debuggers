import React from 'react';
import { ValidationResult as ValidationResultType } from '../types';
import { CheckCircle, XCircle, AlertCircle, Lightbulb } from 'lucide-react';

interface ValidationResultProps {
  result: ValidationResultType | null;
  explanation: string;
  onTryAgain: () => void;
  onNextChallenge: () => void;
  hasNextChallenge: boolean;
}

export const ValidationResult: React.FC<ValidationResultProps> = ({
  result,
  explanation,
  onTryAgain,
  onNextChallenge,
  hasNextChallenge
}) => {
  if (!result) return null;

  return (
    <div className={`p-6 rounded-xl shadow-lg ${
      result.isCorrect 
        ? 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200' 
        : 'bg-gradient-to-br from-red-50 to-rose-50 border border-red-200'
    }`}>
      <div className="flex items-start space-x-4">
        <div className={`p-2 rounded-full ${
          result.isCorrect ? 'bg-green-100' : 'bg-red-100'
        }`}>
          {result.isCorrect ? (
            <CheckCircle className="w-8 h-8 text-green-600" />
          ) : (
            <XCircle className="w-8 h-8 text-red-600" />
          )}
        </div>
        
        <div className="flex-1">
          <h3 className={`text-xl font-bold mb-2 ${
            result.isCorrect ? 'text-green-800' : 'text-red-800'
          }`}>
            {result.isCorrect ? '🎉 Parabéns!' : '❌ Sequência Incorreta'}
          </h3>
          
          <p className={`text-sm mb-4 ${
            result.isCorrect ? 'text-green-700' : 'text-red-700'
          }`}>
            {result.message}
          </p>

          {!result.isCorrect && result.incorrectPositions.length > 0 && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="w-5 h-5 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">
                  Posições incorretas: {result.incorrectPositions.map(pos => pos + 1).join(', ')}
                </span>
              </div>
            </div>
          )}

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mb-4">
            <div className="flex items-start space-x-2">
              <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-800 mb-1">
                  Explicação da Sequência Correta:
                </h4>
                <p className="text-sm text-blue-700">{explanation}</p>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            {!result.isCorrect && (
              <button
                onClick={onTryAgain}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Tentar Novamente
              </button>
            )}
            
            {result.isCorrect && hasNextChallenge && (
              <button
                onClick={onNextChallenge}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Próximo Desafio
              </button>
            )}
            
            {result.isCorrect && !hasNextChallenge && (
              <div className="text-green-700 font-medium">
                🏆 Todos os desafios concluídos!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};