export interface Question {
  pergunta: string;
  opcoes: string[];
  correta: number;
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
