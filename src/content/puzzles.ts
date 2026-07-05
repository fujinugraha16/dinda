export type PuzzleType =
  | "question"
  | "word-scramble"
  | "memory-match"
  | "cipher"
  | "image-puzzle"
  | "mini-games";

export type Difficulty = "easy" | "hard";

export const difficultyLabels: Record<Difficulty, string> = {
  easy: "Gampang",
  hard: "Sulit",
};

export const difficultyTitles: Record<Difficulty, string> = {
  easy: "Gampang 🐥",
  hard: "Sulit 🔥",
};

export const hintFailureThreshold: Record<Difficulty, number> = {
  easy: 3,
  hard: 5,
};

export function getHintFailureThreshold(difficulty: Difficulty): number {
  return hintFailureThreshold[difficulty];
}

export function isInteractivePuzzleType(type: PuzzleType): boolean {
  return type === "memory-match" || type === "image-puzzle" || type === "mini-games";
}

export function getDifficultyLabel(difficulty: Difficulty): string {
  return difficultyLabels[difficulty];
}

export function getDifficultyTitle(difficulty: Difficulty): string {
  return difficultyTitles[difficulty];
}

type PuzzleBase = {
  id: number;
  prompt: string;
  hint?: string;
};

export type QuestionPuzzleDefinition = PuzzleBase & {
  type: "question";
};

export type WordScramblePuzzleDefinition = PuzzleBase & {
  type: "word-scramble";
  scrambledWord: string;
};

export type MemoryMatchPuzzleDefinition = PuzzleBase & {
  type: "memory-match";
  memoryPairs: string[];
};

export type CipherPuzzleDefinition = PuzzleBase & {
  type: "cipher";
  cipherText: string;
  cipherShift: number;
};

export type ImagePuzzleDefinition = PuzzleBase & {
  type: "image-puzzle";
  imageUrl: string;
  gridSize: number;
};

export type MiniGamePuzzleDefinition = PuzzleBase & {
  type: "mini-games";
  targetCatch: number;
};

export type PuzzleDefinition =
  | QuestionPuzzleDefinition
  | WordScramblePuzzleDefinition
  | MemoryMatchPuzzleDefinition
  | CipherPuzzleDefinition
  | ImagePuzzleDefinition
  | MiniGamePuzzleDefinition;

export const puzzles: Record<Difficulty, PuzzleDefinition[]> = {
  easy: [
    {
      id: 1,
      type: "question",
      prompt: "Bagaimana aku melihatmu? sebagai apa aku menganggapmu?",
      hint: "halaman 3",
    },
    {
      id: 2,
      type: "question",
      prompt: "Aku bingung kenapa ku tak pergi, aku bingung kalian masih disini",
      hint: "Kartu Tarot",
    },
    {
      id: 3,
      type: "question",
      prompt: "Bolehkah aku membawamu ke surga?",
      hint: "Laksana Mata",
    },
    {
      id: 4,
      type: "image-puzzle",
      prompt: "5 Panca Indra",
      imageUrl: "/puzzles/easy-4.jpg",
      gridSize: 3,
      hint: "Ulang tahun kandamu",
    },
    {
      id: 5,
      type: "word-scramble",
      prompt: "Aku bekerja di lantai 5",
      scrambledWord: "OFPOTRO",
      hint: "Halaman yang ada gambar orang raksasa pulang kerja di tengah kota",
    },
    {
      id: 6,
      type: "mini-games",
      prompt: "Kata yang selalu dikatakan aa ketika bereaksi",
      targetCatch: 10,
      hint: "Ukuran keramik kos aa",
    },
    {
      id: 7,
      type: "question",
      prompt: "Gunung lembu purwakarta?",
      hint: "700 meter",
    },
    {
      id: 8,
      type: "question",
      prompt: "Nahkoda kapal",
      hint: "Halaman yang ada gambar nahkoda kapal sedang ngobrol sama awak kapalnya",
    },
    {
      id: 9,
      type: "memory-match",
      prompt: "Jumlah lagu yang ada di buku?",
      memoryPairs: ["💗", "😘", "✨"],
    },
  ],
  hard: [
    {
      id: 1,
      type: "question",
      prompt: "What was the first gift I ever gave you?",
      hint: "The very first surprise from me to you.",
    },
    {
      id: 2,
      type: "question",
      prompt: "What's our inside joke that nobody else gets?",
      hint: "Something that always makes us laugh.",
    },
    {
      id: 3,
      type: "question",
      prompt: "What's the exact date of our first date?",
      hint: "Day, month, and year — be precise.",
    },
    {
      id: 4,
      type: "image-puzzle",
      prompt: "Reassemble this memory — then enter the secret word from the photo.",
      imageUrl: "/puzzles/hard-4.svg",
      gridSize: 3,
      hint: "Every tile click moves one piece. The answer waits in the finished picture.",
    },
    {
      id: 5,
      type: "question",
      prompt: "What pet name do I use when I'm being extra sweet?",
      hint: "Softer than your usual nickname.",
    },
    {
      id: 6,
      type: "question",
      prompt: "Where was I when I first told you I love you?",
      hint: "A specific place and moment.",
    },
    {
      id: 7,
      type: "question",
      prompt: "What did I write in your birthday card last year?",
      hint: "The closing line I signed with.",
    },
    {
      id: 8,
      type: "cipher",
      prompt: "Decode this secret message — shift each letter back.",
      cipherText: "LYLFD",
      cipherShift: 3,
      hint: "Caesar cipher with shift 3.",
    },
    {
      id: 9,
      type: "question",
      prompt: "What's the dream trip we've always talked about?",
      hint: "Somewhere far away we've planned to go.",
    },
    {
      id: 10,
      type: "mini-games",
      prompt: "Catch 15 hearts — then enter the secret word.",
      targetCatch: 15,
      hint: "Move fast! The hearts won't wait for you.",
    },
    {
      id: 11,
      type: "question",
      prompt: "What color dress were you wearing when I knew you were the one?",
      hint: "A color I still remember vividly.",
    },
    {
      id: 12,
      type: "memory-match",
      prompt: "Match all pairs — when you win, enter the secret word.",
      memoryPairs: ["💕", "🌊", "☀️", "🦋"],
      hint: "Four pairs this time. Take your time.",
    },
    {
      id: 13,
      type: "question",
      prompt: "What song was playing during our most memorable moment?",
      hint: "Music in the background of a perfect memory.",
    },
    {
      id: 14,
      type: "image-puzzle",
      prompt: "Piece together this moment — then enter the secret word.",
      imageUrl: "/puzzles/hard-14.svg",
      gridSize: 3,
      hint: "A harder memory to rebuild, but worth it.",
    },
    {
      id: 15,
      type: "question",
      prompt: "What's the name of the café where we spent hours talking?",
      hint: "Our favorite spot for long conversations.",
    },
    {
      id: 16,
      type: "mini-games",
      prompt: "Catch 20 hearts — then enter the secret word.",
      targetCatch: 20,
      hint: "The final catch challenge. You've got this!",
    },
    {
      id: 17,
      type: "word-scramble",
      prompt: "Unscramble this phrase — it's what we are.",
      scrambledWord: "EVLOE",
      hint: "Five letters, the most important word.",
    },
    {
      id: 18,
      type: "question",
      prompt: "What's the one word that describes us?",
      hint: "Everything we are, in a single word.",
    },
  ],
};

export function getPuzzlesForDifficulty(difficulty: Difficulty): PuzzleDefinition[] {
  return puzzles[difficulty];
}

export function getPuzzleCount(difficulty: Difficulty): number {
  return puzzles[difficulty].length;
}
