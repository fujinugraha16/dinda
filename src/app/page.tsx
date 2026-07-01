import { BirthdayMessage } from "@/components/BirthdayMessage";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Wishes } from "@/components/Wishes";

export default function Home() {
  return (
    <div className="bg-elegant-gradient min-h-screen">
      <main className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center gap-16 px-6 py-20 md:px-8 md:py-28">
        <Hero />
        <BirthdayMessage />
        <Wishes />
        <Footer />
      </main>
    </div>
  );
}
