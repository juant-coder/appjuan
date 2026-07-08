"use client";

import { useAppStore } from "@/store/useAppStore";

export default function XpBadge() {
  const xp = useAppStore((s) => s.xp);
  return (
    <div className="flex items-center gap-1 rounded-full bg-brand-gold/20 px-3 py-1 text-sm font-bold text-amber-700">
      <span>⭐</span>
      <span>{xp} XP</span>
    </div>
  );
}
