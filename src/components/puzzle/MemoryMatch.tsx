"use client";

import { useEffect, useMemo, useState } from "react";
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

type MemoryMatchProps = PuzzleInputProps & {
  pairs: string[];
};

type Card = {
  id: number;
  emoji: string;
  pairId: number;
};

function shuffleCards(pairs: string[]): Card[] {
  const cards: Card[] = pairs.flatMap((emoji, pairId) => [
    { id: pairId * 2, emoji, pairId },
    { id: pairId * 2 + 1, emoji, pairId },
  ]);

  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
}

export function MemoryMatch({
  pairs,
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
}: MemoryMatchProps) {
  const cards = useMemo(() => shuffleCards(pairs), [pairs]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [answer, setAnswer] = useState(savedAnswer);
  const [isLocked, setIsLocked] = useState(false);

  const isComplete = matched.length === pairs.length;

  useEffect(() => {
    if (isComplete && !readOnly) onGameComplete?.();
  }, [isComplete, readOnly, onGameComplete]);

  function handleAnswerChange(value: string) {
    setAnswer(value);
    onAnswerChange(value);
  }

  if (readOnly) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex aspect-square items-center justify-center rounded-xl border-2 border-turquoise/50 bg-white/95 text-2xl"
            >
              {card.emoji}
            </div>
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

  function handleCardClick(card: Card) {
    if (isLocked || isComplete) return;
    if (flipped.includes(card.id) || matched.includes(card.pairId)) return;

    const nextFlipped = [...flipped, card.id];
    setFlipped(nextFlipped);

    if (nextFlipped.length === 2) {
      setIsLocked(true);
      const [firstId, secondId] = nextFlipped;
      const first = cards.find((c) => c.id === firstId);
      const second = cards.find((c) => c.id === secondId);

      if (first && second && first.pairId === second.pairId) {
        setMatched((prev) => [...prev, first.pairId]);
        setFlipped([]);
        setIsLocked(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setIsLocked(false);
        }, 800);
      }
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {cards.map((card) => {
          const isFlipped = flipped.includes(card.id) || matched.includes(card.pairId);

          return (
            <motion.button
              key={card.id}
              type="button"
              onClick={() => handleCardClick(card)}
              whileTap={{ scale: 0.95 }}
              disabled={isComplete}
              className={`flex aspect-square items-center justify-center rounded-xl border-2 text-2xl transition-colors ${
                isFlipped
                  ? "border-turquoise/50 bg-white/95"
                  : "border-foam/60 bg-ocean/10 hover:border-turquoise/40"
              }`}
            >
              {isFlipped ? card.emoji : "?"}
            </motion.button>
          );
        })}
      </div>

      {isComplete && (
        <div className="space-y-4">
          <p className="text-left text-sm text-navy/70">
            Yeayy dinda berhasil ✨
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
