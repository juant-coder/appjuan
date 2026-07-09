"use client";

import { ALL_UNITS } from "@/lib/units";
import { useAppStore } from "@/store/useAppStore";
import UnitSection from "@/components/trail/UnitSection";

export default function TrailMap() {
  const progress = useAppStore((s) => s.progress);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 p-4">
      {ALL_UNITS.map((unit) => (
        <UnitSection key={unit.id} unit={unit} progress={progress} />
      ))}
    </div>
  );
}
