"use client";

import { useState } from "react";

function formatBRL(v: number): string {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

const OPCOES_MESES = [3, 4, 5, 6];

export default function ReservaEmergenciaCalculator({
  disabled,
  onContinue,
}: {
  disabled: boolean;
  onContinue: () => void;
}) {
  const [gastoMensal, setGastoMensal] = useState(3000);
  const [meses, setMeses] = useState(6);

  const total = gastoMensal * meses;

  return (
    <div className="flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-xs font-bold text-slate-500 dark:text-slate-400">
        Gastos essenciais por mês
        <input
          type="number"
          min={0}
          disabled={disabled}
          value={gastoMensal}
          onChange={(e) => setGastoMensal(Number(e.target.value))}
          className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 outline-none focus:border-brand-green disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />
      </label>

      <div>
        <p className="mb-2 text-xs font-bold text-slate-500 dark:text-slate-400">Meses de proteção</p>
        <div className="flex gap-2">
          {OPCOES_MESES.map((m) => (
            <button
              key={m}
              type="button"
              disabled={disabled}
              onClick={() => setMeses(m)}
              className={`flex-1 rounded-xl border-2 border-b-4 py-2 text-sm font-extrabold transition-all disabled:cursor-not-allowed ${
                meses === m
                  ? "border-brand-green bg-brand-green/10 text-brand-green"
                  : "border-slate-200 bg-white text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400"
              }`}
            >
              {m}m
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border-2 border-brand-green/40 bg-brand-green/10 p-4 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Sua reserva ideal
        </p>
        <p className="font-heading text-3xl font-extrabold text-brand-green">{formatBRL(total)}</p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Guardada com liquidez diária, para imprevistos
        </p>
      </div>

      {!disabled && (
        <button
          type="button"
          onClick={onContinue}
          className="w-full rounded-2xl border-b-4 border-black/25 bg-brand-green py-3 font-extrabold text-white active:translate-y-0.5"
        >
          CONTINUAR
        </button>
      )}
    </div>
  );
}
