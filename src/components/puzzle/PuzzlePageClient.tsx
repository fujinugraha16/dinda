"use client";

import { useEffect, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  getReadyConfirmationServerSnapshot,
  getReadyConfirmationSnapshot,
  subscribeReadyConfirmation,
} from "@/lib/puzzle-ready";
import { PuzzleSection } from "./PuzzleSection";

export function PuzzlePageClient() {
  const router = useRouter();
  const { sessionConfirmed } = useSyncExternalStore(
    subscribeReadyConfirmation,
    getReadyConfirmationSnapshot,
    getReadyConfirmationServerSnapshot,
  );

  useEffect(() => {
    if (!sessionConfirmed) {
      router.replace("/");
    }
  }, [sessionConfirmed, router]);

  if (!sessionConfirmed) {
    return null;
  }

  return (
    <>
      <div className="mb-4 sm:mb-6">
        <Link
          href="/"
          aria-label="Kembali ke beranda"
          className="touch-target inline-flex h-11 w-11 items-center justify-center rounded-full border border-foam/70 bg-white/90 text-xl font-medium text-ocean shadow-md shadow-ocean/10 transition-colors hover:border-turquoise/60 hover:bg-white hover:text-deep active:bg-foam/30"
        >
          ←
        </Link>
      </div>

      <PuzzleSection />
    </>
  );
}
