import type { Difficulty } from "@/content/puzzles";

const answersKey = (difficulty: Difficulty) => `dinda-puzzle-answers-${difficulty}`;

export function getSavedAnswers(difficulty: Difficulty): Record<number, string> {
  if (typeof window === "undefined") return {};

  try {
    const raw = localStorage.getItem(answersKey(difficulty));
    if (!raw) return {};

    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return {};

    const result: Record<number, string> = {};
    for (const [key, value] of Object.entries(parsed)) {
      const puzzleId = Number(key);
      if (!Number.isNaN(puzzleId) && typeof value === "string") {
        result[puzzleId] = value;
      }
    }
    return result;
  } catch {
    return {};
  }
}

export function getSavedAnswer(difficulty: Difficulty, puzzleId: number): string {
  return getSavedAnswers(difficulty)[puzzleId] ?? "";
}

export function savePuzzleAnswer(
  difficulty: Difficulty,
  puzzleId: number,
  answer: string,
): void {
  if (typeof window === "undefined") return;

  const answers = getSavedAnswers(difficulty);

  if (!answer.trim()) {
    delete answers[puzzleId];
  } else {
    answers[puzzleId] = answer;
  }

  localStorage.setItem(answersKey(difficulty), JSON.stringify(answers));
}
