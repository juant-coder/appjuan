"use client";

import { useState } from "react";

function formatBRL(v: number): string {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

export default function JurosCompostosCalculator({
  disabled,
  onContinue,
}: {
  disabled: boolean;
  onContinue: () => void;
}) {
  const [valorInicial, setValorInicial] = useState(1000);
  const [aporteMensal, setAporteMensal] = useState(200);
  const [taxaAnual, setTaxaAnual] = useState(10);
  const [anos, setAnos] = useState(10);

  const meses = anos * 12;
  const taxaMensal = Math.pow(1 + taxaAnual / 100, 1 / 12) - 1;
  let saldo = valorInicial;
  for (let i = 0; i < meses; i++) {
    saldo = saldo * (1 + taxaMensal) + aporteMensal;
  }
  const totalInvestido = valorInicial + aporteMensal * meses;
  const jurosGanhos = Math.max(0, saldo - totalInvestido);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-xs font-bold text-slate-500 dark:text-slate-400">
          Valor inicial
          <input
            type="number"
            min={0}
            disabled={disabled}
            value={valorInicial}
            onChange={(e) => setValorInicial(Number(e.target.value))}
            className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 outline-none focus:border-brand-green disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-bold text-slate-500 dark:text-slate-400">
          Aporte mensal
          <input
            type="number"
            min={0}
            disabled={disabled}
            value={aporteMensal}
            onChange={(e) => setAporteMensal(Number(e.target.value))}
            className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 outline-none focus:border-brand-green disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-bold text-slate-500 dark:text-slate-400">
          Taxa ao ano (%)
          <input
            type="number"
            min={0}
            disabled={disabled}
            value={taxaAnual}
            onChange={(e) => setTaxaAnual(Number(e.target.value))}
            className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 outline-none focus:border-brand-green disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-bold text-slate-500 dark:text-slate-400">
          Anos
          <input
            type="number"
            min={1}
            max={50}
            disabled={disabled}
            value={anos}
            onChange={(e) => setAnos(Number(e.target.value))}
            className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 outline-none focus:border-brand-green disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </label>
      </div>

      <div className="rounded-3xl border-2 border-brand-green/40 bg-brand-green/10 p-4 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Valor final estimado
        </p>
        <p className="font-heading text-3xl font-extrabold text-brand-green">{formatBRL(saldo)}</p>
        <div className="mt-2 flex justify-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <span>Investido: {formatBRL(totalInvestido)}</span>
          <span>Juros: {formatBRL(jurosGanhos)}</span>
        </div>
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
