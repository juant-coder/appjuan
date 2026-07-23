"use client";

import { useEffect, useState } from "react";
import type { Answer, Question } from "@/types/content";
import OptionButton from "@/components/lesson/OptionButton";
import MatchPairs from "@/components/lesson/MatchPairs";
import SequenceBuilder from "@/components/lesson/SequenceBuilder";
import DecisionScenario from "@/components/lesson/DecisionScenario";
import JurosCompostosCalculator from "@/components/lesson/calculators/JurosCompostosCalculator";
import ReservaEmergenciaCalculator from "@/components/lesson/calculators/ReservaEmergenciaCalculator";

export default function QuestionCard({
  question,
  selectedIndex,
  correctIndex,
  answeredCorrect,
  onAnswer,
}: {
  question: Question;
  selectedIndex: number | null;
  correctIndex: number | null;
  /** null enquanto não respondeu; true/false depois (usado no modo digitar) */
  answeredCorrect: boolean | null;
  onAnswer: (answer: Answer) => void;
}) {
  const [typed, setTyped] = useState("");
  const answered = answeredCorrect !== null;

  useEffect(() => {
    setTyped("");
  }, [question]);

  return (
    <div className="flex flex-col gap-4">
      {question.cenario && (
        <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white/60 p-4 text-sm leading-relaxed text-slate-600 dark:border-slate-600 dark:bg-slate-800/60 dark:text-slate-300">
          <p className="mb-1 text-[11px] font-extrabold uppercase tracking-widest text-brand-green">
            📋 Cenário
          </p>
          {question.cenario}
        </div>
      )}

      <h1 className="font-heading text-xl font-extrabold text-slate-900 dark:text-white">
        {question.pergunta}
      </h1>

      {question.tipo === "digite" ? (
        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            if (!answered && typed.trim()) onAnswer(typed);
          }}
        >
          <input
            type="text"
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            disabled={answered}
            placeholder="Digite sua resposta..."
            autoComplete="off"
            autoCapitalize="off"
            className={`w-full rounded-2xl border-2 border-b-4 px-4 py-3 font-semibold outline-none transition-colors dark:bg-slate-800 ${
              answered
                ? answeredCorrect
                  ? "border-brand-green bg-green-50 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                  : "border-brand-red bg-red-50 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                : "border-slate-200 bg-white focus:border-brand-green dark:border-slate-700"
            }`}
          />
          {!answered && (
            <button
              type="submit"
              disabled={!typed.trim()}
              className="w-full rounded-2xl border-b-4 border-black/25 bg-brand-green py-3 font-extrabold text-white disabled:opacity-40 active:translate-y-0.5"
            >
              RESPONDER
            </button>
          )}
        </form>
      ) : question.tipo === "parear" && question.pares ? (
        <MatchPairs pares={question.pares} disabled={answered} onComplete={onAnswer} />
      ) : question.tipo === "montar-frase" && question.banco && question.respostaFrase ? (
        <SequenceBuilder
          banco={question.banco}
          expectedLength={question.respostaFrase.length}
          variant="palavra"
          disabled={answered}
          onSubmit={onAnswer}
        />
      ) : question.tipo === "ordenar" && question.passos ? (
        <SequenceBuilder
          banco={question.passos}
          expectedLength={question.passos.length}
          variant="passo"
          disabled={answered}
          onSubmit={onAnswer}
        />
      ) : question.tipo === "decisao" && question.escolhas ? (
        <DecisionScenario
          escolhas={question.escolhas}
          selectedIndex={selectedIndex}
          disabled={answered}
          onSelect={onAnswer}
        />
      ) : question.tipo === "calculadora" && question.calculadora === "juros-compostos" ? (
        <JurosCompostosCalculator disabled={answered} onContinue={() => onAnswer("ok")} />
      ) : question.tipo === "calculadora" && question.calculadora === "reserva-emergencia" ? (
        <ReservaEmergenciaCalculator disabled={answered} onContinue={() => onAnswer("ok")} />
      ) : (
        <div className="flex flex-col gap-3">
          {(question.opcoes ?? []).map((opcao, index) => {
            let state: "default" | "selected-correct" | "selected-incorrect" | "correct-reveal" =
              "default";
            if (answered) {
              if (index === selectedIndex && index === correctIndex) state = "selected-correct";
              else if (index === selectedIndex && index !== correctIndex)
                state = "selected-incorrect";
              else if (index === correctIndex) state = "correct-reveal";
            }
            return (
              <OptionButton
                key={index}
                label={opcao}
                state={state}
                disabled={answered}
                onClick={() => onAnswer(index)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
