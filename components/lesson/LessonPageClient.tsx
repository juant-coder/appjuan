"use client";

import { useEffect, useState } from "react";
import { getLesson } from "@/lib/units";
import { useAppStore } from "@/store/useAppStore";
import badgesData from "@/data/badges.json";
import type { BadgeDefinition } from "@/types/content";
import QuestionCard from "@/components/lesson/QuestionCard";
import FeedbackBanner from "@/components/lesson/FeedbackBanner";
import LessonProgressBar from "@/components/lesson/LessonProgressBar";
import LessonResult from "@/components/lesson/LessonResult";
import HeartsDisplay from "@/components/hearts/HeartsDisplay";

const BADGE_DEFINITIONS = badgesData as BadgeDefinition[];

type Phase = "playing" | "feedback" | "result" | "failed";

export default function LessonPageClient({
  unitId,
  lessonId,
}: {
  unitId: string;
  lessonId: string;
}) {
  const lesson = getLesson(unitId, lessonId);

  const hearts = useAppStore((s) => s.hearts);
  const currentSession = useAppStore((s) => s.currentSession);
  const startLesson = useAppStore((s) => s.startLesson);
  const answerQuestion = useAppStore((s) => s.answerQuestion);
  const nextQuestion = useAppStore((s) => s.nextQuestion);
  const completeLesson = useAppStore((s) => s.completeLesson);
  const resetSession = useAppStore((s) => s.resetSession);

  const [phase, setPhase] = useState<Phase>("playing");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ correct: boolean; explicacao: string } | null>(null);
  const [result, setResult] = useState<{
    xpEarned: number;
    perfect: boolean;
    correctCount: number;
    incorrectCount: number;
    newBadges: string[];
  } | null>(null);

  useEffect(() => {
    if (useAppStore.getState().hearts > 0) {
      startLesson(unitId, lessonId);
    } else {
      setPhase("failed");
    }
    return () => resetSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unitId, lessonId]);

  if (!lesson) {
    return <div className="p-8 text-center">Lição não encontrada.</div>;
  }

  if (phase === "failed" || (hearts <= 0 && !currentSession && phase !== "result")) {
    return <LessonResult mode="failed" />;
  }

  if (phase === "result" && result) {
    const newBadgeTitles = result.newBadges
      .map((id) => BADGE_DEFINITIONS.find((b) => b.id === id)?.titulo)
      .filter((t): t is string => Boolean(t));
    return (
      <LessonResult
        mode="success"
        xpEarned={result.xpEarned}
        correctCount={result.correctCount}
        incorrectCount={result.incorrectCount}
        perfect={result.perfect}
        newBadgeTitles={newBadgeTitles}
      />
    );
  }

  if (!currentSession) {
    return <div className="p-8 text-center">Carregando lição...</div>;
  }

  const totalQuestions = lesson.perguntas.length;
  const question = lesson.perguntas[currentSession.questionIndex];
  const isLastQuestion = currentSession.questionIndex >= totalQuestions - 1;

  function handleSelect(index: number) {
    if (selectedIndex !== null) return;
    const answer = answerQuestion(index);
    setSelectedIndex(index);
    setFeedback({ correct: answer.correct, explicacao: answer.explicacao });
    setPhase("feedback");
  }

  function handleContinue() {
    const heartsNow = useAppStore.getState().hearts;
    if (heartsNow <= 0) {
      setPhase("failed");
      return;
    }
    if (isLastQuestion) {
      if (!currentSession) return;
      const { correctCount, incorrectCount } = currentSession;
      const lessonResult = completeLesson();
      setResult({
        xpEarned: lessonResult.xpEarned,
        perfect: lessonResult.perfect,
        correctCount,
        incorrectCount,
        newBadges: lessonResult.newBadges,
      });
      setPhase("result");
    } else {
      nextQuestion();
      setSelectedIndex(null);
      setFeedback(null);
      setPhase("playing");
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex items-center gap-4 p-4">
        <LessonProgressBar current={currentSession.questionIndex + 1} total={totalQuestions} />
        <HeartsDisplay />
      </div>
      <div className="mx-auto w-full max-w-2xl flex-1 p-4 pb-28">
        <QuestionCard
          question={question}
          selectedIndex={selectedIndex}
          correctIndex={selectedIndex !== null ? question.correta : null}
          onSelect={handleSelect}
        />
      </div>
      {phase === "feedback" && feedback && (
        <FeedbackBanner
          correct={feedback.correct}
          explicacao={feedback.explicacao}
          onContinue={handleContinue}
        />
      )}
    </div>
  );
}
