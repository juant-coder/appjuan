import type { AppState } from "@/types/store";
import { ALL_UNITS, isUnitComplete } from "@/lib/units";

export function evaluateBadges(state: AppState): string[] {
  const newly: string[] = [];
  const has = (id: string) => state.badges.some((b) => b.badgeId === id);

  if (!has("streak-7") && state.streak >= 7) {
    newly.push("streak-7");
  }

  if (!has("perfect-first") && Object.values(state.progress).some((p) => p.perfect)) {
    newly.push("perfect-first");
  }

  for (const unit of ALL_UNITS) {
    const badgeId = `master-${unit.id}`;
    if (!has(badgeId) && isUnitComplete(unit.id, state.progress)) {
      newly.push(badgeId);
    }
  }

  return newly;
}
