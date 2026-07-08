"use client";

import Link from "next/link";

type NodeState = "locked" | "current" | "completed";

export default function LessonNode({
  unitId,
  lessonId,
  titulo,
  state,
  color,
}: {
  unitId: string;
  lessonId: string;
  titulo: string;
  state: NodeState;
  color: string;
}) {
  const isLocked = state === "locked";

  const circle = (
    <div
      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 text-2xl font-bold shadow-sm transition-transform ${
        isLocked
          ? "border-slate-300 bg-slate-200 text-slate-400"
          : "border-white text-white hover:scale-105"
      }`}
      style={isLocked ? undefined : { backgroundColor: color }}
    >
      {state === "completed" ? "✓" : isLocked ? "🔒" : "▶"}
    </div>
  );

  return (
    <div className="flex items-center gap-4">
      {isLocked ? (
        <div className="cursor-not-allowed opacity-70">{circle}</div>
      ) : (
        <Link href={`/licao/${unitId}/${lessonId}`}>{circle}</Link>
      )}
      <span className={`text-sm font-semibold ${isLocked ? "text-slate-400" : "text-brand-dark"}`}>
        {titulo}
      </span>
    </div>
  );
}
