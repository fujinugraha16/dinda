"use client";

import { motion } from "framer-motion";

type PuzzleTileProps = {
  number: number;
  isSolved: boolean;
  onClick: () => void;
};

export function PuzzleTile({ number, isSolved, onClick }: PuzzleTileProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`relative flex aspect-square items-center justify-center rounded-xl border-2 text-lg font-medium transition-colors duration-300 ${
        isSolved
          ? "border-turquoise bg-turquoise/20 text-ocean shadow-sm shadow-turquoise/20"
          : "coastal-card border-foam/60 text-navy hover:border-turquoise/60 hover:bg-white/90"
      }`}
    >
      {isSolved ? (
        <span className="text-2xl text-ocean" aria-label={`Puzzle ${number} solved`}>
          ⚓
        </span>
      ) : (
        <span className="font-script text-xl text-ocean">{number}</span>
      )}
    </motion.button>
  );
}
