"use client";

import { useState } from "react";

const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

type Vinculo = "clt" | "autonomo";

export default function ReservaEmergenciaCalculator({
  disabled,
  onContinue,
}: {
  disabled: boolean;
  onContinue: () => void;
}) {
  const [gasto, setGasto] = useState(3000);
  const [vinculo, setVinculo] = useState<Vinculo>("clt");
  const [guardaMes, setGuardaMes] = useState(400);

  const meses = vinculo === "clt" ? 6 : 12;
  const meta = gasto * meses;
  const tempo = guardaMes > 0 ? Math.ceil(meta / guardaMes) : 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 rounded-2xl border-2 border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
        <label className="flex flex-col gap-1">
          <span className="flex items-center justify-between text-sm font-bold">
            Seu custo mensal
            <span className="font-heading text-brand-green">{BRL.format(gasto)}</span>
          </span>
          <input
            type="range"
            min={500}
            max={20000}
            step={100}
            value={gasto}
            disabled={disabled}
            onChange={(e) => setGasto(Number(e.target.value))}
            className="accent-brand-green"
          />
        </label>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold">Sua renda é</span>
          <div className="flex gap-2">
            {([
              { id: "clt", label: "CLT / estável" },
              { id: "autonomo", label: "Autônoma / variável" },
            ] as const).map((op) => (
              <button
                key={op.id}
                type="button"
                disabled={disabled}
                onClick={() => setVinculo(op.id)}
                className={`flex-1 rounded-xl border-2 border-b-4 px-3 py-2 text-sm font-bold transition-all disabled:cursor-not-allowed ${
                  vinculo === op.id
                    ? "border-brand-green bg-brand-green/15"
                    : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
                }`}
              >
                {op.label}
              </button>
            ))}
          </div>
        </div>

        <label className="flex flex-col gap-1">
          <span className="flex items-center justify-between text-sm font-bold">
            Quanto guarda por mês
            <span className="font-heading text-brand-green">{BRL.format(guardaMes)}</span>
          </span>
          <input
            type="range"
            min={50}
            max={5000}
            step={50}
            value={guardaMes}
            disabled={disabled}
            onChange={(e) => setGuardaMes(Number(e.target.value))}
            className="accent-brand-green"
          />
        </label>
      </div>

      <div className="rounded-2xl border-2 border-brand-green/50 bg-brand-green/10 p-4 text-center">
        <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400">
          Sua reserva ideal ({meses} meses)
        </p>
        <p className="font-heading text-3xl font-extrabold text-brand-green">{BRL.format(meta)}</p>
        <p className="mt-1 text-xs font-semibold text-slate-600 dark:text-slate-300">
          No seu ritmo, você chega lá em ~{tempo} {tempo === 1 ? "mês" : "meses"} 🛡️
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
