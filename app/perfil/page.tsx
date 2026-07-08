"use client";

import Header from "@/components/layout/Header";
import BadgeGrid from "@/components/badges/BadgeGrid";
import { useAppStore } from "@/store/useAppStore";

export default function PerfilPage() {
  const xp = useAppStore((s) => s.xp);
  const streak = useAppStore((s) => s.streak);
  const progress = useAppStore((s) => s.progress);
  const completedCount = Object.values(progress).filter((p) => p.completed).length;

  return (
    <>
      <Header />
      <main className="mx-auto flex max-w-2xl flex-col gap-6 p-4 pb-10">
        <section className="flex flex-col items-center gap-2 rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <span className="text-5xl">🙂</span>
          <h1 className="font-heading text-xl font-extrabold text-brand-dark">Seu progresso</h1>
          <div className="mt-2 flex gap-6">
            <div className="flex flex-col items-center">
              <span className="font-heading text-2xl font-extrabold text-amber-600">{xp}</span>
              <span className="text-xs text-slate-500">XP total</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-heading text-2xl font-extrabold text-orange-600">{streak}</span>
              <span className="text-xs text-slate-500">dias seguidos</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-heading text-2xl font-extrabold text-brand-green">
                {completedCount}
              </span>
              <span className="text-xs text-slate-500">lições concluídas</span>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-3 font-heading text-lg font-extrabold text-brand-dark">Conquistas</h2>
          <BadgeGrid />
        </section>
      </main>
    </>
  );
}
