import React, { useState } from 'react';
import { CardType } from '../types';
import { getCardById } from '../data/cardTypes';
import { CardTypeSelector } from './CardTypeSelector';
import { Plus, X, Shuffle, Grid } from 'lucide-react';

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
  const [showSelector, setShowSelector] = useState(false);

  const addCard = (cardType: CardType) => {
    if (sequence.length < maxCards) {
      onSequenceChange([...sequence, cardType.id]);
      setShowSelector(false);
    }
  };

  const removeCard = (index: number) => {
    onSequenceChange(sequence.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    onSequenceChange([]);
  };

  const getCardTypeById = (id: number) => getCardById(id);

  return (
    <div className="space-y-6">
      {/* Add Card Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowSelector(!showSelector)}
          disabled={disabled || sequence.length >= maxCards}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Adicionar Carta</span>
        </button>

        {sequence.length > 0 && (
          <div className="flex items-center space-x-4">
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
      </div>

      {/* Card Type Selector */}
      {showSelector && (
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <Grid className="w-5 h-5" />
              <span>Selecionar Tipo de Carta</span>
            </h3>
            <button
              onClick={() => setShowSelector(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <CardTypeSelector onCardSelect={addCard} disabled={disabled} />
        </div>
      )}

      {/* Current Sequence */}
      {sequence.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Sequência Atual</h3>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {sequence.map((cardId, index) => {
              const cardType = getCardTypeById(cardId);
              if (!cardType) return null;

              return (
                <div
                  key={`${cardId}-${index}`}
                  className={`
                    relative bg-gradient-to-br ${cardType.bgColor} text-white p-4 rounded-lg shadow-md 
                    hover:shadow-lg transition-all duration-200 transform hover:scale-105
                  `}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold">#{cardType.id}</span>
                    <button
                      onClick={() => removeCard(index)}
                      disabled={disabled}
                      className="text-white hover:text-red-200 disabled:text-gray-300 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{cardType.name}</h4>
                  <p className="text-xs opacity-90 mb-2">{cardType.description}</p>
                  <div className="text-xs bg-white bg-opacity-20 rounded px-2 py-1 inline-block">
                    Posição {index + 1}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {sequence.length === 0 && (
        <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-300 rounded-xl">
          <Grid className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg font-medium mb-2">Nenhuma carta selecionada</p>
          <p className="text-sm">Clique em "Adicionar Carta" para começar a montar sua sequência</p>
        </div>
      )}
    </div>
  );
};