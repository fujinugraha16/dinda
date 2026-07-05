import { getPuzzleCount, type Difficulty } from "@/content/puzzles";
import { matchesAnswer } from "@/lib/normalize-answer";
import { getPuzzleAnswer } from "@/lib/puzzle-config";
import { NextResponse } from "next/server";

type VerifyBody = {
  difficulty?: Difficulty;
  puzzleId?: number;
  answer?: string;
};

export async function POST(request: Request) {
  let body: VerifyBody;

  try {
    body = (await request.json()) as VerifyBody;
  } catch {
    return NextResponse.json({ correct: false }, { status: 400 });
  }

  const { difficulty, puzzleId, answer } = body;

  if (
    (difficulty !== "easy" && difficulty !== "hard") ||
    typeof puzzleId !== "number" ||
    typeof answer !== "string" ||
    puzzleId < 1 ||
    puzzleId > getPuzzleCount(difficulty)
  ) {
    return NextResponse.json({ correct: false }, { status: 400 });
  }

  const expected = getPuzzleAnswer(difficulty, puzzleId);

  if (!expected) {
    return NextResponse.json({ correct: false }, { status: 503 });
  }

  return NextResponse.json({ correct: matchesAnswer(answer, expected) });
}
