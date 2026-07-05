type InteractivePuzzlePromptProps = {
  prompt?: string;
  hint?: string;
  hintUnlocked?: boolean;
  hintVisible?: boolean;
  onShowHint?: () => void;
  readOnly?: boolean;
};

export function InteractivePuzzlePrompt({
  prompt,
  hint,
  hintUnlocked = false,
  hintVisible = false,
  onShowHint,
  readOnly = false,
}: InteractivePuzzlePromptProps) {
  if (!prompt) return null;

  return (
    <div className="space-y-4">
      <h3
        id="puzzle-title"
        className="font-script text-2xl leading-snug text-navy sm:text-3xl md:text-4xl"
      >
        {prompt}
      </h3>

      {hint && hintUnlocked && (
        <div>
          {hintVisible || readOnly ? (
            <p className="text-left text-sm italic text-navy/60">
              Petunjuk: {hint}
            </p>
          ) : (
            <button
              type="button"
              onClick={onShowHint}
              className="text-left text-sm font-medium text-ocean underline-offset-2 hover:text-deep hover:underline"
            >
              Lihat petunjuk
            </button>
          )}
        </div>
      )}
    </div>
  );
}
