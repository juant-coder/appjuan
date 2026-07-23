/**
 * escolha (padrão): múltipla escolha · digite: responder digitando ·
 * parear: ligar termos à definição · montar-frase: montar frase com banco de palavras ·
 * ordenar: colocar passos na ordem certa · decisao: simulação de decisão (sem certo/errado) ·
 * calculadora: ferramenta interativa (juros compostos, reserva de emergência)
 */
export type QuestionType =
  | "escolha"
  | "digite"
  | "parear"
  | "montar-frase"
  | "ordenar"
  | "decisao"
  | "calculadora";

/** Resposta possível para uma pergunta, conforme o tipo. */
export type Answer = number | string | string[];

export interface ParDefinicao {
  esquerda: string;
  direita: string;
}

export interface DecisaoOpcao {
  texto: string;
  /** Reflexão mostrada após escolher essa opção — não existe "certo/errado" aqui. */
  reflexao: string;
}

export interface Question {
  pergunta: string;
  tipo?: QuestionType;
  /** Texto de cenário/estudo de caso exibido antes da pergunta */
  cenario?: string;
  opcoes?: string[];
  correta?: number;
  /** Resposta esperada quando tipo === "digite" */
  resposta?: string;
  /** Variações aceitas da resposta digitada */
  aceitas?: string[];
  /** tipo === "parear": pares termo/definição a ligar */
  pares?: ParDefinicao[];
  /** tipo === "montar-frase": banco de palavras (com distratoras) exibido embaralhado */
  banco?: string[];
  /** tipo === "montar-frase": sequência correta de palavras */
  respostaFrase?: string[];
  /** tipo === "ordenar": passos na ordem correta (exibidos embaralhados) */
  passos?: string[];
  /** tipo === "decisao": opções da simulação, cada uma com sua própria reflexão */
  escolhas?: DecisaoOpcao[];
  /** tipo === "calculadora": qual ferramenta interativa exibir */
  calculadora?: "juros-compostos" | "reserva-emergencia";
  explicacao: string;
}

export interface Lesson {
  id: string;
  titulo: string;
  perguntas: Question[];
}

export interface Unit {
  id: string;
  titulo: string;
  descricao: string;
  icone: string;
  cor: string;
  licoes: Lesson[];
}

export interface BadgeDefinition {
  id: string;
  titulo: string;
  descricao: string;
  icone: string;
}
