export interface Question {
  pergunta: string;
  /** "escolha" (padrão): múltipla escolha · "digite": responder digitando */
  tipo?: "escolha" | "digite";
  /** Texto de cenário/estudo de caso exibido antes da pergunta */
  cenario?: string;
  opcoes?: string[];
  correta?: number;
  /** Resposta esperada quando tipo === "digite" */
  resposta?: string;
  /** Variações aceitas da resposta digitada */
  aceitas?: string[];
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
