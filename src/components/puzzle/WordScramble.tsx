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

type WordScrambleProps = PuzzleInputProps & {
  scrambledWord: string;
};

export function WordScramble({
  scrambledWord,
  savedAnswer,
  onAnswerChange,
  onSubmit,
  isSubmitting,
  error,
  readOnly = false,
}: WordScrambleProps) {
  const [answer, setAnswer] = useState(savedAnswer);

  function handleChange(value: string) {
    setAnswer(value);
    onAnswerChange(value);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-start gap-2">
        {scrambledWord.split("").map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            className="flex h-12 w-10 items-center justify-center rounded-lg border border-turquoise/40 bg-white/90 font-script text-xl text-navy"
          >
            {letter}
          </span>
        ))}
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
