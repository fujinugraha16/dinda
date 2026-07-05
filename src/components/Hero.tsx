import { birthdayContent } from "@/content/birthday";
import { FadeIn } from "./FadeIn";

export function Hero() {
  const { heroTitle } = birthdayContent;

  return (
    <FadeIn className="flex flex-col items-center px-1 text-center">
      <p className="font-script mb-2 text-3xl leading-tight text-navy sm:text-4xl md:text-5xl">
        Finally found you!
      </p>
      <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-ocean sm:text-sm sm:tracking-[0.25em]">
        A celebration
      </p>
      <h1 className="font-script text-4xl leading-tight text-ocean sm:text-5xl md:text-6xl">
        {heroTitle}
      </h1>
    </FadeIn>
  );
}
