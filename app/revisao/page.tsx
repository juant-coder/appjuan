"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Answer, Question } from "@/types/content";
import { ALL_UNITS } from "@/lib/units";
import { checkAnswer } from "@/lib/questions";
import { useAppStore } from "@/store/useAppStore";
import QuestionCard from "@/components/lesson/QuestionCard";
import FeedbackBanner from "@/components/lesson/FeedbackBanner";
import LessonProgressBar from "@/components/lesson/LessonProgressBar";

const REVIEW_SIZE = 7;

export default function RevisaoPage() {
  const completeReview = useAppStore((s) => s.completeReview);

  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [index, setIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ correct: boolean; explicacao: string } | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [result, setResult] = useState<{ xpEarned: number; correct: number; total: number } | null>(null);

  useEffect(() => {
    const progress = useAppStore.getState().progress;
    const pool: Question[] = [];
    for (const unit of ALL_UNITS) {
      for (const lesson of unit.licoes) {
        if (progress[lesson.id]?.completed) {
          pool.push(...lesson.perguntas.filter((q) => q.tipo !== "calculadora"));
        }
      }
    }
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, REVIEW_SIZE);
    setQuestions(shuffled);
  }, []);

  if (!questions) {
    return <div className="p-8 text-center">Preparando sua revisão...</div>;
  }

  if (questions.length === 0) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 p-8 text-center">
        <span className="text-5xl">🧐</span>
        <h1 className="font-heading text-xl font-extrabold">Nada para revisar ainda</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Complete sua primeira missão na trilha e depois volte aqui para revisar.
        </p>
        <Link
          href="/"
          className="rounded-2xl border-b-4 border-black/25 bg-brand-green px-6 py-3 font-extrabold text-white active:translate-y-0.5"
        >
          IR PARA A TRILHA
        </Link>
      </div>
    );
  }

  if (result) {
    return (
      <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 p-8 text-center">
        <span className="animate-bounce-in text-6xl">🧠</span>
        <h1 className="font-heading text-2xl font-extrabold">Revisão concluída!</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Você acertou {result.correct} de {result.total} — memória de investidor afiada.
        </p>
        <div className="w-full rounded-3xl border-2 border-brand-gold/50 bg-brand-gold/15 px-6 py-4">
          <p className="font-heading text-4xl font-extrabold text-amber-500">+{result.xpEarned} XP</p>
        </div>
        <Link
          href="/"
          className="mt-2 w-full rounded-2xl border-b-4 border-black/25 bg-brand-green py-3 font-extrabold text-white active:translate-y-0.5"
        >
          VOLTAR PARA A TRILHA
        </Link>
      </div>
    );
  }

  const question = questions[index];
  const isLast = index >= questions.length - 1;

  function handleAnswer(answer: Answer) {
    if (feedback || !questions) return;
    const q = questions[index];
    const correct = checkAnswer(q, answer);
    if (correct) setCorrectCount((c) => c + 1);
    setSelectedIndex(typeof answer === "number" ? answer : null);
    setFeedback({ correct, explicacao: q.explicacao });
  }

  function handleContinue() {
    if (!questions || !feedback) return;
    if (isLast) {
      const finalCorrect = correctCount;
      const xpEarned = completeReview(finalCorrect);
      setResult({ xpEarned, correct: finalCorrect, total: questions.length });
    } else {
      setIndex((i) => i + 1);
      setSelectedIndex(null);
      setFeedback(null);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="mx-auto flex w-full max-w-md items-center gap-3 p-4">
        <Link href="/" aria-label="Sair da revisão" className="text-xl font-extrabold text-slate-400">
          ✕
        </Link>
        <LessonProgressBar current={index + 1} total={questions.length} />
        <span className="text-xs font-extrabold uppercase text-brand-green">Revisão</span>
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
