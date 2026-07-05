"use client";

import type { Difficulty, PuzzleDefinition } from "@/content/puzzles";
import { getPuzzlesForDifficulty } from "@/content/puzzles";
import { PuzzleTile } from "./PuzzleTile";

type PuzzleGridProps = {
  difficulty: Difficulty;
  solvedIds: number[];
  onSelectPuzzle: (puzzle: PuzzleDefinition) => void;
};

export function PuzzleGrid({ difficulty, solvedIds, onSelectPuzzle }: PuzzleGridProps) {
  const puzzleList = getPuzzlesForDifficulty(difficulty);

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3">
      {puzzleList.map((puzzle) => (
        <PuzzleTile
          key={puzzle.id}
          number={puzzle.id}
          isSolved={solvedIds.includes(puzzle.id)}
          onClick={() => onSelectPuzzle(puzzle)}
        />
      ))}
    </div>
  );
}
