import puzzleConfig from "@/content/puzzle-config.json";
import type { Difficulty } from "@/content/puzzles";

type PuzzleConfig = {
  youtubeVideoUrl: string;
  answers: Record<Difficulty, Record<string, string>>;
};

const config = puzzleConfig as PuzzleConfig;

export function getPuzzleAnswer(
  difficulty: Difficulty,
  puzzleId: number,
): string | undefined {
  return config.answers[difficulty][String(puzzleId)];
}

export function getYoutubeVideoUrl(): string | undefined {
  const url = config.youtubeVideoUrl.trim();
  return url || undefined;
}
