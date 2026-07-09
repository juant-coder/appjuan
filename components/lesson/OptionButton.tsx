type OptionState = "default" | "selected-correct" | "selected-incorrect" | "correct-reveal";

export default function OptionButton({
  label,
  state,
  disabled,
  onClick,
}: {
  label: string;
  state: OptionState;
  disabled: boolean;
  onClick: () => void;
}) {
  const stateClasses: Record<OptionState, string> = {
    default:
      "border-slate-200 bg-white hover:border-brand-green dark:border-slate-700 dark:bg-slate-800 active:translate-y-0.5",
    "selected-correct":
      "border-brand-green bg-green-50 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    "selected-incorrect":
      "border-brand-red bg-red-50 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    "correct-reveal":
      "border-brand-green bg-green-50 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`w-full rounded-2xl border-2 border-b-4 px-4 py-3 text-left font-semibold transition-all disabled:cursor-not-allowed ${stateClasses[state]}`}
    >
      {label}
    </button>
  );
}
