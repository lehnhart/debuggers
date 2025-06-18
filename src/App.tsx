import React, { useState, useEffect } from 'react';
import { challenges } from './data/challenges';
import { GameState, ValidationResult } from './types';
import { getCardById } from './data/cardTypes';
import { ChallengeCard } from './components/ChallengeCard';
import { CardInput } from './components/CardInput';
import { NumericInput } from './components/NumericInput';
import { InputMethodToggle } from './components/InputMethodToggle';
import { ValidationResult as ValidationResultComponent } from './components/ValidationResult';
import { GameStats } from './components/GameStats';
import { Code, Play, RotateCcw } from 'lucide-react';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentChallenge: 0,
    score: 0,
    attempts: 0,
    completedChallenges: []
  });

  const [currentSequence, setCurrentSequence] = useState<number[]>([]);
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [inputMethod, setInputMethod] = useState<'visual' | 'numeric'>('visual');

  const currentChallenge = challenges[gameState.currentChallenge];

  const validateSequence = (sequence?: number[]) => {
    const sequenceToValidate = sequence || currentSequence;
    
    if (sequenceToValidate.length === 0) return;

    const isCorrect = JSON.stringify(sequenceToValidate) === JSON.stringify(currentChallenge.correctSequence);
    
    const correctPositions: number[] = [];
    const incorrectPositions: number[] = [];
    
    sequenceToValidate.forEach((cardId, index) => {
      if (currentChallenge.correctSequence[index] === cardId) {
        correctPositions.push(index);
      } else {
        incorrectPositions.push(index);
      }
    });

    // Get card types for better messaging
    const expectedCards = currentChallenge.correctSequence.map(id => getCardById(id)).filter(Boolean);
    const actualCards = sequenceToValidate.map(id => getCardById(id)).filter(Boolean);

    const result: ValidationResult = {
      isCorrect,
      message: isCorrect 
        ? `Perfeito! Você resolveu o desafio "${currentChallenge.title}" corretamente!`
        : `Sequência incorreta. ${incorrectPositions.length} carta(s) precisam ser corrigidas.`,
      correctPositions,
      incorrectPositions,
      expectedCards,
      actualCards
    };

    setValidationResult(result);
    setShowResult(true);

    // Update current sequence if it was passed as parameter (from numeric input)
    if (sequence) {
      setCurrentSequence(sequence);
    }

    // Update game state
    const difficultyMultiplier = currentChallenge.difficulty === 'easy' ? 1 : 
                                currentChallenge.difficulty === 'medium' ? 2 : 3;
    
    setGameState(prev => ({
      ...prev,
      attempts: prev.attempts + 1,
      score: isCorrect ? prev.score + (100 * difficultyMultiplier) : prev.score,
      completedChallenges: isCorrect && !prev.completedChallenges.includes(currentChallenge.id) 
        ? [...prev.completedChallenges, currentChallenge.id]
        : prev.completedChallenges
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
      completedChallenges: []
    });
    resetChallenge();
  };

  const handleNumericSubmit = (sequence: number[]) => {
    validateSequence(sequence);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Code className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Algorithm Card Game
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Monte sequências lógicas usando cartas de diferentes tipos para resolver desafios algorítmicos! 
            Cada carta representa um tipo de operação ou dado específico.
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
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentChallenge.title}
                </h2>
                <p className="text-gray-600 mb-4">{currentChallenge.description}</p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Problema:</h3>
                  <p className="text-blue-800">{currentChallenge.problem}</p>
                </div>
              </div>

              {/* Input Method Toggle */}
              <InputMethodToggle
                method={inputMethod}
                onMethodChange={setInputMethod}
                disabled={showResult && validationResult?.isCorrect === true}
              />

              {/* Input Methods */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {inputMethod === 'visual' ? 'Monte a Sequência de Cartas' : 'Digite a Sequência Numérica'}
                </h3>
                
                {inputMethod === 'visual' ? (
                  <CardInput
                    sequence={currentSequence}
                    onSequenceChange={setCurrentSequence}
                    maxCards={currentChallenge.correctSequence.length}
                    disabled={showResult && validationResult?.isCorrect === true}
                  />
                ) : (
                  <NumericInput
                    onSequenceSubmit={handleNumericSubmit}
                    expectedLength={currentChallenge.correctSequence.length}
                    disabled={showResult && validationResult?.isCorrect === true}
                  />
                )}
              </div>

              {/* Validate Button (only for visual method) */}
              {inputMethod === 'visual' && 
               currentSequence.length === currentChallenge.correctSequence.length && 
               !showResult && (
                <div className="text-center mb-6">
                  <button
                    onClick={() => validateSequence()}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2 mx-auto"
                  >
                    <Play className="w-5 h-5" />
                    <span>Validar Sequência</span>
                  </button>
                </div>
              )}

              {/* Validation Result */}
              {showResult && (
                <ValidationResultComponent
                  result={validationResult}
                  explanation={currentChallenge.explanation}
                  onTryAgain={resetChallenge}
                  onNextChallenge={nextChallenge}
                  hasNextChallenge={gameState.currentChallenge < challenges.length - 1}
                  correctSequence={currentChallenge.correctSequence}
                  userSequence={currentSequence}
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