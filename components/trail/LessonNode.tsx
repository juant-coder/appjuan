"use client";

import Link from "next/link";

type NodeState = "locked" | "current" | "completed";

export default function LessonNode({
  unitId,
  lessonId,
  titulo,
  state,
  color,
  missionNumber,
  offset,
}: {
  unitId: string;
  lessonId: string;
  titulo: string;
  state: NodeState;
  color: string;
  missionNumber: number;
  offset: number;
}) {
  const locked = state === "locked";

  const node = (
    <div className="relative flex flex-col items-center" style={{ transform: `translateX(${offset}px)` }}>
      {state === "current" && (
        <span
          className="absolute -top-9 z-10 animate-bounce rounded-xl bg-white px-3 py-1 text-xs font-extrabold shadow-md dark:bg-slate-800"
          style={{ color }}
        >
          COMEÇAR
        </span>
      )}
      <div
        className={`relative flex h-20 w-20 items-center justify-center rounded-full border-b-8 text-2xl font-extrabold transition-all ${
          locked
            ? "border-black/10 bg-slate-300 text-slate-500 dark:border-black/30 dark:bg-slate-700 dark:text-slate-400"
            : "border-black/25 text-white active:translate-y-1 active:border-b-4"
        } ${state === "current" ? "animate-pulse-ring" : ""}`}
        style={locked ? undefined : { backgroundColor: color }}
      >
        {locked ? "🔒" : missionNumber}
        {state === "completed" && (
          <span className="absolute -right-1.5 -top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-brand-gold text-sm shadow">
            ⭐
          </span>
        )}
      </div>
      <span
        className={`mt-2 max-w-[9.5rem] text-center text-xs font-bold leading-tight ${
          locked ? "text-slate-400 dark:text-slate-500" : "text-slate-700 dark:text-slate-200"
        }`}
      >
        {titulo}
      </span>
    </div>
  );

  if (locked) {
    return <div className="cursor-not-allowed opacity-80">{node}</div>;
  }
  return <Link href={`/licao/${unitId}/${lessonId}`}>{node}</Link>;
}
