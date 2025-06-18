import React, { useState } from 'react';
import { CardType } from '../types';
import { cardTypes, getCardsByCategory } from '../data/cardTypes';
import { Search, Filter } from 'lucide-react';

interface CardTypeSelectorProps {
  onCardSelect: (cardType: CardType) => void;
  disabled?: boolean;
}

export const CardTypeSelector: React.FC<CardTypeSelectorProps> = ({
  onCardSelect,
  disabled = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { value: 'all', label: 'Todas as Cartas' },
    { value: 'data', label: 'Tipos de Dados' },
    { value: 'input', label: 'Entrada' },
    { value: 'output', label: 'Saída' },
    { value: 'operation', label: 'Operações' },
    { value: 'control', label: 'Controle de Fluxo' }
  ];

  const filteredCards = cardTypes.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || card.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar cartas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={disabled}
            className="w-full pl-10 pr-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors disabled:bg-gray-100"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            disabled={disabled}
            className="pl-10 pr-8 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors disabled:bg-gray-100 appearance-none bg-white"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
        {filteredCards.map(card => (
          <button
            key={card.id}
            onClick={() => onCardSelect(card)}
            disabled={disabled}
            className={`
              p-4 rounded-lg text-left transition-all duration-200 transform hover:scale-105 hover:shadow-lg
              bg-gradient-to-br ${card.bgColor} text-white
              disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            `}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-bold">#{card.id}</span>
              <div className="w-3 h-3 bg-white bg-opacity-30 rounded-full"></div>
            </div>
            <h3 className="font-semibold text-sm mb-1">{card.name}</h3>
            <p className="text-xs opacity-90">{card.description}</p>
          </button>
        ))}
      </div>

      {filteredCards.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Nenhuma carta encontrada</p>
        </div>
      )}
    </div>
  );
};