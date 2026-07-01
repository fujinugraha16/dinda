import Image from "next/image";
import { birthdayContent } from "@/content/birthday";
import { FadeIn } from "./FadeIn";

export function Hero() {
  const { recipientName, heroSubtitle } = birthdayContent;

  return (
    <FadeIn className="flex flex-col items-center text-center">
      <p className="mb-4 text-sm font-medium tracking-[0.25em] uppercase text-rose">
        A celebration
      </p>
      <h1 className="font-serif text-[clamp(2.5rem,8vw,4rem)] font-medium leading-tight tracking-tight text-charcoal">
        Happy Birthday,
        <br />
        <span className="italic text-rose">{recipientName}</span>
      </h1>
      <div className="my-8 w-30">
        <Image
          src="/floral-accent.svg"
          alt=""
          width={120}
          height={24}
          aria-hidden
          priority
        />
      </div>
      <p className="max-w-md text-lg leading-relaxed text-charcoal/75">
        {heroSubtitle}
      </p>
    </FadeIn>
  );
}
