"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Question } from "@/types/content";
import nivelamentoData from "@/data/nivelamento.json";
import { ALL_UNITS, getSectionStartIndexes } from "@/lib/units";
import { useAppStore } from "@/store/useAppStore";
import QuestionCard from "@/components/lesson/QuestionCard";
import FeedbackBanner from "@/components/lesson/FeedbackBanner";
import LessonProgressBar from "@/components/lesson/LessonProgressBar";

const NIVELAMENTO = (nivelamentoData as { perguntas: Question[] }).perguntas;

const FOCOS = [
  { id: "zero", label: "🐣 Começar do zero" },
  { id: "financas", label: "💰 Organizar minhas finanças" },
  { id: "renda-fixa", label: "🏦 Renda fixa segura" },
  { id: "acoes-fiis", label: "📈 Ações e FIIs" },
  { id: "exterior", label: "🌎 Investir no exterior" },
  { id: "patrimonio", label: "🛡️ Proteger meu patrimônio" },
];

function placementFromScore(score: number): { index: number; label: string } {
  const starts = getSectionStartIndexes();
  if (score <= 1) return { index: starts[0], label: ALL_UNITS[0].titulo };
  if (score <= 3) return { index: starts[1], label: ALL_UNITS[1].titulo };
  if (score === 4) return { index: starts[3], label: ALL_UNITS[3].titulo };
  return { index: starts[4], label: ALL_UNITS[4].titulo };
}

type Step = "foco" | "teste" | "resultado";

export default function OnboardingPage() {
  const router = useRouter();
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);

  const [step, setStep] = useState<Step>("foco");
  const [focus, setFocus] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ correct: boolean; explicacao: string } | null>(null);
  const [correctCount, setCorrectCount] = useState(0);

  function toggleFocus(id: string) {
    setFocus((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  }

  function finish(unlockedUpTo: number) {
    completeOnboarding(focus, unlockedUpTo);
    router.replace("/");
  }

  if (step === "foco") {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-5 p-6">
        <div className="text-center">
          <span className="text-5xl">📈</span>
          <h1 className="mt-2 font-heading text-2xl font-extrabold">Bem-vindo ao Grana+!</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Qual é o seu foco com investimentos? Escolha um ou mais:
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {FOCOS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => toggleFocus(f.id)}
              className={`rounded-2xl border-2 border-b-4 p-3 text-left text-sm font-bold transition-all active:translate-y-0.5 ${
                focus.includes(f.id)
                  ? "border-brand-green bg-brand-green/15"
                  : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          disabled={focus.length === 0}
          onClick={() => setStep("teste")}
          className="w-full rounded-2xl border-b-4 border-black/25 bg-brand-green py-3 font-extrabold text-white disabled:opacity-40 active:translate-y-0.5"
        >
          CONTINUAR
        </button>
        <button
          type="button"
          onClick={() => finish(0)}
          className="text-center text-sm font-bold text-slate-400"
        >
          Pular — quero começar do zero
        </button>
      </div>
    );
  }

  if (step === "resultado") {
    const placement = placementFromScore(correctCount);
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 p-8 text-center">
        <span className="animate-bounce-in text-6xl">🎓</span>
        <h1 className="font-heading text-2xl font-extrabold">Nivelamento concluído!</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Você acertou {correctCount} de {NIVELAMENTO.length}. Seu ponto de partida ideal:
        </p>
        <div className="w-full rounded-3xl border-2 border-brand-green/50 bg-brand-green/10 px-6 py-4">
          <p className="font-heading text-xl font-extrabold text-brand-green">
            Missão {placement.index + 1} · {placement.label}
          </p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Tudo antes disso fica desbloqueado, se quiser revisitar o básico.
          </p>
        </div>
        <button
          type="button"
          onClick={() => finish(placement.index)}
          className="mt-2 w-full rounded-2xl border-b-4 border-black/25 bg-brand-green py-3 font-extrabold text-white active:translate-y-0.5"
        >
          COMEÇAR A TRILHA 🚀
        </button>
      </div>
    );
  }

  const question = NIVELAMENTO[index];
  const isLast = index >= NIVELAMENTO.length - 1;

  function handleAnswer(answer: number | string) {
    if (feedback) return;
    const correct = typeof answer === "number" && answer === question.correta;
    if (correct) setCorrectCount((c) => c + 1);
    setSelectedIndex(typeof answer === "number" ? answer : null);
    setFeedback({ correct, explicacao: question.explicacao });
  }

  function handleContinue() {
    if (isLast) {
      setStep("resultado");
    } else {
      setIndex((i) => i + 1);
      setSelectedIndex(null);
      setFeedback(null);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto flex w-full max-w-md items-center gap-3 p-4">
        <LessonProgressBar current={index + 1} total={NIVELAMENTO.length} />
        <span className="whitespace-nowrap text-xs font-extrabold uppercase text-brand-green">
          Teste de nível
        </span>
      </div>
      <div className="mx-auto w-full max-w-md flex-1 p-4 pb-40">
        <QuestionCard
          question={question}
          selectedIndex={selectedIndex}
          correctIndex={feedback ? question.correta ?? null : null}
          answeredCorrect={feedback ? feedback.correct : null}
          onAnswer={handleAnswer}
        />
      </div>
      {feedback && (
        <FeedbackBanner
          correct={feedback.correct}
          explicacao={feedback.explicacao}
          onContinue={handleContinue}
        />
      )}
    </div>
  );
}
