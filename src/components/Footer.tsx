import { birthdayContent } from "@/content/birthday";
import { FadeIn } from "./FadeIn";

export function Footer() {
  const { closingLine } = birthdayContent;
  const year = new Date().getFullYear();

  return (
    <FadeIn delay={0.2}>
      <footer className="border-t border-foam/50 pt-8 text-center sm:pt-10">
        <p className="font-script text-lg text-navy/80 sm:text-xl">{closingLine}</p>
        <p className="mt-4 text-xs tracking-wide text-navy/40 sm:mt-6 sm:text-sm">{year}</p>
      </footer>
    </FadeIn>
  );
}
