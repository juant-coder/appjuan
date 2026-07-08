export default function LessonProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
      <div
        className="h-full rounded-full bg-brand-green transition-all"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
