"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Difficulty } from "@/content/puzzles";
import { fetchRewardUrl } from "@/lib/puzzle-api";
import { getYouTubeEmbedUrl } from "@/lib/youtube-embed";

type EasterEggRevealProps = {
  difficulty: Difficulty;
  solvedIds: number[];
};

export function EasterEggReveal({ difficulty, solvedIds }: EasterEggRevealProps) {
  const [embedUrl, setEmbedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadVideo() {
      setIsLoading(true);
      setLoadError(false);

      const url = await fetchRewardUrl(difficulty, solvedIds);

      if (cancelled) return;

      if (!url) {
        setLoadError(true);
        setIsLoading(false);
        return;
      }

      const embed = getYouTubeEmbedUrl(url);

      if (!embed) {
        setLoadError(true);
        setIsLoading(false);
        return;
      }

      setEmbedUrl(embed);
      setIsLoading(false);
    }

    loadVideo();

    return () => {
      cancelled = true;
    };
  }, [difficulty, solvedIds]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="coastal-card rounded-2xl border px-5 py-7 text-center sm:px-8 sm:py-10"
    >
      <p className="font-script text-2xl text-navy sm:text-3xl md:text-4xl">
        Yeayy, selamat dindakuu! &nbsp;&nbsp;🎉
      </p>

      {isLoading && (
        <p className="mt-5 text-sm text-navy/60 sm:mt-6 sm:text-base">
          Menyiapkan easter egg...
        </p>
      )}

      {loadError && !isLoading && (
        <p className="mt-5 text-sm text-ocean sm:mt-6">
          Easter egg belum siap. Coba refresh halaman ya.
        </p>
      )}

      {embedUrl && !isLoading && (
        <div className="mt-5 flex flex-col items-center gap-4 sm:mt-6 sm:gap-6">
          {!isVideoOpen ? (
            <button
              type="button"
              onClick={() => setIsVideoOpen(true)}
              className="btn-ocean touch-target inline-flex w-full max-w-xs items-center justify-center rounded-xl px-6 py-3 text-base font-medium sm:w-auto sm:px-8"
            >
              Buka Easter Egg nya
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full overflow-hidden rounded-xl border border-foam/50 shadow-md shadow-ocean/10"
            >
              <div className="relative aspect-video w-full bg-navy/10">
                <iframe
                  src={embedUrl}
                  title="Easter egg video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
}
