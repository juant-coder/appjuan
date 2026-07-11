"use client";

import { ALL_UNITS, getAllLessonIdsFlat, isLessonUnlocked } from "@/lib/units";
import { useAppStore } from "@/store/useAppStore";
import UnitSection from "@/components/trail/UnitSection";

export default function TrailMap() {
  const progress = useAppStore((s) => s.progress);
  const unlockedUpTo = useAppStore((s) => s.unlockedUpTo);

  let offset = 0;
  const sections = ALL_UNITS.map((unit) => {
    const section = { unit, startIndex: offset };
    offset += unit.licoes.length;
    return section;
  });

  // Missão em destaque: a recomendada pelo nivelamento, ou a primeira
  // desbloqueada ainda não concluída.
  const flat = getAllLessonIdsFlat();
  let highlightIndex = -1;
  for (let i = unlockedUpTo; i < flat.length; i++) {
    if (!progress[flat[i]]?.completed && isLessonUnlocked(flat[i], progress, unlockedUpTo)) {
      highlightIndex = i;
      break;
    }
  }
  if (highlightIndex === -1) {
    for (let i = 0; i < flat.length; i++) {
      if (!progress[flat[i]]?.completed && isLessonUnlocked(flat[i], progress, unlockedUpTo)) {
        highlightIndex = i;
        break;
      }
    }
  }

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 pb-28 pt-4">
      {sections.map(({ unit, startIndex }, i) => (
        <UnitSection
          key={unit.id}
          unit={unit}
          progress={progress}
          startIndex={startIndex}
          nivel={i + 1}
          unlockedUpTo={unlockedUpTo}
          highlightIndex={highlightIndex}
        />
      ))}
    </div>
  );
}
