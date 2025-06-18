import { Challenge } from '../types';

export const challenges: Challenge[] = [
  {
    id: 1,
    title: "Média de 3 Números",
    description: "Calcule a média aritmética de três números",
    problem: "Você precisa calcular (a + b + c) / 3",
    correctSequence: [1, 2, 3, 4, 5],
    explanation: "1. Ler primeiro número → 2. Ler segundo número → 3. Ler terceiro número → 4. Somar os três números → 5. Dividir por 3",
    difficulty: 'easy',
    category: 'Matemática Básica'
  },
  {
    id: 2,
    title: "Encontrar o Maior",
    description: "Encontre o maior número entre três valores",
    problem: "Compare três números e identifique o maior",
    correctSequence: [1, 2, 3, 6, 7, 8],
    explanation: "1. Ler primeiro número → 2. Ler segundo número → 3. Ler terceiro número → 6. Comparar primeiro com segundo → 7. Comparar resultado com terceiro → 8. Exibir maior",
    difficulty: 'easy',
    category: 'Lógica de Comparação'
  },
  {
    id: 3,
    title: "Ordenação Simples",
    description: "Ordene três números em ordem crescente",
    problem: "Organize os números do menor para o maior",
    correctSequence: [1, 2, 3, 9, 10, 11, 12],
    explanation: "1. Ler primeiro → 2. Ler segundo → 3. Ler terceiro → 9. Comparar e trocar se necessário → 10. Comparar segundo par → 11. Comparar terceiro par → 12. Exibir ordenado",
    difficulty: 'medium',
    category: 'Algoritmos de Ordenação'
  },
  {
    id: 4,
    title: "Busca Linear",
    description: "Encontre um elemento específico em uma lista",
    problem: "Procure um número em uma sequência de valores",
    correctSequence: [13, 14, 15, 16, 17, 18],
    explanation: "13. Inicializar índice → 14. Definir valor procurado → 15. Percorrer lista → 16. Comparar elemento atual → 17. Se encontrou, retornar posição → 18. Se não encontrou, continuar",
    difficulty: 'medium',
    category: 'Algoritmos de Busca'
  },
  {
    id: 5,
    title: "Fibonacci",
    description: "Calcule a sequência de Fibonacci até o N-ésimo termo",
    problem: "Gere os primeiros N números da sequência de Fibonacci",
    correctSequence: [19, 20, 21, 22, 23, 24, 25],
    explanation: "19. Inicializar primeiros dois termos → 20. Definir quantidade de termos → 21. Loop para calcular próximos → 22. Somar dois anteriores → 23. Atualizar variáveis → 24. Incrementar contador → 25. Exibir resultado",
    difficulty: 'hard',
    category: 'Sequências Matemáticas'
  }
];