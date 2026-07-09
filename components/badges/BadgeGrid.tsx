"use client";

import badgesData from "@/data/badges.json";
import type { BadgeDefinition } from "@/types/content";
import { useAppStore } from "@/store/useAppStore";
import BadgeCard from "@/components/badges/BadgeCard";

const BADGE_DEFINITIONS = badgesData as BadgeDefinition[];

export default function BadgeGrid() {
  const earnedBadges = useAppStore((s) => s.badges);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {BADGE_DEFINITIONS.map((badge) => {
        const earned = earnedBadges.find((b) => b.badgeId === badge.id);
        return (
          <BadgeCard
            key={badge.id}
            badge={badge}
            earned={Boolean(earned)}
            earnedAt={earned?.earnedAt}
          />
        );
      })}
    </div>
  );
}
