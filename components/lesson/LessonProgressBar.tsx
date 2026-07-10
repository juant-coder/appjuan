export default function LessonProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="h-4 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
      <div
        className="h-full rounded-full bg-gradient-to-r from-brand-green to-emerald-400 transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
