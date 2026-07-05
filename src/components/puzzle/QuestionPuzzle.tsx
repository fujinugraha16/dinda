"use client";

import { useState } from "react";

const inputClassName =
  "touch-target w-full rounded-xl border border-foam/60 bg-white/90 px-4 py-3 text-base text-navy placeholder:text-navy/40 focus:border-turquoise focus:outline-none focus:ring-2 focus:ring-turquoise/20 disabled:opacity-60";

const buttonClassName =
  "touch-target w-full rounded-xl bg-ocean px-4 py-3 text-base font-medium text-white transition-colors hover:bg-deep active:bg-deep disabled:opacity-60";

const answerPlaceholder = "Jawaban dindaa...";
const submitButtonLabel = "Simpan jawaban";
const submittingButtonLabel = "Menyimpan...";

type PuzzleInputProps = {
  savedAnswer: string;
  onAnswerChange: (answer: string) => void;
  onSubmit: (answer: string) => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
  readOnly?: boolean;
  onGameComplete?: () => void;
  prompt?: string;
  hint?: string;
  hintUnlocked?: boolean;
  hintVisible?: boolean;
  onShowHint?: () => void;
};

export function QuestionPuzzle({
  savedAnswer,
  onAnswerChange,
  onSubmit,
  isSubmitting,
  error,
  readOnly = false,
}: PuzzleInputProps) {
  const [answer, setAnswer] = useState(savedAnswer);

  function handleChange(value: string) {
    setAnswer(value);
    onAnswerChange(value);
  }

  if (readOnly) {
    return (
      <div className="space-y-2">
        <p className="text-xs font-medium tracking-wide uppercase text-navy/50">
          Jawaban kamu
        </p>
        <div className="rounded-xl border border-turquoise/40 bg-turquoise/10 px-4 py-3 text-base text-navy">
          {savedAnswer || "—"}
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        if (answer.trim()) await onSubmit(answer);
      }}
      className="space-y-3 sm:space-y-4"
    >
      <input
        name="answer"
        type="text"
        value={answer}
        onChange={(event) => handleChange(event.target.value)}
        autoComplete="off"
        placeholder={answerPlaceholder}
        disabled={isSubmitting}
        className={inputClassName}
      />
      {error && <p className="text-sm text-ocean">{error}</p>}
      <button type="submit" disabled={isSubmitting} className={buttonClassName}>
        {isSubmitting ? submittingButtonLabel : submitButtonLabel}
      </button>
    </form>
  );
}

export {
  inputClassName,
  buttonClassName,
  answerPlaceholder,
  submitButtonLabel,
  submittingButtonLabel,
};
export type { PuzzleInputProps };
