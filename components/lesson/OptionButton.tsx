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
    default: "border-slate-200 bg-white hover:border-brand-green",
    "selected-correct": "border-brand-green bg-green-50 text-green-700",
    "selected-incorrect": "border-brand-red bg-red-50 text-red-700",
    "correct-reveal": "border-brand-green bg-green-50 text-green-700",
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`w-full rounded-xl border-2 px-4 py-3 text-left font-semibold transition-colors disabled:cursor-not-allowed ${stateClasses[state]}`}
    >
      {label}
    </button>
  );
}
