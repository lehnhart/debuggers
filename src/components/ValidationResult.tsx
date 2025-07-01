import React from 'react';
import { ValidationResult as ValidationResultType } from '../types';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface ValidationResultProps {
  result: ValidationResultType | null;
  onTryAgain: () => void;
  onNextChallenge: () => void;
  hasNextChallenge: boolean;
  correctSequence: string[];
  userSequence: string[];
  maxAttemptsReached?: boolean;
}

export const ValidationResult: React.FC<ValidationResultProps> = ({
  result,
  onTryAgain,
  onNextChallenge,
  hasNextChallenge,
  correctSequence,
  userSequence,
  maxAttemptsReached = false
}) => {
  if (!result) return null;

  const renderCodeComparison = () => {
    return (
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-800">Comparação de Códigos:</h4>
        
        <div className="grid gap-4">
          {/* Expected Sequence */}
          <div>
            <h5 className="text-sm font-medium text-green-700 mb-2">Sequência Esperada:</h5>
            <div className="flex flex-wrap gap-2">
              {correctSequence.map((code, index) => (
                <div
                  key={`correct-${index}`}
                  className="bg-gradient-to-br from-green-400 to-green-600 text-white px-3 py-2 rounded-lg text-sm font-mono shadow-sm"
                >
                  {code}
                </div>
              ))}
            </div>
          </div>

          {/* User Sequence */}
          <div>
            <h5 className="text-sm font-medium text-blue-700 mb-2">Sua Sequência:</h5>
            <div className="flex flex-wrap gap-2">
              {userSequence.map((code, index) => {
                const isCorrect = correctSequence[index] === code;
                
                return (
                  <div
                    key={`user-${index}`}
                    className={`
                      px-3 py-2 rounded-lg text-sm font-mono shadow-sm relative
                      ${isCorrect 
                        ? 'bg-gradient-to-br from-green-400 to-green-600 text-white ring-2 ring-green-400' 
                        : 'bg-gradient-to-br from-red-400 to-red-600 text-white ring-2 ring-red-400'
                      }
                    `}
                  >
                    {code}
                    {!isCorrect && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                        <XCircle className="w-3 h-3 text-white" />
                      </div>
                    )}
                    {isCorrect && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`p-6 rounded-xl shadow-lg ${
      result.isCorrect 
        ? 'bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200' 
        : 'bg-gradient-to-br from-red-50 to-rose-50 border border-red-200'
    }`}>
      <div className="space-y-6">
        {/* Result Header */}
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
              {result.isCorrect ? '🎉 Código Correto!' : '❌ Código Incorreto'}
            </h3>
            
            <p className={`text-sm mb-4 ${
              result.isCorrect ? 'text-green-700' : 'text-red-700'
            }`}>
              {result.message}
            </p>
          </div>
        </div>

        {/* Code Comparison - Show when incorrect */}
        {!result.isCorrect && (
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            {renderCodeComparison()}
          </div>
        )}

        {/* Incorrect Positions Alert */}
        {!result.isCorrect && result.incorrectPositions.length > 0 && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-800">
                Posições incorretas: {result.incorrectPositions.map(pos => pos + 1).join(', ')}
              </span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          {!result.isCorrect && !maxAttemptsReached && (
            <button
              onClick={onTryAgain}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tentar Novamente
            </button>
          )}
          
          {(result.isCorrect || maxAttemptsReached) && hasNextChallenge && (
            <button
              onClick={onNextChallenge}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Próximo Desafio
            </button>
          )}
          
          {result.isCorrect && !hasNextChallenge && (
            <div className="text-green-700 font-medium flex items-center space-x-2">
              <span>🏆 Todos os desafios concluídos!</span>
            </div>
          )}

          {maxAttemptsReached && !result.isCorrect && (
            <button
              onClick={onTryAgain}
              className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Resetar Desafio
            </button>
          )}
        </div>
      </div>
    </div>
  );
};