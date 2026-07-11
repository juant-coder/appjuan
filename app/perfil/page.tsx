"use client";

import Link from "next/link";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import BadgeGrid from "@/components/badges/BadgeGrid";
import { useAppStore } from "@/store/useAppStore";

const AVATARS = [
  "🤑", "😎", "🦁", "🦊", "🐼", "🐸", "🤓", "👑",
  "🚀", "💎", "🐺", "🤠", "🥷", "👻", "🐷", "🦅",
];

export default function PerfilPage() {
  const xp = useAppStore((s) => s.xp);
  const streak = useAppStore((s) => s.streak);
  const progress = useAppStore((s) => s.progress);
  const avatar = useAppStore((s) => s.avatar);
  const setAvatar = useAppStore((s) => s.setAvatar);
  const completedCount = Object.values(progress).filter((p) => p.completed).length;

  const level = Math.floor(xp / 100) + 1;
  const levelPct = xp % 100;

  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-md flex-col gap-5 px-4 pb-28 pt-4">
        <section className="flex flex-col items-center gap-3 rounded-3xl border border-black/5 bg-white p-6 text-center dark:border-white/5 dark:bg-slate-900">
          <span className="flex h-24 w-24 animate-bounce-in items-center justify-center rounded-full bg-brand-green/15 text-6xl ring-4 ring-brand-green/40">
            {avatar}
          </span>
          <div>
            <h1 className="font-heading text-xl font-extrabold">Investidor Nível {level}</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {100 - levelPct} XP para o nível {level + 1}
            </p>
          </div>
          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-brand-gold to-amber-400 transition-all duration-500"
              style={{ width: `${levelPct}%` }}
            />
          </div>
          <div className="mt-1 grid w-full grid-cols-3 gap-2">
            {[
              { valor: xp, rotulo: "XP total", cor: "text-amber-500" },
              { valor: streak, rotulo: "dias seguidos", cor: "text-orange-500" },
              { valor: completedCount, rotulo: "missões", cor: "text-brand-green" },
            ].map((s) => (
              <div key={s.rotulo} className="rounded-2xl bg-slate-100 p-3 dark:bg-slate-800">
                <p className={`font-heading text-2xl font-extrabold ${s.cor}`}>{s.valor}</p>
                <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">{s.rotulo}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-black/5 bg-white p-5 dark:border-white/5 dark:bg-slate-900">
          <h2 className="mb-3 font-heading text-lg font-extrabold">Escolha seu avatar</h2>
          <div className="grid grid-cols-8 gap-2">
            {AVATARS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setAvatar(emoji)}
                aria-label={`Avatar ${emoji}`}
                className={`flex h-10 w-10 items-center justify-center rounded-xl text-2xl transition-transform active:scale-90 ${
                  avatar === emoji
                    ? "bg-brand-green/20 ring-2 ring-brand-green"
                    : "bg-slate-100 dark:bg-slate-800"
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </section>

        {completedCount > 0 && (
          <Link
            href="/revisao"
            className="block rounded-2xl border-b-4 border-black/25 bg-brand-green py-3 text-center font-extrabold text-white active:translate-y-0.5"
          >
            REVISAR O QUE JÁ APRENDI 🧠
          </Link>
        )}

        <section>
          <h2 className="mb-3 font-heading text-lg font-extrabold">Conquistas 🏆</h2>
          <BadgeGrid />
        </section>

        <a
          href="mailto:juantarosa@gmail.com?subject=Feedback%20Grana%2B&body=O%20que%20achei%3A%0A%0AO%20que%20senti%20falta%3A%0A%0AO%20que%20me%20faria%20voltar%20amanh%C3%A3%3A"
          className="block rounded-2xl border-2 border-b-4 border-slate-300 py-3 text-center font-extrabold text-slate-600 active:translate-y-0.5 dark:border-slate-600 dark:text-slate-300"
        >
          💬 ENVIAR FEEDBACK / SUGESTÃO
        </a>
      </main>
      <BottomNav />
    </>
  );
}
