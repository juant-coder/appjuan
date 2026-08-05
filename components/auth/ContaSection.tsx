"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Conta {
  nome: string;
  email: string;
  desde: string;
}

export default function ContaSection() {
  const [conta, setConta] = useState<Conta | null>(null);
  const [saindo, setSaindo] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      const user = data.user;
      if (!user) return;
      setConta({
        nome:
          (user.user_metadata?.nome as string | undefined) ??
          user.email?.split("@")[0] ??
          "Investidor",
        email: user.email ?? "",
        desde: new Date(user.created_at).toLocaleDateString("pt-BR", {
          month: "long",
          year: "numeric",
        }),
      });
    });
  }, []);

  return (
    <section className="rounded-3xl border border-black/5 bg-white p-5 dark:border-white/5 dark:bg-slate-900">
      <h2 className="font-heading text-lg font-extrabold">Sua conta 🔐</h2>

      {conta ? (
        <div className="mt-3 flex flex-col gap-1 rounded-2xl bg-slate-100 p-3 dark:bg-slate-800">
          <p className="font-extrabold">{conta.nome}</p>
          <p className="break-all text-sm text-slate-500 dark:text-slate-400">{conta.email}</p>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
            Investindo desde {conta.desde}
          </p>
        </div>
      ) : (
        <div className="mt-3 h-20 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800" />
      )}

      <form action="/auth/sair" method="post" onSubmit={() => setSaindo(true)}>
        <button
          type="submit"
          disabled={saindo}
          className="mt-4 w-full rounded-2xl border-2 border-b-4 border-slate-300 py-3 font-extrabold text-slate-600 transition-all active:translate-y-0.5 disabled:opacity-50 dark:border-slate-600 dark:text-slate-300"
        >
          {saindo ? "SAINDO..." : "🚪 SAIR DA CONTA"}
        </button>
      </form>
    </section>
  );
}
