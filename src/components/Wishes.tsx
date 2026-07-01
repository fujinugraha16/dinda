import { birthdayContent } from "@/content/birthday";
import { FadeIn } from "./FadeIn";

export function Wishes() {
  const { wishes } = birthdayContent;

  return (
    <FadeIn delay={0.15}>
      <div className="text-center">
        <h2 className="mb-8 font-serif text-2xl font-medium text-charcoal md:text-3xl">
          Birthday Wishes
        </h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          {wishes.map((wish, index) => (
            <li
              key={index}
              className="rounded-xl border border-gold/30 bg-white/50 px-6 py-5 text-charcoal/80 transition-colors duration-300 hover:border-rose/50 hover:bg-white/80"
            >
              <span className="mb-2 block font-serif text-lg text-rose">✦</span>
              {wish}
            </li>
          ))}
        </ul>
      </div>
    </FadeIn>
  );
}
