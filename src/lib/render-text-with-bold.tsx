import { Fragment } from "react";

const boldPattern = /<b>(.*?)<\/b>/g;

export function renderTextWithBold(text: string) {
  const parts: Array<{ type: "text" | "bold"; value: string }> = [];
  let lastIndex = 0;

  for (const match of text.matchAll(boldPattern)) {
    const index = match.index ?? 0;

    if (index > lastIndex) {
      parts.push({ type: "text", value: text.slice(lastIndex, index) });
    }

    parts.push({ type: "bold", value: match[1] });
    lastIndex = index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({ type: "text", value: text.slice(lastIndex) });
  }

  if (parts.length === 0) {
    return text;
  }

  return parts.map((part, index) =>
    part.type === "bold" ? (
      <strong key={index} className="font-semibold text-navy">
        {part.value}
      </strong>
    ) : (
      <Fragment key={index}>{part.value}</Fragment>
    ),
  );
}
