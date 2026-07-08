import Link from "next/link";

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
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 p-8 text-center">
        <span className="text-6xl">💔</span>
        <h1 className="font-heading text-2xl font-extrabold text-brand-dark">
          Você ficou sem vidas
        </h1>
        <p className="text-slate-500">
          Espere suas vidas se recarregarem ou volte mais tarde para continuar estudando.
        </p>
        <Link
          href="/"
          className="mt-2 rounded-xl bg-brand-dark px-6 py-3 font-bold text-white"
        >
          Voltar para o início
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 p-8 text-center">
      <span className="text-6xl">🎉</span>
      <h1 className="font-heading text-2xl font-extrabold text-brand-dark">Lição concluída!</h1>
      <div className="flex gap-4 text-sm">
        <span className="rounded-full bg-green-100 px-3 py-1 font-bold text-green-700">
          {correctCount} acertos
        </span>
        <span className="rounded-full bg-red-100 px-3 py-1 font-bold text-red-700">
          {incorrectCount} erros
        </span>
      </div>
      <div className="rounded-2xl bg-brand-gold/20 px-6 py-4">
        <p className="font-heading text-3xl font-extrabold text-amber-700">+{xpEarned} XP</p>
        {perfect && <p className="text-sm font-semibold text-amber-600">Bônus de lição perfeita! ⭐</p>}
      </div>
      {newBadgeTitles && newBadgeTitles.length > 0 && (
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold text-slate-500">Nova conquista desbloqueada:</p>
          {newBadgeTitles.map((title) => (
            <p key={title} className="font-bold text-brand-dark">
              🏅 {title}
            </p>
          ))}
        </div>
      )}
      <div className="mt-2 flex gap-3">
        <Link href="/" className="rounded-xl bg-brand-dark px-5 py-3 font-bold text-white">
          Voltar para o início
        </Link>
        <Link
          href="/perfil"
          className="rounded-xl border-2 border-brand-dark px-5 py-3 font-bold text-brand-dark"
        >
          Ver perfil
        </Link>
      </div>
    </div>
  );
}
