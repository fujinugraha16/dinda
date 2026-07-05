import type { Difficulty } from "@/content/puzzles";

type VerifyResponse = {
  correct: boolean;
};

type RewardResponse = {
  url: string;
};

export async function verifyPuzzleAnswer(
  difficulty: Difficulty,
  puzzleId: number,
  answer: string,
): Promise<boolean> {
  const response = await fetch("/api/puzzle/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ difficulty, puzzleId, answer }),
  });

  if (!response.ok) return false;

  const data = (await response.json()) as VerifyResponse;
  return data.correct;
}

export async function fetchRewardUrl(
  difficulty: Difficulty,
  solvedIds: number[],
): Promise<string | null> {
  const response = await fetch("/api/puzzle/reward", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ difficulty, solvedIds }),
  });

  if (!response.ok) return null;

  const data = (await response.json()) as RewardResponse;
  return data.url;
}
