export default function FeedbackBanner({
  correct,
  explicacao,
  onContinue,
}: {
  correct: boolean;
  explicacao: string;
  onContinue: () => void;
}) {
  return (
    <div
      className={`fixed inset-x-0 bottom-0 flex flex-col gap-3 border-t-2 p-4 ${
        correct ? "border-brand-green bg-green-50" : "border-brand-red bg-red-50"
      }`}
    >
      <div className="mx-auto w-full max-w-2xl">
        <p className={`font-heading text-lg font-extrabold ${correct ? "text-green-700" : "text-red-700"}`}>
          {correct ? "Certinho! ✅" : "Não foi dessa vez ❌"}
        </p>
        <p className="mt-1 text-sm text-slate-600">{explicacao}</p>
        <button
          type="button"
          onClick={onContinue}
          className={`mt-3 w-full rounded-xl py-3 font-bold text-white ${
            correct ? "bg-brand-green" : "bg-brand-red"
          }`}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
