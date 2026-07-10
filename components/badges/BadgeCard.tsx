import type { BadgeDefinition } from "@/types/content";

export default function BadgeCard({
  badge,
  earned,
  earnedAt,
}: {
  badge: BadgeDefinition;
  earned: boolean;
  earnedAt?: string;
}) {
  return (
    <div
      className={`flex flex-col items-center gap-1 rounded-2xl border-2 p-4 text-center ${
        earned
          ? "border-brand-gold bg-amber-50 dark:bg-amber-400/10"
          : "border-slate-200 bg-slate-50 opacity-60 grayscale dark:border-slate-700 dark:bg-slate-800/50"
      }`}
    >
      <span className="text-3xl">{badge.icone}</span>
      <span className="text-sm font-extrabold">{badge.titulo}</span>
      <span className="text-xs text-slate-500 dark:text-slate-400">{badge.descricao}</span>
      {earned && earnedAt && (
        <span className="text-[10px] text-slate-400 dark:text-slate-500">
          {new Date(earnedAt).toLocaleDateString("pt-BR")}
        </span>
      )}
    </div>
  );
}
