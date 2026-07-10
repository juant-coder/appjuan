"use client";

import Link from "next/link";
import { useAppStore } from "@/store/useAppStore";

export default function ReviewBanner() {
  const reviewSuggested = useAppStore((s) => s.reviewSuggested);
  const dismissReview = useAppStore((s) => s.dismissReview);

  if (!reviewSuggested) return null;

  return (
    <div className="mx-auto max-w-md px-4 pt-4">
      <div className="relative overflow-hidden rounded-3xl border-2 border-brand-gold/60 bg-brand-gold/15 p-4">
        <button
          type="button"
          onClick={dismissReview}
          aria-label="Dispensar revisão"
          className="absolute right-3 top-3 text-slate-400"
        >
          ✕
        </button>
        <p className="font-heading text-base font-extrabold">👋 Sentimos sua falta!</p>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Faz mais de 3 dias que você não treina. Uma revisão rápida ajuda a fixar o que você já
          aprendeu — e ainda rende XP.
        </p>
        <Link
          href="/revisao"
          className="mt-3 block rounded-2xl border-b-4 border-black/25 bg-brand-gold py-2.5 text-center font-extrabold text-slate-900 active:translate-y-0.5"
        >
          FAZER REVISÃO 🧠
        </Link>
      </div>
    </div>
  );
}
