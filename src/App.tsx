import React, { useState } from 'react';
import { challenges } from './data/challenges';
import { GameState, ValidationResult } from './types';
import { ChallengeCard } from './components/ChallengeCard';
import { CodeInput } from './components/CodeInput';
import { ValidationResult as ValidationResultComponent } from './components/ValidationResult';
import { GameStats } from './components/GameStats';
import { Code, RotateCcw } from 'lucide-react';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentChallenge: 0,
    score: 0,
    attempts: 0,
    completedChallenges: [],
    challengeAttempts: {}
  });

  const [currentSequence, setCurrentSequence] = useState<string[]>([]);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [showResult, setShowResult] = useState(false);

  const currentChallenge = challenges[gameState.currentChallenge];
  const currentChallengeAttempts = gameState.challengeAttempts[currentChallenge.id] || 0;
  const maxAttempts = 3;

  const validateSequence = (sequence: string[]) => {
    if (sequence.length === 0) return;

    const isCorrect = JSON.stringify(sequence) === JSON.stringify(currentChallenge.correctSequence);
    
    const correctPositions: number[] = [];
    const incorrectPositions: number[] = [];
    
    sequence.forEach((code, index) => {
      if (currentChallenge.correctSequence[index] === code) {
        correctPositions.push(index);
      } else {
        incorrectPositions.push(index);
      }
    });

    // Update challenge attempts
    const newChallengeAttempts = currentChallengeAttempts + 1;
    const attemptsLeft = maxAttempts - newChallengeAttempts;

    let message = '';
    let showAnswerOption = false;

    if (isCorrect) {
      message = `Perfeito! Você resolveu o desafio "${currentChallenge.title}" corretamente!`;
    } else if (newChallengeAttempts >= maxAttempts) {
      message = `Código incorreto. Você esgotou suas ${maxAttempts} tentativas para este desafio.`;
      showAnswerOption = true;
    } else {
      message = `Código incorreto. ${incorrectPositions.length} posição(ões) precisam ser corrigidas. Você tem ${attemptsLeft} tentativa(s) restante(s).`;
    }

    const result: ValidationResult = {
      isCorrect,
      message,
      correctPositions,
      incorrectPositions,
      attemptsLeft,
      showAnswerOption
    };

    setValidationResult(result);
    setShowResult(true);
    setCurrentSequence(sequence);

    // Update game state
    const difficultyMultiplier = currentChallenge.difficulty === 'easy' ? 1 : 
                                currentChallenge.difficulty === 'medium' ? 2 : 3;
    
    setGameState(prev => ({
      ...prev,
      attempts: prev.attempts + 1,
      score: isCorrect ? prev.score + (100 * difficultyMultiplier) : prev.score,
      completedChallenges: isCorrect && !prev.completedChallenges.includes(currentChallenge.id) 
        ? [...prev.completedChallenges, currentChallenge.id]
        : prev.completedChallenges,
      challengeAttempts: {
        ...prev.challengeAttempts,
        [currentChallenge.id]: newChallengeAttempts
      }
    }));
  };

  const resetChallenge = () => {
    setCurrentSequence([]);
    setValidationResult(null);
    setShowResult(false);
  };

  const nextChallenge = () => {
    if (gameState.currentChallenge < challenges.length - 1) {
      setGameState(prev => ({
        ...prev,
        currentChallenge: prev.currentChallenge + 1
      }));
      resetChallenge();
    }
  };

  const selectChallenge = (challengeIndex: number) => {
    setGameState(prev => ({
      ...prev,
      currentChallenge: challengeIndex
    }));
    resetChallenge();
  };

  const resetGame = () => {
    setGameState({
      currentChallenge: 0,
      score: 0,
      attempts: 0,
      completedChallenges: [],
      challengeAttempts: {}
    });
    resetChallenge();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Code className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Debuggers - Validação de Códigos
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Valide sequências de códigos de cartas para resolver desafios algorítmicos! 
            Digite os códigos na ordem correta para completar cada desafio.
          </p>
        </header>

        {/* Game Stats */}
        <GameStats gameState={gameState} totalChallenges={challenges.length} />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Challenge List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Desafios</h2>
                <button
                  onClick={resetGame}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Resetar Jogo"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-3">
                {challenges.map((challenge, index) => (
                  <ChallengeCard
                    key={challenge.id}
                    challenge={challenge}
                    isActive={gameState.currentChallenge === index}
                    isCompleted={gameState.completedChallenges.includes(challenge.id)}
                    onClick={() => selectChallenge(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Main Game Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Challenge */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {currentChallenge.title}
                  </h2>
                  <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    Tentativas: {currentChallengeAttempts}/{maxAttempts}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{currentChallenge.description}</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Problema:</h3>
                  <p className="text-blue-800">{currentChallenge.problem}</p>
                </div>
              </div>

              {/* Code Input */}
              <div className="mb-6">
                <CodeInput
                  onSequenceSubmit={validateSequence}
                  expectedLength={currentChallenge.correctSequence.length}
                  disabled={(showResult && validationResult?.isCorrect === true) || currentChallengeAttempts >= maxAttempts}
                />
              </div>

              {/* Validation Result */}
              {showResult && (
                <ValidationResultComponent
                  result={validationResult}
                  onTryAgain={resetChallenge}
                  onNextChallenge={nextChallenge}
                  hasNextChallenge={gameState.currentChallenge < challenges.length - 1}
                  correctSequence={currentChallenge.correctSequence}
                  userSequence={currentSequence}
                  maxAttemptsReached={currentChallengeAttempts >= maxAttempts}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;