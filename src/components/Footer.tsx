import { birthdayContent } from "@/content/birthday";
import { FadeIn } from "./FadeIn";

export function Footer() {
  const { closingLine } = birthdayContent;
  const year = new Date().getFullYear();

  return (
    <FadeIn delay={0.2}>
      <footer className="border-t border-blush/30 pt-10 text-center">
        <p className="font-serif text-lg italic text-charcoal/70">
          {closingLine}
        </p>
        <p className="mt-6 text-sm tracking-wide text-charcoal/40">
          {year}
        </p>
      </footer>
    </FadeIn>
  );
}
