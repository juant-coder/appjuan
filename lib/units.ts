import type { Lesson, Unit } from "@/types/content";
import type { LessonProgress } from "@/types/store";
import unidade1 from "@/data/unidade1.json";
import unidade2 from "@/data/unidade2.json";
import unidade3 from "@/data/unidade3.json";
import unidade4 from "@/data/unidade4.json";
import unidade5 from "@/data/unidade5.json";
import unidade6 from "@/data/unidade6.json";
import unidade7 from "@/data/unidade7.json";

export const ALL_UNITS: Unit[] = [
  unidade1,
  unidade6,
  unidade7,
  unidade2,
  unidade3,
  unidade4,
  unidade5,
] as Unit[];

export function getUnit(unitId: string): Unit | undefined {
  return ALL_UNITS.find((u) => u.id === unitId);
}

export function getLesson(unitId: string, lessonId: string): Lesson | undefined {
  return getUnit(unitId)?.licoes.find((l) => l.id === lessonId);
}

export function getAllLessonIdsFlat(): string[] {
  return ALL_UNITS.flatMap((u) => u.licoes.map((l) => l.id));
}

export function isLessonUnlocked(
  lessonId: string,
  progress: Record<string, LessonProgress>,
  unlockedUpTo = 0
): boolean {
  const flat = getAllLessonIdsFlat();
  const index = flat.indexOf(lessonId);
  if (index <= 0 || index <= unlockedUpTo) return true;
  const previousLessonId = flat[index - 1];
  return Boolean(progress[previousLessonId]?.completed);
}

/** Índice global da primeira lição de cada seção, na ordem da trilha. */
export function getSectionStartIndexes(): number[] {
  let acc = 0;
  return ALL_UNITS.map((u) => {
    const start = acc;
    acc += u.licoes.length;
    return start;
  });
}

export function isUnitComplete(unitId: string, progress: Record<string, LessonProgress>): boolean {
  const unit = getUnit(unitId);
  if (!unit) return false;
  return unit.licoes.every((l) => progress[l.id]?.completed);
}
