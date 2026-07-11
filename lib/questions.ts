import type { Question } from "@/types/content";

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function checkAnswer(question: Question, answer: number | string): boolean {
  if (question.tipo === "digite") {
    if (typeof answer !== "string" || !question.resposta) return false;
    const accepted = [question.resposta, ...(question.aceitas ?? [])];
    return accepted.some((a) => normalize(a) === normalize(answer));
  }
  return typeof answer === "number" && answer === question.correta;
}
