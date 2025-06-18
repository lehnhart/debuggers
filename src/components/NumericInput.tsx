import React, { useState } from 'react';
import { Hash, Play, RotateCcw } from 'lucide-react';

interface NumericInputProps {
  onSequenceSubmit: (sequence: number[]) => void;
  expectedLength: number;
  disabled?: boolean;
}

export const NumericInput: React.FC<NumericInputProps> = ({
  onSequenceSubmit,
  expectedLength,
  disabled = false
}) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const trimmedInput = inputValue.trim();
    
    if (!trimmedInput) {
      setError('Por favor, digite uma sequência de números');
      return;
    }

    // Parse the input - split by spaces and convert to numbers
    const numbers = trimmedInput.split(/\s+/).map(str => {
      const num = parseInt(str, 10);
      if (isNaN(num)) {
        throw new Error(`"${str}" não é um número válido`);
      }
      return num;
    });

    if (numbers.length !== expectedLength) {
      setError(`A sequência deve ter exatamente ${expectedLength} números`);
      return;
    }

    setError('');
    onSequenceSubmit(numbers);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (error) setError('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const clearInput = () => {
    setInputValue('');
    setError('');
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Hash className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-blue-900">Entrada Numérica Rápida</h3>
        </div>
        <p className="text-sm text-blue-700 mb-4">
          Digite os números das cartas separados por espaços. Exemplo: 5 3 7 8 6
        </p>
        
        <div className="space-y-3">
          <div className="relative">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              disabled={disabled}
              placeholder={`Digite ${expectedLength} números separados por espaços...`}
              className={`
                w-full px-4 py-3 border-2 rounded-lg font-mono text-lg
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                disabled:bg-gray-100 disabled:cursor-not-allowed
                ${error ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}
              `}
            />
            {inputValue && (
              <button
                onClick={clearInput}
                disabled={disabled}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            )}
          </div>

          {error && (
            <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded px-3 py-2">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {inputValue.trim() ? inputValue.trim().split(/\s+/).length : 0}/{expectedLength} números
            </span>
            
            <button
              onClick={handleSubmit}
              disabled={disabled || !inputValue.trim()}
              className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2"
            >
              <Play className="w-4 h-4" />
              <span>Validar Sequência</span>
            </button>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
        <strong>Dica:</strong> Você pode usar tanto a entrada numérica quanto a seleção visual de cartas. 
        Os números correspondem aos IDs das cartas mostradas na seleção visual.
      </div>
    </div>
  );
};