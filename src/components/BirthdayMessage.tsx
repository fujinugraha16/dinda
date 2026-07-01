import { birthdayContent } from "@/content/birthday";
import { FadeIn } from "./FadeIn";

export function BirthdayMessage() {
  const { messageParagraphs } = birthdayContent;

  return (
    <FadeIn delay={0.1}>
      <div className="rounded-2xl border border-blush/40 bg-white/60 px-8 py-10 shadow-sm backdrop-blur-sm transition-shadow duration-500 hover:shadow-md">
        <div className="space-y-6 text-center">
          {messageParagraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-base leading-relaxed text-charcoal/80 md:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}
