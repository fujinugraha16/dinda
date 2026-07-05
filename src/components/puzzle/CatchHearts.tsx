"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  answerPlaceholder,
  buttonClassName,
  inputClassName,
  submitButtonLabel,
  submittingButtonLabel,
  type PuzzleInputProps,
} from "./QuestionPuzzle";
import { InteractivePuzzlePrompt } from "./InteractivePuzzlePrompt";

type CatchHeartsProps = PuzzleInputProps & {
  targetCatch: number;
};

type Heart = {
  id: number;
  x: number;
  y: number;
  speed: number;
};

const BASKET_WIDTH = 72;
const HEART_SIZE = 28;
const SPAWN_INTERVAL_MS = 900;
const GAME_HEIGHT = 300;

export function CatchHearts({
  targetCatch,
  savedAnswer,
  onAnswerChange,
  onSubmit,
  isSubmitting,
  error,
  readOnly = false,
  onGameComplete,
  prompt,
  hint,
  hintUnlocked,
  hintVisible,
  onShowHint,
}: CatchHeartsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const basketXRef = useRef(0);
  const heartsRef = useRef<Heart[]>([]);
  const nextHeartIdRef = useRef(0);
  const caughtRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastSpawnRef = useRef(0);
  const draggingRef = useRef(false);

  const [caught, setCaught] = useState(0);
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [basketX, setBasketX] = useState(0);
  const [answer, setAnswer] = useState(savedAnswer);
  const [gameWidth, setGameWidth] = useState(320);

  const isComplete = caught >= targetCatch;

  useEffect(() => {
    if (isComplete && !readOnly) onGameComplete?.();
  }, [isComplete, readOnly, onGameComplete]);

  function handleAnswerChange(value: string) {
    setAnswer(value);
    onAnswerChange(value);
  }

  const syncBasketPosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const halfBasket = BASKET_WIDTH / 2;
    const nextX = Math.max(
      halfBasket,
      Math.min(clientX - rect.left, rect.width - halfBasket),
    );
    basketXRef.current = nextX;
    setBasketX(nextX);
  }, []);

  useEffect(() => {
    basketXRef.current = basketX;
  }, [basketX]);

  useEffect(() => {
    if (readOnly || isComplete) return;

    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      const width = container.clientWidth;
      setGameWidth(width);
      const halfBasket = BASKET_WIDTH / 2;
      const centered = width / 2;
      basketXRef.current = centered;
      setBasketX(centered);
    };

    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(container);

    const tick = (timestamp: number) => {
      if (lastSpawnRef.current === 0) lastSpawnRef.current = timestamp;

      if (timestamp - lastSpawnRef.current >= SPAWN_INTERVAL_MS) {
        lastSpawnRef.current = timestamp;
        const heart: Heart = {
          id: nextHeartIdRef.current++,
          x: HEART_SIZE + Math.random() * (gameWidth - HEART_SIZE * 2),
          y: -HEART_SIZE,
          speed: 1.4 + Math.random() * 1.2,
        };
        heartsRef.current = [...heartsRef.current, heart];
      }

      const basketY = GAME_HEIGHT - 36;
      const nextHearts: Heart[] = [];

      for (const heart of heartsRef.current) {
        const nextY = heart.y + heart.speed;

        const caughtHeart =
          nextY + HEART_SIZE >= basketY &&
          heart.y + HEART_SIZE < basketY &&
          Math.abs(heart.x - basketXRef.current) < BASKET_WIDTH / 2 + HEART_SIZE / 2;

        if (caughtHeart) {
          caughtRef.current += 1;
          setCaught(caughtRef.current);
          continue;
        }

        if (nextY < GAME_HEIGHT + HEART_SIZE) {
          nextHearts.push({ ...heart, y: nextY });
        }
      }

      heartsRef.current = nextHearts;
      setHearts([...nextHearts]);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      observer.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [readOnly, isComplete, gameWidth]);

  if (readOnly) {
    return (
      <div className="space-y-4">
        <div className="rounded-xl border border-turquoise/30 bg-ocean/5 px-4 py-8 text-center">
          <p className="text-3xl">💗</p>
          <p className="mt-2 text-sm text-navy/70">
            Mini game selesai — {targetCatch}/{targetCatch} hati tertangkap
          </p>
        </div>
        <InteractivePuzzlePrompt
          prompt={prompt}
          hint={hint}
          hintUnlocked={hintUnlocked}
          hintVisible={hintVisible}
          onShowHint={onShowHint}
          readOnly
        />
        <div className="space-y-2">
          <p className="text-xs font-medium tracking-wide uppercase text-navy/50">
            Jawaban kamu
          </p>
          <div className="rounded-xl border border-turquoise/40 bg-turquoise/10 px-4 py-3 text-base text-navy">
            {savedAnswer || "—"}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-navy/70">
        <span>
          Hati: {caught}/{targetCatch}
        </span>
        <span>Geser keranjang untuk menangkap 💗</span>
      </div>

      <div
        ref={containerRef}
        className="relative touch-none overflow-hidden rounded-xl border border-turquoise/30 bg-gradient-to-b from-sky/40 to-foam/30"
        style={{ height: GAME_HEIGHT }}
        onPointerDown={(event) => {
          if (isComplete) return;
          draggingRef.current = true;
          containerRef.current?.setPointerCapture(event.pointerId);
          syncBasketPosition(event.clientX);
        }}
        onPointerMove={(event) => {
          if (!draggingRef.current || isComplete) return;
          syncBasketPosition(event.clientX);
        }}
        onPointerUp={(event) => {
          draggingRef.current = false;
          containerRef.current?.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={() => {
          draggingRef.current = false;
        }}
      >
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="pointer-events-none absolute text-2xl select-none"
            style={{
              left: heart.x - HEART_SIZE / 2,
              top: heart.y,
              width: HEART_SIZE,
              height: HEART_SIZE,
              lineHeight: `${HEART_SIZE}px`,
              textAlign: "center",
            }}
          >
            💗
          </span>
        ))}

        <div
          className="absolute bottom-3 flex h-10 items-center justify-center rounded-full border-2 border-ocean/40 bg-white/90 text-lg shadow-sm"
          style={{
            width: BASKET_WIDTH,
            left: basketX - BASKET_WIDTH / 2,
          }}
        >
          🧺
        </div>
      </div>

      {isComplete && (
        <div className="space-y-4">
          <p className="text-left text-sm text-navy/70">
            Yeaayy semua 🩷 udah dinda tangkap
          </p>
          <InteractivePuzzlePrompt
            prompt={prompt}
            hint={hint}
            hintUnlocked={hintUnlocked}
            hintVisible={hintVisible}
            onShowHint={onShowHint}
          />
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              if (answer.trim()) await onSubmit(answer);
            }}
            className="space-y-4"
          >
            <input
              type="text"
              value={answer}
              onChange={(event) => handleAnswerChange(event.target.value)}
              autoComplete="off"
              placeholder={answerPlaceholder}
              disabled={isSubmitting}
              className={inputClassName}
            />
            {error && <p className="text-sm text-ocean">{error}</p>}
            <button
              type="submit"
              disabled={isSubmitting || !answer.trim()}
              className={buttonClassName}
            >
              {isSubmitting ? submittingButtonLabel : submitButtonLabel}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
