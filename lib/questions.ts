import type { Answer, Question } from "@/types/content";

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function sameSequence(answer: unknown, expected: string[] | undefined): boolean {
  if (!Array.isArray(answer) || !expected) return false;
  return answer.length === expected.length && answer.every((w, i) => w === expected[i]);
}

export function checkAnswer(question: Question, answer: Answer): boolean {
  switch (question.tipo) {
    case "digite": {
      if (typeof answer !== "string" || !question.resposta) return false;
      const accepted = [question.resposta, ...(question.aceitas ?? [])];
      return accepted.some((a) => normalize(a) === normalize(answer));
    }
    case "montar-frase":
      return sameSequence(answer, question.respostaFrase);
    case "ordenar":
      return sameSequence(answer, question.passos);
    case "parear":
      return (
        Array.isArray(answer) &&
        !!question.pares &&
        question.pares.every((p, i) => answer[i] === p.direita)
      );
    case "decisao":
    case "calculadora":
      // Sem certo/errado: o valor est\u00e1 em refletir ou usar a ferramenta, n\u00e3o em acertar.
      return true;
    default:
      return typeof answer === "number" && answer === question.correta;
  }
}
