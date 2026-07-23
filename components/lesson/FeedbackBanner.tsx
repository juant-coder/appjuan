export default function FeedbackBanner({
  correct,
  explicacao,
  respostaCerta,
  reflexao,
  onContinue,
}: {
  correct: boolean;
  explicacao: string;
  respostaCerta?: string;
  /** Presente numa simulação de decisão: mostra estilo neutro, sem certo/errado */
  reflexao?: string;
  onContinue: () => void;
}) {
  const neutral = Boolean(reflexao);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 rounded-t-3xl border-t-2 p-4 ${
        neutral
          ? "border-sky-400 bg-sky-50 dark:bg-sky-950"
          : correct
            ? "border-brand-green bg-green-50 dark:bg-green-950"
            : "border-brand-red bg-red-50 dark:bg-red-950"
      }`}
      style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto w-full max-w-md">
        <p
          className={`font-heading text-lg font-extrabold ${
            neutral
              ? "text-sky-700 dark:text-sky-300"
              : correct
                ? "text-green-700 dark:text-green-300"
                : "text-red-700 dark:text-red-300"
          }`}
        >
          {neutral ? "Ponto de vista 💭" : correct ? "Lucro na conta! 📈" : "O mercado caiu... 📉"}
        </p>
        {!correct && !neutral && respostaCerta && (
          <p className="mt-1 text-sm font-extrabold text-red-700 dark:text-red-300">
            Resposta certa: {respostaCerta}
          </p>
        )}
        {neutral && (
          <p className="mt-1 text-sm font-semibold text-sky-700 dark:text-sky-300">{reflexao}</p>
        )}
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{explicacao}</p>
        <button
          type="button"
          onClick={onContinue}
          className={`mt-3 w-full rounded-2xl border-b-4 border-black/25 py-3 font-extrabold text-white active:translate-y-0.5 ${
            neutral ? "bg-sky-500" : correct ? "bg-brand-green" : "bg-brand-red"
          }`}
        >
          CONTINUAR
        </button>
      </div>
    </div>
  );
}
