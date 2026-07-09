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
      prompt: "Bagaimana aku melihatmu? sebagai apa aku menganggapmu?",
      hint: "halaman 3",
    },
    {
      id: 2,
      type: "question",
      prompt: "Halaman berapa yang bisa membawakanku cakrawala?",
      hint: "BMTH",
    },
    {
      id: 3,
      type: "question",
      prompt: "Aku tertidur lelap dalam tanggal ulang tahunku",
      hint: "Enaknya makan dan minum membuatku.....",
    },
    {
      id: 4,
      type: "image-puzzle",
      prompt: "Selalu menertawakan ramalan bintang, kartu tarot, orang pintar, pembaca nasib",
      imageUrl: "/puzzles/hard-4.jpg",
      gridSize: 3,
      hint: "Kartu Tarot",
    },
    {
      id: 5,
      type: "question",
      prompt: "Kita sudah terlambat untuk melihat dia tenggelam",
      hint: "Halaman gambar yang ada matahari nya",
    },
    {
      id: 6,
      type: "question",
      prompt: "Dunia mu, Dunia ku",
      hint: "Sebutan Indonesia jaman penjajahan",
    },
    {
      id: 7,
      type: "question",
      prompt: "Bolehkah aku membawamu ke surga?",
      hint: "Laksana Mata",
    },
    {
      id: 8,
      type: "cipher",
      prompt: "Menyenangkan jika kita menggeser ke kiri 5 kali",
      cipherText: "VKXATMMA",
      cipherShift: 5,
      hint: "pastikan riuh akhiri malammu",
    },
    {
      id: 9,
      type: "question",
      prompt: "Seorang Raja sedang memandang kota",
      hint: "Ungkapan haru yang disampaikan jam 11 malam",
    },
    {
      id: 10,
      type: "mini-games",
      prompt: "Aku pernah lewat kesini, terasa damai dan familiar",
      targetCatch: 15,
      hint: "16+11+2+7+9+9+12",
    },
    {
      id: 11,
      type: "question",
      prompt: "Gambar anak sedang melepaskan burung nya",
      hint: "cintai ususmu",
    },
    {
      id: 12,
      type: "memory-match",
      prompt: "Kenapa diriku merayumu di halaman tanggal lahir ulang tahunmu?",
      memoryPairs: ["💕", "🌊", "☀️", "🦋", "🤍", "😘"],
      hint: "setiap nafas, setiap detik,...",
    },
    {
      id: 13,
      type: "question",
      prompt: "Seseorang sedang membawa payung hujan di bandung",
      hint: "di Bandung di Ganesha",
    },
    {
      id: 14,
      type: "image-puzzle",
      prompt: "Dirimu membawa kedamaian, dirimu membawa cahaya",
      imageUrl: "/puzzles/hard-14.jpg",
      gridSize: 3,
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
      prompt: "Jumlah lagu yang ada di buku?",
    },
  ],
};

export function getPuzzlesForDifficulty(difficulty: Difficulty): PuzzleDefinition[] {
  return puzzles[difficulty];
}

export function getPuzzleCount(difficulty: Difficulty): number {
  return puzzles[difficulty].length;
}
