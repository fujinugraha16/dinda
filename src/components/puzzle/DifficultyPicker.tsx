"use client";

import type { Difficulty } from "@/content/puzzles";

type DifficultyPickerProps = {
  onSelect: (difficulty: Difficulty) => void;
};

const cardClassName =
  "coastal-card touch-target flex items-center justify-center rounded-xl border px-5 py-8 text-center transition-all active:scale-[0.98] sm:px-6 sm:py-10 sm:hover:border-turquoise/60 sm:hover:bg-white/90 sm:hover:shadow-md";

export function DifficultyPicker({ onSelect }: DifficultyPickerProps) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <h2 className="font-script text-2xl font-semibold text-navy sm:text-3xl md:text-4xl">
        Pilih tingkat kesulitan
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <button
          type="button"
          onClick={() => onSelect("easy")}
          className={cardClassName}
        >
          <span className="font-script text-3xl font-bold text-ocean sm:text-4xl md:text-5xl">
            Gampang 🐥
          </span>
        </button>
        <button
          type="button"
          onClick={() => onSelect("hard")}
          className={cardClassName}
        >
          <span className="font-script text-3xl font-bold text-deep sm:text-4xl md:text-5xl">
            Sulit 🔥
          </span>
        </button>
      </div>
    </div>
  );
}
