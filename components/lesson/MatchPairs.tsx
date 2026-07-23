"use client";

import { useEffect, useMemo, useState } from "react";
import type { ParDefinicao } from "@/types/content";

function shuffle<T>(arr: T[]): T[] {
  return [...arr]
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

export default function MatchPairs({
  pares,
  disabled,
  onComplete,
}: {
  pares: ParDefinicao[];
  disabled: boolean;
  onComplete: (answer: string[]) => void;
}) {
  const left = useMemo(
    () => shuffle(pares.map((p, idx) => ({ idx, text: p.esquerda }))),
    [pares]
  );
  const right = useMemo(
    () => shuffle(pares.map((p, idx) => ({ idx, text: p.direita }))),
    [pares]
  );

  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);
  const [wrongFlash, setWrongFlash] = useState<{ left: number; right: number } | null>(null);
  const done = matched.size === pares.length;

  useEffect(() => {
    if (!wrongFlash) return;
    const t = setTimeout(() => {
      setWrongFlash(null);
      setSelectedLeft(null);
      setSelectedRight(null);
    }, 500);
    return () => clearTimeout(t);
  }, [wrongFlash]);

  useEffect(() => {
    if (done) onComplete(pares.map((p) => p.direita));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [done]);

  function pickLeft(idx: number) {
    if (disabled || matched.has(idx) || wrongFlash) return;
    if (selectedRight !== null) {
      tryMatch(idx, selectedRight);
    } else {
      setSelectedLeft(idx);
    }
  }

  function pickRight(idx: number) {
    if (disabled || matched.has(idx) || wrongFlash) return;
    if (selectedLeft !== null) {
      tryMatch(selectedLeft, idx);
    } else {
      setSelectedRight(idx);
    }
  }

  function tryMatch(leftIdx: number, rightIdx: number) {
    if (leftIdx === rightIdx) {
      setMatched((m) => new Set(m).add(leftIdx));
      setSelectedLeft(null);
      setSelectedRight(null);
    } else {
      setWrongFlash({ left: leftIdx, right: rightIdx });
    }
  }

  function chipClass(idx: number, selected: boolean) {
    if (matched.has(idx)) {
      return "border-brand-green bg-green-50 text-green-700 dark:bg-green-900/40 dark:text-green-300 cursor-default";
    }
    if (wrongFlash && (wrongFlash.left === idx || wrongFlash.right === idx)) {
      return "border-brand-red bg-red-50 text-red-700 dark:bg-red-900/40 dark:text-red-300";
    }
    if (selected) {
      return "border-brand-green bg-brand-green/10 dark:bg-brand-green/10";
    }
    return "border-slate-200 bg-white hover:border-brand-green dark:border-slate-700 dark:bg-slate-800";
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="flex flex-col gap-2">
        {left.map(({ idx, text }) => (
          <button
            key={`l-${idx}`}
            type="button"
            disabled={disabled || matched.has(idx)}
            onClick={() => pickLeft(idx)}
            className={`rounded-2xl border-2 border-b-4 px-3 py-3 text-left text-sm font-semibold transition-all disabled:cursor-not-allowed ${chipClass(
              idx,
              selectedLeft === idx
            )}`}
          >
            {text}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        {right.map(({ idx, text }) => (
          <button
            key={`r-${idx}`}
            type="button"
            disabled={disabled || matched.has(idx)}
            onClick={() => pickRight(idx)}
            className={`rounded-2xl border-2 border-b-4 px-3 py-3 text-left text-sm font-semibold transition-all disabled:cursor-not-allowed ${chipClass(
              idx,
              selectedRight === idx
            )}`}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}
