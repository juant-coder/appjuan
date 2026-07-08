"use client";

import { useEffect, useState } from "react";
import { useAppStore, HEARTS_REGEN_INTERVAL_HOURS, MAX_HEARTS_COUNT } from "@/store/useAppStore";

function formatRemaining(ms: number): string {
  if (ms <= 0) return "logo";
  const totalMinutes = Math.ceil(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0) return `${hours}h ${minutes}min`;
  return `${minutes}min`;
}

export default function HeartsDisplay() {
  const hearts = useAppStore((s) => s.hearts);
  const heartsUpdatedAt = useAppStore((s) => s.heartsUpdatedAt);
  const regenerateHearts = useAppStore((s) => s.regenerateHearts);
  const [, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      regenerateHearts();
      setTick((t) => t + 1);
    }, 60000);
    return () => clearInterval(interval);
  }, [regenerateHearts]);

  const intervalMs = HEARTS_REGEN_INTERVAL_HOURS * 60 * 60 * 1000;
  const remainingMs =
    hearts < MAX_HEARTS_COUNT && heartsUpdatedAt
      ? new Date(heartsUpdatedAt).getTime() + intervalMs - Date.now()
      : 0;

  return (
    <div className="flex items-center gap-1" title={`${hearts}/${MAX_HEARTS_COUNT} vidas`}>
      <div className="flex gap-0.5 text-lg leading-none">
        {Array.from({ length: MAX_HEARTS_COUNT }).map((_, i) => (
          <span key={i} className={i < hearts ? "opacity-100" : "opacity-20 grayscale"}>
            ❤️
          </span>
        ))}
      </div>
      {hearts < MAX_HEARTS_COUNT && (
        <span className="text-xs text-slate-500 ml-1">+1 em {formatRemaining(remainingMs)}</span>
      )}
    </div>
  );
}
