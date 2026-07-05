"use client";

import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import {
  confirmReady,
  getReadyConfirmationServerSnapshot,
  getReadyConfirmationSnapshot,
  subscribeReadyConfirmation,
} from "@/lib/puzzle-ready";
import { FadeIn } from "@/components/FadeIn";
import { ReadyConfirmationModal } from "./ReadyConfirmationModal";

export function PuzzleReadySection() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const { everConfirmed, sessionConfirmed } = useSyncExternalStore(
    subscribeReadyConfirmation,
    getReadyConfirmationSnapshot,
    getReadyConfirmationServerSnapshot,
  );

  function handleClick() {
    if (sessionConfirmed) {
      router.push("/puzzle");
      return;
    }
    setModalOpen(true);
  }

  function handleConfirm() {
    confirmReady();
    setModalOpen(false);
    router.push("/puzzle");
  }

  return (
    <>
      <FadeIn delay={0.15}>
        <button
          type="button"
          onClick={handleClick}
          className="btn-ocean touch-target w-full rounded-xl px-5 py-3 text-base font-medium shadow-lg shadow-ocean/20 sm:px-6"
        >
          {everConfirmed ? "Puzzle" : "Ready"}
        </button>
      </FadeIn>

      <ReadyConfirmationModal
        open={modalOpen}
        onConfirm={handleConfirm}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}
