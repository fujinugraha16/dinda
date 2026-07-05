import { getPuzzleCount, puzzles, type Difficulty } from "@/content/puzzles";
import { getYoutubeVideoUrl } from "@/lib/puzzle-config";
import { NextResponse } from "next/server";

type RewardBody = {
  difficulty?: Difficulty;
  solvedIds?: number[];
};

function isValidCompletion(difficulty: Difficulty, solvedIds: number[]): boolean {
  const expectedCount = getPuzzleCount(difficulty);
  if (solvedIds.length !== expectedCount) return false;

  const validIds = new Set(puzzles[difficulty].map((puzzle) => puzzle.id));
  const uniqueIds = new Set(solvedIds);

  if (uniqueIds.size !== expectedCount) return false;

  return solvedIds.every((id) => validIds.has(id));
}

export async function POST(request: Request) {
  let body: RewardBody;

  try {
    body = (await request.json()) as RewardBody;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { difficulty, solvedIds } = body;

  if (
    (difficulty !== "easy" && difficulty !== "hard") ||
    !Array.isArray(solvedIds) ||
    !isValidCompletion(difficulty, solvedIds)
  ) {
    return NextResponse.json({ error: "Incomplete" }, { status: 403 });
  }

  const url = getYoutubeVideoUrl();

  if (!url) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  return NextResponse.json({ url });
}
