"use client";

import { useEffect, useMemo, useState } from "react";

function shuffle<T>(arr: T[]): T[] {
  return [...arr]
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

interface Chip {
  id: number;
  text: string;
}

export default function SequenceBuilder({
  banco,
  expectedLength,
  variant,
  disabled,
  onSubmit,
}: {
  banco: string[];
  expectedLength: number;
  /** "palavra": chips inline formando uma frase · "passo": lista vertical numerada */
  variant: "palavra" | "passo";
  disabled: boolean;
  onSubmit: (answer: string[]) => void;
}) {
  const initialBank = useMemo(
    () => shuffle(banco.map((text, id) => ({ id, text }))),
    [banco]
  );

  const [available, setAvailable] = useState<Chip[]>(initialBank);
  const [chosen, setChosen] = useState<Chip[]>([]);

  useEffect(() => {
    setAvailable(initialBank);
    setChosen([]);
  }, [initialBank]);

  function pick(chip: Chip) {
    if (disabled || chosen.length >= expectedLength) return;
    setAvailable((a) => a.filter((c) => c.id !== chip.id));
    setChosen((c) => [...c, chip]);
  }

  function unpick(chip: Chip) {
    if (disabled) return;
    setChosen((c) => c.filter((x) => x.id !== chip.id));
    setAvailable((a) => [...a, chip]);
  }

  const ready = chosen.length === expectedLength;

  return (
    <div className="flex flex-col gap-4">
      <div
        className={`min-h-[3.5rem] rounded-2xl border-2 border-dashed p-3 ${
          variant === "palavra" ? "flex flex-wrap gap-2" : "flex flex-col gap-2"
        } border-slate-300 bg-slate-50 dark:border-slate-600 dark:bg-slate-800/60`}
      >
        {chosen.length === 0 && (
          <span className="text-sm text-slate-400 dark:text-slate-500">
            {variant === "palavra" ? "Toque nas palavras abaixo..." : "Toque nos passos abaixo, na ordem certa..."}
          </span>
        )}
        {chosen.map((chip, i) => (
          <button
            key={chip.id}
            type="button"
            disabled={disabled}
            onClick={() => unpick(chip)}
            className="rounded-xl border-2 border-b-4 border-brand-green bg-brand-green/10 px-3 py-2 text-sm font-semibold text-slate-900 disabled:cursor-not-allowed dark:text-white"
          >
            {variant === "passo" ? `${i + 1}. ${chip.text}` : chip.text}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {available.map((chip) => (
          <button
            key={chip.id}
            type="button"
            disabled={disabled}
            onClick={() => pick(chip)}
            className="rounded-xl border-2 border-b-4 border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition-all hover:border-brand-green disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            {chip.text}
          </button>
        ))}
      </div>

      {!disabled && (
        <button
          type="button"
          disabled={!ready}
          onClick={() => onSubmit(chosen.map((c) => c.text))}
          className="w-full rounded-2xl border-b-4 border-black/25 bg-brand-green py-3 font-extrabold text-white disabled:opacity-40 active:translate-y-0.5"
        >
          RESPONDER
        </button>
      )}
    </div>
  );
}
