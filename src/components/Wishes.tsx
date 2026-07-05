import { birthdayContent } from "@/content/birthday";
import { FadeIn } from "./FadeIn";

export function Wishes() {
  const { wishes } = birthdayContent;

  return (
    <FadeIn delay={0.15}>
      <div className="text-center">
        <h2 className="font-script mb-5 text-2xl text-navy sm:mb-6 sm:text-3xl md:mb-8 md:text-4xl">
          Birthday Wishes
        </h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {wishes.map((wish, index) => (
            <li
              key={index}
              className="coastal-card rounded-xl border px-4 py-4 text-left text-[0.9375rem] text-navy/80 sm:px-5 sm:py-5 sm:text-base md:text-center"
            >
              <span className="mb-1.5 block text-base text-ocean sm:mb-2 sm:text-lg" aria-hidden>
                ⚓
              </span>
              {wish}
            </li>
          ))}
        </ul>
      </div>
    </FadeIn>
  );
}
