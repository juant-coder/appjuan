import type { Question } from "@/types/content";
import OptionButton from "@/components/lesson/OptionButton";

export default function QuestionCard({
  question,
  selectedIndex,
  correctIndex,
  onSelect,
}: {
  question: Question;
  selectedIndex: number | null;
  correctIndex: number | null;
  onSelect: (index: number) => void;
}) {
  const answered = selectedIndex !== null;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-heading text-xl font-extrabold text-brand-dark">{question.pergunta}</h1>
      <div className="flex flex-col gap-3">
        {question.opcoes.map((opcao, index) => {
          let state: "default" | "selected-correct" | "selected-incorrect" | "correct-reveal" =
            "default";
          if (answered) {
            if (index === selectedIndex && index === correctIndex) state = "selected-correct";
            else if (index === selectedIndex && index !== correctIndex) state = "selected-incorrect";
            else if (index === correctIndex) state = "correct-reveal";
          }
          return (
            <OptionButton
              key={index}
              label={opcao}
              state={state}
              disabled={answered}
              onClick={() => onSelect(index)}
            />
          );
        })}
      </div>
    </div>
  );
}
