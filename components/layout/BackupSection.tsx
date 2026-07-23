"use client";

import { useState } from "react";
import type { AppState } from "@/types/store";
import { useAppStore } from "@/store/useAppStore";

const BACKUP_KEYS = [
  "xp",
  "streak",
  "lastActiveDate",
  "hearts",
  "heartsUpdatedAt",
  "progress",
  "badges",
  "theme",
  "avatar",
  "history",
  "reviewSuggested",
  "onboarded",
  "focus",
  "unlockedUpTo",
] as const;

function generateBackupCode(): string {
  const state = useAppStore.getState() as unknown as Record<string, unknown>;
  const data: Record<string, unknown> = {};
  for (const key of BACKUP_KEYS) data[key] = state[key];
  return btoa(unescape(encodeURIComponent(JSON.stringify(data))));
}

function parseBackupCode(code: string): Record<string, unknown> {
  return JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
}

export default function BackupSection() {
  const [backupCode, setBackupCode] = useState<string | null>(null);
  const [restoreCode, setRestoreCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  async function handleGenerate() {
    const code = generateBackupCode();
    setBackupCode(code);
    try {
      await navigator.clipboard.writeText(code);
      setMessage("Código copiado! Guarde em um lugar seguro (ex: suas notas). 📋");
    } catch {
      setMessage("Copie o código abaixo e guarde em um lugar seguro.");
    }
  }

  function handleRestore() {
    try {
      const data = parseBackupCode(restoreCode);
      if (typeof data.xp !== "number" || typeof data.progress !== "object" || data.progress === null) {
        throw new Error("invalid");
      }
      useAppStore.setState(data as Partial<AppState>);
      setRestoreCode("");
      setMessage("Progresso restaurado com sucesso! ✅");
    } catch {
      setMessage("Código inválido — confira se copiou o código inteiro e tente de novo.");
    }
  }

  return (
    <section className="rounded-3xl border border-black/5 bg-white p-5 dark:border-white/5 dark:bg-slate-900">
      <h2 className="font-heading text-lg font-extrabold">Backup do progresso 💾</h2>
      <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
        Seu progresso fica salvo apenas neste aparelho. Gere um código de backup para não perder
        nada se limpar o navegador — ou para continuar em outro celular.
      </p>

      <button
        type="button"
        onClick={handleGenerate}
        className="mt-3 w-full rounded-2xl border-b-4 border-black/25 bg-brand-green py-2.5 font-extrabold text-white active:translate-y-0.5"
      >
        GERAR CÓDIGO DE BACKUP
      </button>

      {backupCode && (
        <textarea
          readOnly
          value={backupCode}
          rows={3}
          onFocus={(e) => e.target.select()}
          className="mt-2 w-full rounded-xl border-2 border-slate-200 bg-slate-50 p-2 font-mono text-[10px] text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
        />
      )}

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={restoreCode}
          onChange={(e) => setRestoreCode(e.target.value)}
          placeholder="Colar código para restaurar..."
          className="min-w-0 flex-1 rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-semibold outline-none focus:border-brand-green dark:border-slate-700 dark:bg-slate-800"
        />
        <button
          type="button"
          onClick={handleRestore}
          disabled={!restoreCode.trim()}
          className="rounded-xl border-b-4 border-black/25 bg-slate-700 px-4 py-2 text-sm font-extrabold text-white disabled:opacity-40 active:translate-y-0.5 dark:bg-slate-600"
        >
          RESTAURAR
        </button>
      </div>

      {message && (
        <p className="mt-2 text-xs font-bold text-brand-green">{message}</p>
      )}
    </section>
  );
}
