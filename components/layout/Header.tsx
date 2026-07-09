"use client";

import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";
import HeartsDisplay from "@/components/hearts/HeartsDisplay";

export default function Header() {
  const avatar = useAppStore((s) => s.avatar);
  const theme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);
  const xp = useAppStore((s) => s.xp);
  const streak = useAppStore((s) => s.streak);

  return (
    <header className="sticky top-0 z-20 border-b border-black/5 bg-white/85 backdrop-blur dark:border-white/10 dark:bg-[#0b0b16]/85">
      <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">
        <Link
          href="/perfil"
          aria-label="Perfil"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-xl shadow-inner dark:bg-slate-800"
        >
          {avatar}
        </Link>
        <div className="flex items-center gap-3 text-sm font-extrabold">
          <span className="text-orange-500">🔥 {streak}</span>
          <span className="text-amber-500">⭐ {xp}</span>
          <HeartsDisplay compact />
        </div>
        <button
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Alternar tema"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-lg dark:bg-slate-800"
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}
