export function normalizeAnswer(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function matchesAnswer(submitted: string, expected: string): boolean {
  const normalizedSubmitted = normalizeAnswer(submitted);
  const alternatives = expected.split(",").map((part) => normalizeAnswer(part));

  return alternatives.some((alternative) => alternative === normalizedSubmitted);
}
