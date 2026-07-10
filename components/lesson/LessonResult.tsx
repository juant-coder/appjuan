import Link from "next/link";

const MONEY = ["💵", "🪙", "💸", "📈", "💰"];

function MoneyRain() {
  const pieces = Array.from({ length: 26 }, (_, i) => ({
    left: (i * 37 + 11) % 100,
    delay: (i % 13) * 0.22,
    emoji: MONEY[i % MONEY.length],
    size: 18 + (i % 4) * 6,
  }));
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="absolute top-0 animate-confetti-fall"
          style={{ left: `${p.left}%`, animationDelay: `${p.delay}s`, fontSize: p.size }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}

export default function LessonResult({
  mode,
  xpEarned,
  correctCount,
  incorrectCount,
  perfect,
  newBadgeTitles,
}: {
  mode: "success" | "failed";
  xpEarned?: number;
  correctCount?: number;
  incorrectCount?: number;
  perfect?: boolean;
  newBadgeTitles?: string[];
}) {
  if (mode === "failed") {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 p-8 text-center">
        <span className="animate-bounce-in text-6xl">📉</span>
        <h1 className="font-heading text-2xl font-extrabold">Você ficou sem vidas</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Até os melhores investidores têm dias de baixa. Suas vidas recarregam com o tempo — volte já já!
        </p>
        <Link
          href="/"
          className="mt-2 rounded-2xl border-b-4 border-black/25 bg-brand-green px-6 py-3 font-extrabold text-white active:translate-y-0.5"
        >
          VOLTAR PARA A TRILHA
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 p-8 text-center">
      <MoneyRain />
      <span className="animate-bounce-in text-6xl">🤑</span>
      <h1 className="font-heading text-2xl font-extrabold">Missão concluída!</h1>
      <div className="flex gap-3 text-sm font-bold">
        <span className="rounded-full bg-green-100 px-3 py-1 text-green-700 dark:bg-green-900/50 dark:text-green-300">
          ✓ {correctCount} acertos
        </span>
        <span className="rounded-full bg-red-100 px-3 py-1 text-red-700 dark:bg-red-900/50 dark:text-red-300">
          ✗ {incorrectCount} erros
        </span>
      </div>
      <div className="w-full rounded-3xl border-2 border-brand-gold/50 bg-brand-gold/15 px-6 py-4">
        <p className="font-heading text-4xl font-extrabold text-amber-500">+{xpEarned} XP</p>
        {perfect && (
          <p className="mt-1 text-sm font-extrabold text-amber-500">
            🎯 BÔNUS DE MISSÃO PERFEITA!
          </p>
        )}
      </div>
      {newBadgeTitles && newBadgeTitles.length > 0 && (
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            Nova conquista desbloqueada:
          </p>
          {newBadgeTitles.map((title) => (
            <p key={title} className="animate-bounce-in font-extrabold">
              🏅 {title}
            </p>
          ))}
        </div>
      )}
      <div className="mt-2 flex w-full flex-col gap-3">
        <Link
          href="/"
          className="rounded-2xl border-b-4 border-black/25 bg-brand-green py-3 font-extrabold text-white active:translate-y-0.5"
        >
          PRÓXIMA MISSÃO
        </Link>
        <Link
          href="/perfil"
          className="rounded-2xl border-2 border-b-4 border-slate-300 py-3 font-extrabold text-slate-600 active:translate-y-0.5 dark:border-slate-600 dark:text-slate-300"
        >
          Ver perfil
        </Link>
      </div>
    </div>
  );
}
