import { birthdayContent } from "@/content/birthday";
import { renderTextWithBold } from "@/lib/render-text-with-bold";
import { FadeIn } from "./FadeIn";

export function BirthdayMessage() {
  const { messageParagraphs } = birthdayContent;

  return (
    <FadeIn delay={0.1}>
      <div className="coastal-card rounded-2xl border px-5 py-6 sm:px-7 sm:py-8 md:px-8 md:py-10">
        <div className="space-y-4 text-left sm:space-y-5 md:space-y-6">
          {messageParagraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-[0.9375rem] leading-relaxed text-navy/80 sm:text-base md:text-lg"
            >
              {renderTextWithBold(paragraph)}
            </p>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}
