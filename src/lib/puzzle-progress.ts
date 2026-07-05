import type { Difficulty } from "@/content/puzzles";

const DIFFICULTY_KEY = "dinda-puzzle-difficulty";
const progressKey = (difficulty: Difficulty) => `dinda-puzzle-progress-${difficulty}`;

type PuzzleProgressSnapshot = {
  difficulty: Difficulty | null;
  solvedIds: number[];
};

const SERVER_SNAPSHOT: PuzzleProgressSnapshot = { difficulty: null, solvedIds: [] };
const EMPTY_SOLVED_IDS: number[] = [];

let cachedSnapshot: PuzzleProgressSnapshot = SERVER_SNAPSHOT;

const listeners = new Set<() => void>();

function arraysEqual(a: number[], b: number[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((value, index) => value === b[index]);
}

function emitProgressChange() {
  listeners.forEach((listener) => listener());
}

export function subscribePuzzleProgress(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);
  return () => listeners.delete(onStoreChange);
}

export function getPuzzleProgressSnapshot(): PuzzleProgressSnapshot {
  const difficulty = getSavedDifficulty();
  const solvedIds = difficulty ? getSolvedIds(difficulty) : EMPTY_SOLVED_IDS;

  if (
    cachedSnapshot.difficulty === difficulty &&
    arraysEqual(cachedSnapshot.solvedIds, solvedIds)
  ) {
    return cachedSnapshot;
  }

  cachedSnapshot = { difficulty, solvedIds: [...solvedIds] };
  return cachedSnapshot;
}

export function getPuzzleProgressServerSnapshot(): PuzzleProgressSnapshot {
  return SERVER_SNAPSHOT;
}

export function getSavedDifficulty(): Difficulty | null {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(DIFFICULTY_KEY);
  return value === "easy" || value === "hard" ? value : null;
}

export function saveDifficulty(difficulty: Difficulty): void {
  localStorage.setItem(DIFFICULTY_KEY, difficulty);
  emitProgressChange();
}

export function clearDifficulty(): void {
  localStorage.removeItem(DIFFICULTY_KEY);
  emitProgressChange();
}

export function getSolvedIds(difficulty: Difficulty): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(progressKey(difficulty));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is number => typeof id === "number");
  } catch {
    return [];
  }
}

export function saveSolvedIds(difficulty: Difficulty, ids: number[]): void {
  localStorage.setItem(progressKey(difficulty), JSON.stringify(ids));
  emitProgressChange();
}

export function markPuzzleSolved(difficulty: Difficulty, puzzleId: number): number[] {
  const current = getSolvedIds(difficulty);
  if (current.includes(puzzleId)) return current;
  const updated = [...current, puzzleId];
  saveSolvedIds(difficulty, updated);
  return updated;
}
