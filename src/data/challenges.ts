import { Challenge } from '../types';

export const challenges: Challenge[] = [
  {
    id: 1,
    title: "Diga Olá",
    description: "Primeiro desafio de validação de código",
    problem: "Digite a sequência correta de códigos para este desafio",
    correctSequence: ["A1", "4", "A1", "7", "6", "5", "B1", "A1"],
    explanation: "Sequência correta para o desafio 'Diga Olá'",
    difficulty: 'easy',
    category: 'Básico'
  },
  {
    id: 2,
    title: "Média Simples",
    description: "Segundo desafio de validação de código",
    problem: "Digite a sequência correta de códigos para este desafio",
    correctSequence: ["A1", "2", "A2", "2", "A1", "7", "6", "A2", "7", "6", "A3", "2", "A3", "7", "A1", "8", "A2", "11", "B1", "5", "A3"],
    explanation: "Sequência correta para o desafio 'Média Simples'",
    difficulty: 'medium',
    category: 'Matemática'
  },
  {
    id: 3,
    title: "Contagem Regressiva",
    description: "Terceiro desafio de validação de código",
    problem: "Digite a sequência correta de códigos para este desafio",
    correctSequence: ["A1", "2", "A1", "7", "B1", "13", "C1", "5", "A1", "A1", "7", "A1", "9", "B2"],
    explanation: "Sequência correta para o desafio 'Contagem Regressiva'",
    difficulty: 'medium',
    category: 'Controle'
  },
  {
    id: 4,
    title: "Correção de Provas",
    description: "Quarto desafio de validação de código",
    problem: "Digite a sequência correta de códigos para este desafio",
    correctSequence: ["A1", "2", "12", "B1", "A1", "7", "F1", "14", "C1", "5", "B2", "16", "5", "B3"],
    explanation: "Sequência correta para o desafio 'Correção de Provas'",
    difficulty: 'hard',
    category: 'Avançado'
  }
];