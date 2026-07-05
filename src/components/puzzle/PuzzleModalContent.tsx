"use client";

import { useEffect, useState } from "react";
import type { Difficulty, PuzzleDefinition } from "@/content/puzzles";
import { getHintFailureThreshold, isInteractivePuzzleType } from "@/content/puzzles";
import { CatchHearts } from "./CatchHearts";
import { CipherPuzzle } from "./CipherPuzzle";
import { ImagePuzzle } from "./ImagePuzzle";
import { MemoryMatch } from "./MemoryMatch";
import { QuestionPuzzle } from "./QuestionPuzzle";
import { WordScramble } from "./WordScramble";

type PuzzleModalContentProps = {
  puzzle: PuzzleDefinition;
  difficulty: Difficulty;
  savedAnswer: string;
  onAnswerChange: (answer: string) => void;
  onClose: () => void;
  onSubmit: (answer: string) => Promise<boolean>;
  readOnly?: boolean;
};

export function PuzzleModalContent({
  puzzle,
  difficulty,
  savedAnswer,
  onAnswerChange,
  onClose,
  onSubmit,
  readOnly = false,
}: PuzzleModalContentProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hintVisible, setHintVisible] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const isInteractiveGame = isInteractivePuzzleType(puzzle.type);
  const showPrompt = readOnly || !isInteractiveGame || gameComplete;
  const showPromptInHeader = showPrompt && !isInteractiveGame;
  const hintThreshold = getHintFailureThreshold(difficulty);
  const hintUnlocked = showPrompt && (readOnly || failedAttempts >= hintThreshold);

  const interactiveExtras = isInteractiveGame
    ? {
        prompt: showPrompt ? puzzle.prompt : undefined,
        hint: puzzle.hint,
        hintUnlocked,
        hintVisible,
        onShowHint: () => setHintVisible(true),
      }
    : {};

  useEffect(() => {
    setFailedAttempts(0);
    setHintVisible(false);
    setError(null);
    setGameComplete(false);
  }, [puzzle.id]);

  async function handleSubmit(answer: string) {
    setIsSubmitting(true);
    setError(null);
    onAnswerChange(answer);
    const correct = await onSubmit(answer);
    setIsSubmitting(false);

    if (correct) {
      onClose();
    } else {
      setFailedAttempts((attempts) => attempts + 1);
      setError("Not quite — try again!");
    }
  }

  const puzzleInputProps = {
    savedAnswer,
    onAnswerChange,
    onSubmit: handleSubmit,
    isSubmitting,
    error,
    readOnly,
    onGameComplete: () => setGameComplete(true),
    ...interactiveExtras,
  };

  return (
    <div className="text-left">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="mb-2 text-xs font-medium tracking-widest uppercase text-ocean">
            Puzzle {puzzle.id}
            {readOnly && " · Terpecahkan ✅"}
          </p>
          {showPromptInHeader && (
            <h3
              id="puzzle-title"
              className="font-script text-2xl leading-snug text-navy sm:text-3xl md:text-4xl"
            >
              {puzzle.prompt}
            </h3>
          )}
          {isInteractiveGame && !showPrompt && (
            <h3 id="puzzle-title" className="sr-only">
              Puzzle {puzzle.id}
            </h3>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-lg p-1 text-navy/50 transition-colors hover:bg-foam/40 hover:text-navy"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {!isInteractiveGame && puzzle.hint && hintUnlocked && (
        <div className="mb-4">
          {hintVisible || readOnly ? (
            <p className="text-left text-sm italic text-navy/60">
              Petunjuk: {puzzle.hint}
            </p>
          ) : (
            <button
              type="button"
              onClick={() => setHintVisible(true)}
              className="text-left text-sm font-medium text-ocean underline-offset-2 hover:text-deep hover:underline"
            >
              Lihat petunjuk
            </button>
          )}
        </div>
      )}

      {puzzle.type === "question" && <QuestionPuzzle {...puzzleInputProps} />}
      {puzzle.type === "word-scramble" && (
        <WordScramble scrambledWord={puzzle.scrambledWord} {...puzzleInputProps} />
      )}
      {puzzle.type === "memory-match" && (
        <MemoryMatch pairs={puzzle.memoryPairs} {...puzzleInputProps} />
      )}
      {puzzle.type === "cipher" && (
        <CipherPuzzle
          cipherText={puzzle.cipherText}
          shift={puzzle.cipherShift}
          {...puzzleInputProps}
        />
      )}
      {puzzle.type === "image-puzzle" && (
        <ImagePuzzle
          imageUrl={puzzle.imageUrl}
          gridSize={puzzle.gridSize}
          {...puzzleInputProps}
        />
      )}
      {puzzle.type === "mini-games" && (
        <CatchHearts targetCatch={puzzle.targetCatch} {...puzzleInputProps} />
      )}
    </div>
  );
}
