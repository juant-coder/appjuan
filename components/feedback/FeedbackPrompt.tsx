"use client";

import { useState } from "react";
import { useAppStore } from "@/store/useAppStore";
import FeedbackForm from "@/components/feedback/FeedbackForm";

const A_CADA = 3;

/**
 * Pede feedback a cada 3 missões concluídas. Cada marco (3, 6, 9...) é pedido
 * uma única vez — mesmo que o usuário refaça missões.
 */
export default function FeedbackPrompt() {
  const progress = useAppStore((s) => s.progress);
  const lastMilestone = useAppStore((s) => s.lastFeedbackMilestone ?? 0);
  const setFeedbackMilestone = useAppStore((s) => s.setFeedbackMilestone);

  const [aberto, setAberto] = useState(false);
  const [dispensado, setDispensado] = useState(false);

  const concluidas = Object.values(progress).filter((p) => p.completed).length;
  const marco = Math.floor(concluidas / A_CADA) * A_CADA;
  const deveMostrar = concluidas >= A_CADA && marco > lastMilestone;

  if (!deveMostrar || dispensado) return null;

  function fechar() {
    setFeedbackMilestone(marco);
    setDispensado(true);
  }

  if (aberto) {
    return (
      <div className="w-full rounded-3xl border-2 border-brand-gold/60 bg-white p-5 text-left dark:bg-slate-900">
        <FeedbackForm
          contexto="pos-missao"
          titulo={`${concluidas} missões concluídas! Como está indo? 💬`}
          subtitulo="Sua opinião ajuda a decidir o que construímos a seguir. Leva 20 segundos."
          onEnviado={() => {
            setFeedbackMilestone(marco);
            setTimeout(() => setDispensado(true), 2500);
          }}
        />
        <button
          type="button"
          onClick={fechar}
          className="mt-3 w-full text-center text-xs font-bold text-slate-400"
        >
          Agora não
        </button>
      </div>
    );
  }

  return (
    <div className="w-full rounded-3xl border-2 border-brand-gold/60 bg-brand-gold/15 p-4 text-left">
      <p className="font-heading text-base font-extrabold">
        🎉 {concluidas} missões concluídas!
      </p>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
        Que tal contar o que está achando? Seu feedback ajuda a decidir o que vem a seguir no
        Grana+.
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => setAberto(true)}
          className="flex-1 rounded-2xl border-b-4 border-black/25 bg-brand-gold py-2.5 font-extrabold text-slate-900 active:translate-y-0.5"
        >
          DAR FEEDBACK
        </button>
        <button
          type="button"
          onClick={fechar}
          className="rounded-2xl border-2 border-b-4 border-slate-300 px-4 py-2.5 text-sm font-extrabold text-slate-600 active:translate-y-0.5 dark:border-slate-600 dark:text-slate-300"
        >
          Agora não
        </button>
      </div>
    </div>
  );
}
