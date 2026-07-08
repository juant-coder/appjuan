"use client";

import { useAppStore } from "@/store/useAppStore";

export default function StreakBadge() {
  const streak = useAppStore((s) => s.streak);
  return (
    <div className="flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-sm font-bold text-orange-600">
      <span>🔥</span>
      <span>{streak} {streak === 1 ? "dia" : "dias"}</span>
    </div>
  );
}
