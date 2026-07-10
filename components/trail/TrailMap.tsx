"use client";

import { ALL_UNITS } from "@/lib/units";
import { useAppStore } from "@/store/useAppStore";
import UnitSection from "@/components/trail/UnitSection";

export default function TrailMap() {
  const progress = useAppStore((s) => s.progress);

  let offset = 0;
  const sections = ALL_UNITS.map((unit) => {
    const section = { unit, startIndex: offset };
    offset += unit.licoes.length;
    return section;
  });

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 pb-28 pt-4">
      {sections.map(({ unit, startIndex }, i) => (
        <UnitSection key={unit.id} unit={unit} progress={progress} startIndex={startIndex} nivel={i + 1} />
      ))}
    </div>
  );
}
