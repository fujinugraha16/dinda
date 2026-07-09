import { BirthdayMessage } from "@/components/BirthdayMessage";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { PuzzleReadySection } from "@/components/puzzle/PuzzleReadySection";

export default function Home() {
  return (
    <div className="bg-elegant-gradient relative min-h-dvh overflow-x-clip">
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-turquoise/20 blur-3xl md:-right-20 md:-top-20 md:h-64 md:w-64"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-ocean/10 blur-3xl md:-bottom-32 md:-left-20 md:h-72 md:w-72"
        aria-hidden
      />

      <main className="page-main relative mx-auto flex w-full max-w-lg flex-col gap-10 sm:max-w-xl sm:gap-12 md:max-w-2xl md:gap-16">
        <Hero />
        <BirthdayMessage />
        <PuzzleReadySection />
        <Footer />
      </main>
    </div>
  );
}
