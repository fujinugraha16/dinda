"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import type { Difficulty, PuzzleDefinition } from "@/content/puzzles";
import { getDifficultyTitle, getPuzzleCount } from "@/content/puzzles";
import { getSavedAnswer, savePuzzleAnswer } from "@/lib/puzzle-answers";
import { verifyPuzzleAnswer } from "@/lib/puzzle-api";
import {
  clearDifficulty,
  getPuzzleProgressServerSnapshot,
  getPuzzleProgressSnapshot,
  markPuzzleSolved,
  saveDifficulty,
  subscribePuzzleProgress,
} from "@/lib/puzzle-progress";
import { FadeIn } from "@/components/FadeIn";
import { DifficultyPicker } from "./DifficultyPicker";
import { PuzzleGrid } from "./PuzzleGrid";
import { PuzzleModal } from "./PuzzleModal";
import { EasterEggReveal } from "./EasterEggReveal";

export function PuzzleSection() {
  const { difficulty, solvedIds } = useSyncExternalStore(
    subscribePuzzleProgress,
    getPuzzleProgressSnapshot,
    getPuzzleProgressServerSnapshot,
  );
  const [activePuzzle, setActivePuzzle] = useState<PuzzleDefinition | null>(null);

  const handleSelectDifficulty = useCallback((selected: Difficulty) => {
    saveDifficulty(selected);
    setActivePuzzle(null);
  }, []);

  const handleAnswerChange = useCallback(
    (answer: string) => {
      if (!difficulty || !activePuzzle) return;
      savePuzzleAnswer(difficulty, activePuzzle.id, answer);
    },
    [difficulty, activePuzzle],
  );

  const handleSubmitAnswer = useCallback(
    async (answer: string): Promise<boolean> => {
      if (!difficulty || !activePuzzle) return false;

      savePuzzleAnswer(difficulty, activePuzzle.id, answer);

      if (solvedIds.includes(activePuzzle.id)) return true;

      const correct = await verifyPuzzleAnswer(difficulty, activePuzzle.id, answer);

      if (correct) {
        markPuzzleSolved(difficulty, activePuzzle.id);
      }

      return correct;
    },
    [difficulty, activePuzzle, solvedIds],
  );

  const totalPuzzles = difficulty ? getPuzzleCount(difficulty) : 0;
  const isComplete = difficulty !== null && solvedIds.length === totalPuzzles;
  const progressPercent = totalPuzzles > 0 ? Math.round((solvedIds.length / totalPuzzles) * 100) : 0;
  const savedAnswer =
    difficulty && activePuzzle ? getSavedAnswer(difficulty, activePuzzle.id) : "";
  const isActivePuzzleSolved =
    difficulty && activePuzzle ? solvedIds.includes(activePuzzle.id) : false;

  const difficultyTitleClassName =
    difficulty === "easy"
      ? "font-script text-4xl font-bold text-ocean sm:text-5xl md:text-6xl"
      : "font-script text-4xl font-bold text-deep sm:text-5xl md:text-6xl";

  return (
    <FadeIn delay={0.2}>
      <section className="text-center">
        {!difficulty && <DifficultyPicker onSelect={handleSelectDifficulty} />}

        {difficulty && (
          <div className="mb-6 sm:mb-8">
            <h1 className={difficultyTitleClassName}>
              {getDifficultyTitle(difficulty)}
            </h1>
            {!isComplete && (
              <>
                <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-navy/70 sm:mt-5 sm:text-base">
                  Tenang aja jawabannya akan tersimpan kok, meskipun dinda keluar dari
                  website nya
                </p>
                <p className="mt-4 text-lg font-bold text-navy sm:mt-5 sm:text-xl">
                  {solvedIds.length}/{totalPuzzles} Terpecahkan ✅
                </p>
                <button
                  type="button"
                  onClick={() => {
                    clearDifficulty();
                    setActivePuzzle(null);
                  }}
                  className="btn-ocean touch-target mt-4 rounded-xl px-5 py-3 text-sm font-medium sm:mt-5 sm:px-6 sm:text-base"
                >
                  Ganti tingkat kesulitan
                </button>
              </>
            )}
          </div>
        )}

        {difficulty && !isComplete && (
          <div className="space-y-4 text-left sm:space-y-6">
            <div className="h-1.5 overflow-hidden rounded-full bg-foam/50">
              <div
                className="h-full rounded-full bg-turquoise transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <PuzzleGrid
              difficulty={difficulty}
              solvedIds={solvedIds}
              onSelectPuzzle={setActivePuzzle}
            />
          </div>
        )}

        {difficulty && isComplete && (
          <EasterEggReveal difficulty={difficulty} solvedIds={solvedIds} />
        )}

        <PuzzleModal
          puzzle={activePuzzle}
          difficulty={difficulty}
          savedAnswer={savedAnswer}
          onAnswerChange={handleAnswerChange}
          onClose={() => setActivePuzzle(null)}
          onSubmit={handleSubmitAnswer}
          readOnly={isActivePuzzleSolved}
        />
      </section>
    </FadeIn>
  );
}
