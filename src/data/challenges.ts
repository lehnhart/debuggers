import { Challenge } from '../types';

export const challenges: Challenge[] = [
  {
    id: 1,
    title: "Média de 3 Números",
    description: "Calcule a média aritmética de três números",
    problem: "Você precisa ler três números, somá-los e dividir por 3",
    correctSequence: [5, 3, 5, 3, 5, 3, 7, 8, 6], // Input, Variable, Input, Variable, Input, Variable, Addition, Division, Output
    explanation: "1. Entrada de dados → 2. Armazenar em variável → 3. Entrada de dados → 4. Armazenar em variável → 5. Entrada de dados → 6. Armazenar em variável → 7. Somar os três valores → 8. Dividir por 3 → 9. Exibir resultado",
    difficulty: 'easy',
    category: 'Matemática Básica'
  },
  {
    id: 2,
    title: "Encontrar o Maior",
    description: "Encontre o maior número entre três valores",
    problem: "Compare três números e identifique o maior",
    correctSequence: [5, 3, 5, 3, 5, 3, 9, 9, 6], // Input, Variable, Input, Variable, Input, Variable, Comparison, Comparison, Output
    explanation: "1. Entrada do primeiro número → 2. Armazenar em variável → 3. Entrada do segundo número → 4. Armazenar em variável → 5. Entrada do terceiro número → 6. Armazenar em variável → 7. Comparar primeiro com segundo → 8. Comparar resultado com terceiro → 9. Exibir o maior",
    difficulty: 'easy',
    category: 'Lógica de Comparação'
  },
  {
    id: 3,
    title: "Ordenação Simples",
    description: "Ordene três números em ordem crescente",
    problem: "Organize os números do menor para o maior",
    correctSequence: [5, 3, 5, 3, 5, 3, 9, 12, 10, 6], // Input, Variable, Input, Variable, Input, Variable, Comparison, Condition, Assignment, Output
    explanation: "1. Entrada dos números → 2-4. Armazenar em variáveis → 5. Comparar valores → 6. Estrutura condicional para troca → 7. Atribuir nova ordem → 8. Exibir resultado ordenado",
    difficulty: 'medium',
    category: 'Algoritmos de Ordenação'
  },
  {
    id: 4,
    title: "Busca Linear",
    description: "Encontre um elemento específico em uma lista",
    problem: "Procure um número em uma sequência de valores",
    correctSequence: [13, 3, 5, 3, 11, 9, 12, 14, 6], // Initialize, Variable, Input, Variable, Loop, Comparison, Condition, Counter, Output
    explanation: "1. Inicializar contador → 2. Criar variável para elemento procurado → 3. Entrada do valor → 4. Armazenar valor → 5. Loop para percorrer lista → 6. Comparar elemento atual → 7. Condição se encontrou → 8. Incrementar contador → 9. Exibir resultado",
    difficulty: 'medium',
    category: 'Algoritmos de Busca'
  },
  {
    id: 5,
    title: "Fibonacci",
    description: "Calcule a sequência de Fibonacci até o N-ésimo termo",
    problem: "Gere os primeiros N números da sequência de Fibonacci",
    correctSequence: [13, 3, 13, 3, 5, 3, 11, 7, 10, 10, 14, 6], // Initialize, Variable, Initialize, Variable, Input, Variable, Loop, Addition, Assignment, Assignment, Counter, Output
    explanation: "1. Inicializar primeiro termo → 2. Variável para primeiro → 3. Inicializar segundo termo → 4. Variável para segundo → 5. Entrada da quantidade → 6. Armazenar quantidade → 7. Loop para calcular → 8. Somar termos anteriores → 9-10. Atualizar variáveis → 11. Incrementar contador → 12. Exibir resultado",
    difficulty: 'hard',
    category: 'Sequências Matemáticas'
  }
];