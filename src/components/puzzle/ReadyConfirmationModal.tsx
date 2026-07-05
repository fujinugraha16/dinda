"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { buttonClassName } from "./QuestionPuzzle";

type ReadyConfirmationModalProps = {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export function ReadyConfirmationModal({
  open,
  onConfirm,
  onClose,
}: ReadyConfirmationModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label="Close confirmation"
            className="absolute inset-0 bg-navy/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ready-confirmation-title"
            className="relative z-10 w-full max-w-md rounded-t-3xl border border-foam/60 border-b-0 bg-sky p-5 shadow-xl shadow-ocean/10 sm:rounded-2xl sm:border-b sm:p-8"
            style={{
              paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))",
            }}
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="mx-auto mb-4 h-1 w-10 rounded-full bg-foam/80 sm:hidden"
              aria-hidden
            />
            <p
              id="ready-confirmation-title"
              className="font-script mb-6 text-center text-2xl leading-snug text-navy sm:text-3xl"
            >
              Dinda sudah siap belom?
            </p>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <button type="button" className={buttonClassName} onClick={onConfirm}>
                Ciapp
              </button>
              <button
                type="button"
                className="touch-target rounded-xl border border-foam/60 bg-white/90 px-4 py-3 text-base font-medium text-navy transition-colors hover:border-turquoise/60 hover:bg-white active:bg-foam/30"
                onClick={onClose}
              >
                Beyum
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
