import type { Unit } from "@/types/content";
import type { LessonProgress } from "@/types/store";
import { isLessonUnlocked } from "@/lib/units";
import LessonNode from "@/components/trail/LessonNode";

export default function UnitSection({
  unit,
  progress,
}: {
  unit: Unit;
  progress: Record<string, LessonProgress>;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3">
        <span className="text-2xl">{unit.icone}</span>
        <div>
          <h2 className="font-heading text-lg font-extrabold" style={{ color: unit.cor }}>
            {unit.titulo}
          </h2>
          <p className="text-sm text-slate-500">{unit.descricao}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 border-l-2 border-dashed border-slate-200 pl-4">
        {unit.licoes.map((lesson) => {
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
            />
          );
        })}
      </div>
    </section>
  );
}
