import React, { useState, useRef, useEffect } from 'react';
import { Plus, X, Shuffle } from 'lucide-react';

interface CardInputProps {
  sequence: number[];
  onSequenceChange: (sequence: number[]) => void;
  maxCards: number;
  disabled?: boolean;
}

export const CardInput: React.FC<CardInputProps> = ({
  sequence,
  onSequenceChange,
  maxCards,
  disabled = false
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current && !disabled) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const addCard = () => {
    const num = parseInt(inputValue);
    if (num && !sequence.includes(num) && sequence.length < maxCards) {
      onSequenceChange([...sequence, num]);
      setInputValue('');
    }
  };

  const removeCard = (index: number) => {
    onSequenceChange(sequence.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    onSequenceChange([]);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addCard();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite o número da carta..."
            disabled={disabled || sequence.length >= maxCards}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
        </div>
        <button
          onClick={addCard}
          disabled={disabled || !inputValue || sequence.length >= maxCards}
          className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Adicionar</span>
        </button>
      </div>

      {sequence.length > 0 && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            {sequence.length}/{maxCards} cartas
          </span>
          <button
            onClick={clearAll}
            disabled={disabled}
            className="text-red-600 hover:text-red-800 disabled:text-gray-400 transition-colors flex items-center space-x-1"
          >
            <Shuffle className="w-4 h-4" />
            <span>Limpar tudo</span>
          </button>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {sequence.map((card, index) => (
          <div
            key={index}
            className="relative bg-gradient-to-br from-purple-500 to-blue-600 text-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">#{card}</span>
              <button
                onClick={() => removeCard(index)}
                disabled={disabled}
                className="text-white hover:text-red-200 disabled:text-gray-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="text-xs text-blue-100 mt-1">
              Posição {index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};