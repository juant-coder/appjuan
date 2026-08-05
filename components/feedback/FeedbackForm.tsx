"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAppStore } from "@/store/useAppStore";

const NOTAS = [
  { valor: 1, emoji: "😖" },
  { valor: 2, emoji: "😕" },
  { valor: 3, emoji: "😐" },
  { valor: 4, emoji: "🙂" },
  { valor: 5, emoji: "🤩" },
];

export default function FeedbackForm({
  contexto,
  titulo = "Conta pra gente o que achou 💬",
  subtitulo = "Seu feedback vai direto pra quem constrói o app. Leva 20 segundos.",
  onEnviado,
}: {
  /** De onde veio: "perfil" ou "pos-missao" */
  contexto: string;
  titulo?: string;
  subtitulo?: string;
  onEnviado?: () => void;
}) {
  const xp = useAppStore((s) => s.xp);
  const progress = useAppStore((s) => s.progress);
  const missoesConcluidas = Object.values(progress).filter((p) => p.completed).length;

  const [nota, setNota] = useState<number | null>(null);
  const [mensagem, setMensagem] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const podeEnviar = mensagem.trim().length >= 3 && !enviando;

  async function enviar() {
    setErro(null);
    setEnviando(true);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setErro("Sua sessão expirou. Entre novamente para enviar o feedback.");
        setEnviando(false);
        return;
      }

      const { error } = await supabase.from("feedback").insert({
        user_id: user.id,
        email: user.email ?? null,
        nome: (user.user_metadata?.nome as string | undefined) ?? null,
        nota,
        mensagem: mensagem.trim(),
        contexto,
        missoes_concluidas: missoesConcluidas,
        xp,
      });

      if (error) {
        setErro("Não conseguimos enviar agora. Tente de novo em instantes.");
        setEnviando(false);
        return;
      }

      setEnviado(true);
      setEnviando(false);
      onEnviado?.();
    } catch {
      setErro("Não conseguimos enviar agora. Tente de novo em instantes.");
      setEnviando(false);
    }
  }

  if (enviado) {
    return (
      <div className="rounded-2xl border-2 border-brand-green bg-green-50 p-4 text-center dark:bg-green-950">
        <p className="text-3xl">🙏</p>
        <p className="mt-1 font-heading font-extrabold text-green-700 dark:text-green-300">
          Feedback enviado!
        </p>
        <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
          Obrigado — é assim que o Grana+ vai melhorando.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h2 className="font-heading text-lg font-extrabold">{titulo}</h2>
        <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          {subtitulo}
        </p>
      </div>

      <div className="flex justify-between gap-1">
        {NOTAS.map((n) => (
          <button
            key={n.valor}
            type="button"
            onClick={() => setNota(nota === n.valor ? null : n.valor)}
            aria-label={`Nota ${n.valor}`}
            disabled={enviando}
            className={`flex-1 rounded-xl border-2 border-b-4 py-2 text-2xl transition-all active:translate-y-0.5 ${
              nota === n.valor
                ? "border-brand-green bg-brand-green/15"
                : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
            }`}
          >
            {n.emoji}
          </button>
        ))}
      </div>

      <textarea
        value={mensagem}
        onChange={(e) => setMensagem(e.target.value)}
        rows={4}
        disabled={enviando}
        placeholder="O que você mais gostou? O que faltou? O que te faria voltar amanhã?"
        className="w-full rounded-2xl border-2 border-b-4 border-slate-200 bg-white px-4 py-3 text-sm font-semibold outline-none transition-colors focus:border-brand-green disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800"
      />

      {erro && <p className="text-xs font-bold text-brand-red">{erro}</p>}

      <button
        type="button"
        onClick={enviar}
        disabled={!podeEnviar}
        className="w-full rounded-2xl border-b-4 border-black/25 bg-brand-green py-3 font-extrabold text-white transition-all active:translate-y-0.5 disabled:opacity-40"
      >
        {enviando ? "ENVIANDO..." : "ENVIAR FEEDBACK"}
      </button>
    </div>
  );
}
