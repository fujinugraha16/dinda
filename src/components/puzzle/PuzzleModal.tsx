"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Difficulty, PuzzleDefinition } from "@/content/puzzles";
import { PuzzleModalContent } from "./PuzzleModalContent";

type PuzzleModalProps = {
  puzzle: PuzzleDefinition | null;
  difficulty: Difficulty | null;
  savedAnswer: string;
  onAnswerChange: (answer: string) => void;
  onClose: () => void;
  onSubmit: (answer: string) => Promise<boolean>;
  readOnly?: boolean;
};

export function PuzzleModal({
  puzzle,
  difficulty,
  savedAnswer,
  onAnswerChange,
  onClose,
  onSubmit,
  readOnly = false,
}: PuzzleModalProps) {
  useEffect(() => {
    if (!puzzle) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [puzzle, onClose]);

  return (
    <AnimatePresence>
      {puzzle && difficulty && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close puzzle"
            className="absolute inset-0 bg-navy/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="puzzle-title"
            className="relative z-10 max-h-[92dvh] w-full overflow-y-auto rounded-t-3xl border border-foam/60 border-b-0 bg-sky p-5 text-left shadow-xl shadow-ocean/10 sm:max-w-md sm:rounded-2xl sm:border-b sm:p-8"
            style={{
              paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))",
            }}
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="mx-auto mb-4 h-1 w-10 rounded-full bg-foam/80 sm:hidden"
              aria-hidden
            />
            <PuzzleModalContent
              key={puzzle.id}
              puzzle={puzzle}
              difficulty={difficulty}
              savedAnswer={savedAnswer}
              onAnswerChange={onAnswerChange}
              onClose={onClose}
              onSubmit={onSubmit}
              readOnly={readOnly}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
