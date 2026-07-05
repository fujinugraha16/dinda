"use client";

import { useState } from "react";
import {
  answerPlaceholder,
  buttonClassName,
  inputClassName,
  submitButtonLabel,
  submittingButtonLabel,
  type PuzzleInputProps,
} from "./QuestionPuzzle";

type CipherPuzzleProps = PuzzleInputProps & {
  cipherText: string;
  shift: number;
};

export function CipherPuzzle({
  cipherText,
  shift,
  savedAnswer,
  onAnswerChange,
  onSubmit,
  isSubmitting,
  error,
  readOnly = false,
}: CipherPuzzleProps) {
  const [answer, setAnswer] = useState(savedAnswer);

  function handleChange(value: string) {
    setAnswer(value);
    onAnswerChange(value);
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-turquoise/30 bg-white/70 px-4 py-6 text-left">
        <p className="mb-2 text-xs tracking-widest uppercase text-navy/50">
          Encrypted message
        </p>
        <p className="font-script text-3xl tracking-[0.3em] text-navy">{cipherText}</p>
        <p className="mt-3 text-sm text-navy/60">Shift each letter back by {shift}</p>
      </div>
      {readOnly ? (
        <div className="space-y-2">
          <p className="text-xs font-medium tracking-wide uppercase text-navy/50">
            Jawaban kamu
          </p>
          <div className="rounded-xl border border-turquoise/40 bg-turquoise/10 px-4 py-3 text-base text-navy">
            {savedAnswer || "—"}
          </div>
        </div>
      ) : (
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
          onChange={(event) => handleChange(event.target.value)}
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
      )}
    </div>
  );
}
