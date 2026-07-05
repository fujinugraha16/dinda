"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  answerPlaceholder,
  buttonClassName,
  inputClassName,
  submitButtonLabel,
  submittingButtonLabel,
  type PuzzleInputProps,
} from "./QuestionPuzzle";
import { InteractivePuzzlePrompt } from "./InteractivePuzzlePrompt";

type ImagePuzzleProps = PuzzleInputProps & {
  imageUrl: string;
  gridSize: number;
};

function createSolvedBoard(size: number): number[] {
  return Array.from({ length: size * size }, (_, index) => index);
}

function countInversions(board: number[], size: number): number {
  const tiles = board.filter((tile) => tile !== size * size - 1);
  let inversions = 0;

  for (let i = 0; i < tiles.length; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
      if (tiles[i] > tiles[j]) inversions++;
    }
  }

  return inversions;
}

function isSolvable(board: number[], size: number): boolean {
  const inversions = countInversions(board, size);
  if (size % 2 === 1) return inversions % 2 === 0;

  const emptyIndex = board.indexOf(size * size - 1);
  const emptyRowFromBottom = size - Math.floor(emptyIndex / size);
  return (inversions + emptyRowFromBottom) % 2 === 1;
}

function shuffleBoard(size: number): number[] {
  const empty = size * size - 1;
  let board = createSolvedBoard(size);

  do {
    for (let i = board.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [board[i], board[j]] = [board[j], board[i]];
    }
  } while (!isSolvable(board, size) || board.every((tile, index) => tile === index));

  return board;
}

function isSolved(board: number[]): boolean {
  return board.every((tile, index) => tile === index);
}

function getTileStyle(tile: number, gridSize: number, imageUrl: string) {
  if (tile === gridSize * gridSize - 1) return undefined;

  const row = Math.floor(tile / gridSize);
  const col = tile % gridSize;
  const step = gridSize > 1 ? 100 / (gridSize - 1) : 0;

  return {
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
    backgroundPosition: `${col * step}% ${row * step}%`,
  };
}

export function ImagePuzzle({
  imageUrl,
  gridSize,
  savedAnswer,
  onAnswerChange,
  onSubmit,
  isSubmitting,
  error,
  readOnly = false,
  onGameComplete,
  prompt,
  hint,
  hintUnlocked,
  hintVisible,
  onShowHint,
}: ImagePuzzleProps) {
  const solvedBoard = useMemo(() => createSolvedBoard(gridSize), [gridSize]);
  const [board, setBoard] = useState(() => shuffleBoard(gridSize));
  const [answer, setAnswer] = useState(savedAnswer);

  const isComplete = isSolved(board);

  useEffect(() => {
    if (isComplete && !readOnly) onGameComplete?.();
  }, [isComplete, readOnly, onGameComplete]);

  function handleAnswerChange(value: string) {
    setAnswer(value);
    onAnswerChange(value);
  }

  const handleTileClick = useCallback(
    (index: number) => {
      if (isComplete) return;

      const emptyIndex = board.indexOf(gridSize * gridSize - 1);
      const row = Math.floor(index / gridSize);
      const col = index % gridSize;
      const emptyRow = Math.floor(emptyIndex / gridSize);
      const emptyCol = emptyIndex % gridSize;

      const isAdjacent =
        (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
        (col === emptyCol && Math.abs(row - emptyRow) === 1);

      if (!isAdjacent) return;

      const nextBoard = [...board];
      [nextBoard[index], nextBoard[emptyIndex]] = [nextBoard[emptyIndex], nextBoard[index]];
      setBoard(nextBoard);
    },
    [board, gridSize, isComplete],
  );

  if (readOnly) {
    return (
      <div className="space-y-4">
        <div
          className="grid gap-1 overflow-hidden rounded-xl border border-turquoise/30"
          style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
        >
          {solvedBoard.map((tile, index) => (
            <div
              key={index}
              className="aspect-square bg-cover bg-no-repeat"
              style={getTileStyle(tile, gridSize, imageUrl)}
            />
          ))}
        </div>
        <InteractivePuzzlePrompt
          prompt={prompt}
          hint={hint}
          hintUnlocked={hintUnlocked}
          hintVisible={hintVisible}
          onShowHint={onShowHint}
          readOnly
        />
        <div className="space-y-2">
          <p className="text-xs font-medium tracking-wide uppercase text-navy/50">
            Jawaban kamu
          </p>
          <div className="rounded-xl border border-turquoise/40 bg-turquoise/10 px-4 py-3 text-base text-navy">
            {savedAnswer || "—"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div
        className="grid gap-1 overflow-hidden rounded-xl border border-turquoise/30"
        style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
      >
        {board.map((tile, index) => {
          const isEmpty = tile === gridSize * gridSize - 1;

          return (
            <motion.button
              key={index}
              type="button"
              onClick={() => handleTileClick(index)}
              whileTap={isEmpty ? undefined : { scale: 0.97 }}
              disabled={isEmpty || isComplete}
              className={`aspect-square bg-cover bg-no-repeat transition-opacity ${
                isEmpty
                  ? "cursor-default bg-ocean/5"
                  : "cursor-pointer hover:opacity-90 active:opacity-80"
              }`}
              style={isEmpty ? undefined : getTileStyle(tile, gridSize, imageUrl)}
              aria-label={isEmpty ? "Empty tile" : `Tile ${tile + 1}`}
            />
          );
        })}
      </div>

      {isComplete && (
        <div className="space-y-4">
          <p className="text-left text-sm text-navy/70">
            Yeayy selamat dinda, sekarang tebak <b>kata</b> yang ada di sekitaran
            halaman itu
          </p>
          <InteractivePuzzlePrompt
            prompt={prompt}
            hint={hint}
            hintUnlocked={hintUnlocked}
            hintVisible={hintVisible}
            onShowHint={onShowHint}
          />
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              if (answer.trim()) await onSubmit(answer);
            }}
            className="space-y-4"
          >
            <input
              type="text"
              value={answer}
              onChange={(event) => handleAnswerChange(event.target.value)}
              autoComplete="off"
              placeholder={answerPlaceholder}
              disabled={isSubmitting}
              className={inputClassName}
            />
            {error && <p className="text-sm text-ocean">{error}</p>}
            <button
              type="submit"
              disabled={isSubmitting || !answer.trim()}
              className={buttonClassName}
            >
              {isSubmitting ? submittingButtonLabel : submitButtonLabel}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
