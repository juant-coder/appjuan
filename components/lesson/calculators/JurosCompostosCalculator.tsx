"use client";

import { useState } from "react";

const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

export default function JurosCompostosCalculator({
  disabled,
  onContinue,
}: {
  disabled: boolean;
  onContinue: () => void;
}) {
  const [aporte, setAporte] = useState(300);
  const [anos, setAnos] = useState(10);
  const [taxa, setTaxa] = useState(10);

  const i = taxa / 100 / 12;
  const n = anos * 12;
  const montante = i === 0 ? aporte * n : aporte * ((Math.pow(1 + i, n) - 1) / i);
  const investido = aporte * n;
  const juros = montante - investido;

  const campos = [
    { label: "Aporte mensal", valor: aporte, set: setAporte, min: 50, max: 5000, step: 50, fmt: (v: number) => BRL.format(v) },
    { label: "Prazo", valor: anos, set: setAnos, min: 1, max: 40, step: 1, fmt: (v: number) => `${v} anos` },
    { label: "Rendimento ao ano", valor: taxa, set: setTaxa, min: 1, max: 20, step: 0.5, fmt: (v: number) => `${v}%` },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 rounded-2xl border-2 border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
        {campos.map((c) => (
          <label key={c.label} className="flex flex-col gap-1">
            <span className="flex items-center justify-between text-sm font-bold">
              {c.label}
              <span className="font-heading text-brand-green">{c.fmt(c.valor)}</span>
            </span>
            <input
              type="range"
              min={c.min}
              max={c.max}
              step={c.step}
              value={c.valor}
              disabled={disabled}
              onChange={(e) => c.set(Number(e.target.value))}
              className="accent-brand-green"
            />
          </label>
        ))}
      </div>

      <div className="rounded-2xl border-2 border-brand-gold/50 bg-brand-gold/15 p-4 text-center">
        <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Você teria
        </p>
        <p className="font-heading text-3xl font-extrabold text-amber-500">{BRL.format(montante)}</p>
        <p className="mt-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
          {BRL.format(investido)} do seu bolso + {BRL.format(juros)} de juros 🚀
        </p>
      </div>

      {!disabled && (
        <button
          type="button"
          onClick={onContinue}
          className="w-full rounded-2xl border-b-4 border-black/25 bg-brand-green py-3 font-extrabold text-white active:translate-y-0.5"
        >
          ENTENDI
        </button>
      )}
    </div>
  );
}
