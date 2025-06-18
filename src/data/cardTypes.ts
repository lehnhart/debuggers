import { CardType } from '../types';

export const cardTypes: CardType[] = [
  // Data Types
  {
    id: 1,
    name: 'Integer',
    description: 'Número inteiro',
    color: 'text-blue-800',
    bgColor: 'from-blue-400 to-blue-600',
    category: 'data'
  },
  {
    id: 2,
    name: 'Float',
    description: 'Número decimal',
    color: 'text-yellow-800',
    bgColor: 'from-yellow-400 to-yellow-600',
    category: 'data'
  },
  {
    id: 3,
    name: 'Variable',
    description: 'Variável para armazenar dados',
    color: 'text-green-800',
    bgColor: 'from-green-400 to-green-600',
    category: 'data'
  },
  {
    id: 4,
    name: 'String',
    description: 'Texto/cadeia de caracteres',
    color: 'text-pink-800',
    bgColor: 'from-pink-400 to-pink-600',
    category: 'data'
  },
  
  // Input/Output
  {
    id: 5,
    name: 'Input',
    description: 'Entrada de dados',
    color: 'text-purple-800',
    bgColor: 'from-purple-400 to-purple-600',
    category: 'input'
  },
  {
    id: 6,
    name: 'Output',
    description: 'Saída de dados',
    color: 'text-indigo-800',
    bgColor: 'from-indigo-400 to-indigo-600',
    category: 'output'
  },
  
  // Operations
  {
    id: 7,
    name: 'Addition',
    description: 'Operação de soma',
    color: 'text-red-800',
    bgColor: 'from-red-400 to-red-600',
    category: 'operation'
  },
  {
    id: 8,
    name: 'Division',
    description: 'Operação de divisão',
    color: 'text-orange-800',
    bgColor: 'from-orange-400 to-orange-600',
    category: 'operation'
  },
  {
    id: 9,
    name: 'Comparison',
    description: 'Comparação entre valores',
    color: 'text-teal-800',
    bgColor: 'from-teal-400 to-teal-600',
    category: 'operation'
  },
  {
    id: 10,
    name: 'Assignment',
    description: 'Atribuição de valor',
    color: 'text-cyan-800',
    bgColor: 'from-cyan-400 to-cyan-600',
    category: 'operation'
  },
  
  // Control Flow
  {
    id: 11,
    name: 'Loop',
    description: 'Estrutura de repetição',
    color: 'text-violet-800',
    bgColor: 'from-violet-400 to-violet-600',
    category: 'control'
  },
  {
    id: 12,
    name: 'Condition',
    description: 'Estrutura condicional',
    color: 'text-rose-800',
    bgColor: 'from-rose-400 to-rose-600',
    category: 'control'
  },
  {
    id: 13,
    name: 'Initialize',
    description: 'Inicialização de variável',
    color: 'text-emerald-800',
    bgColor: 'from-emerald-400 to-emerald-600',
    category: 'control'
  },
  {
    id: 14,
    name: 'Counter',
    description: 'Contador/incremento',
    color: 'text-amber-800',
    bgColor: 'from-amber-400 to-amber-600',
    category: 'control'
  },
  {
    id: 15,
    name: 'Return',
    description: 'Retorno de valor',
    color: 'text-lime-800',
    bgColor: 'from-lime-400 to-lime-600',
    category: 'control'
  }
];

export const getCardById = (id: number): CardType | undefined => {
  return cardTypes.find(card => card.id === id);
};

export const getCardsByCategory = (category: string): CardType[] => {
  return cardTypes.filter(card => card.category === category);
};