"use client";

import type { DecisaoOpcao } from "@/types/content";

export default function DecisionScenario({
  escolhas,
  selectedIndex,
  disabled,
  onSelect,
}: {
  escolhas: DecisaoOpcao[];
  selectedIndex: number | null;
  disabled: boolean;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      {escolhas.map((opcao, index) => {
        const selected = selectedIndex === index;
        return (
          <button
            key={index}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(index)}
            className={`w-full rounded-2xl border-2 border-b-4 px-4 py-3 text-left font-semibold transition-all disabled:cursor-not-allowed ${
              selected
                ? "border-sky-500 bg-sky-50 text-sky-700 dark:bg-sky-900/40 dark:text-sky-300"
                : "border-slate-200 bg-white hover:border-sky-400 dark:border-slate-700 dark:bg-slate-800"
            }`}
          >
            {opcao.texto}
          </button>
        );
      })}
    </div>
  );
}
