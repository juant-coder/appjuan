import type { Unit } from "@/types/content";
import type { LessonProgress } from "@/types/store";
import { isLessonUnlocked } from "@/lib/units";
import LessonNode from "@/components/trail/LessonNode";

const TICKERS = ["📈", "🪙", "💵", "💹", "📊", "💰"];

export default function UnitSection({
  unit,
  progress,
  startIndex,
  nivel,
}: {
  unit: Unit;
  progress: Record<string, LessonProgress>;
  startIndex: number;
  nivel: number;
}) {
  const gridColor = `${unit.cor}14`;

  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-black/5 p-5 pb-10 dark:border-white/5"
      style={{
        backgroundImage: `linear-gradient(165deg, ${unit.cor}2e 0%, ${unit.cor}0a 45%, transparent 100%),
          linear-gradient(${gridColor} 1px, transparent 1px),
          linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
        backgroundSize: "auto, 34px 34px, 34px 34px",
      }}
    >
      {/* Linha de tendência de mercado desenhando no fundo */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full opacity-25"
        viewBox="0 0 400 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0 110 L60 85 L110 95 L170 55 L230 70 L300 30 L400 10"
          fill="none"
          stroke={unit.cor}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="400"
          className="animate-draw-line"
        />
      </svg>

      {/* Tickers do mercado flutuando */}
      {[
        { cls: "left-3 top-16", d: "0s" },
        { cls: "right-4 top-32", d: "1.2s" },
        { cls: "left-6 bottom-24", d: "2.4s" },
        { cls: "right-8 bottom-40", d: "0.6s" },
      ].map((p, i) => (
        <span
          key={i}
          aria-hidden
          className={`pointer-events-none absolute select-none text-3xl opacity-20 animate-rise ${p.cls}`}
          style={{ animationDelay: p.d }}
        >
          {TICKERS[(startIndex + i) % TICKERS.length]}
        </span>
      ))}

      <header className="relative mb-8">
        <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-widest" style={{ color: unit.cor }}>
          <span>
            Missões {startIndex + 1}–{startIndex + unit.licoes.length}
          </span>
          <span className="rounded-full px-2 py-0.5 text-white" style={{ backgroundColor: unit.cor }}>
            Nível {nivel}
          </span>
        </div>
        <h2 className="mt-1 font-heading text-2xl font-extrabold">
          {unit.icone} {unit.titulo}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">{unit.descricao}</p>
      </header>

      <div className="relative flex flex-col items-center gap-10">
        <span
          aria-hidden
          className="absolute inset-y-2 left-1/2 -ml-px border-l-2 border-dashed border-slate-300/70 dark:border-white/10"
        />
        {unit.licoes.map((lesson, i) => {
          const globalIndex = startIndex + i;
          const completed = Boolean(progress[lesson.id]?.completed);
          const unlocked = isLessonUnlocked(lesson.id, progress);
          const state = completed ? "completed" : unlocked ? "current" : "locked";
          return (
            <LessonNode
              key={lesson.id}
              unitId={unit.id}
              lessonId={lesson.id}
              titulo={lesson.titulo}
              state={state}
              color={unit.cor}
              missionNumber={globalIndex + 1}
              offset={Math.round(Math.sin(globalIndex * 1.05) * 46)}
            />
          );
        })}
      </div>
    </section>
  );
}
