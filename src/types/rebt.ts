export interface RebtSection {
  id: string;
  parent_id: string | null;
  code: string;
  title: string;
  content: string | null;
  order: number;
  section_type: "titulo" | "articulo" | "anexo";
}

export interface RebtItc {
  id: string;
  code: string;
  title: string;
  content: string | null;
  summary: string | null;
  order: number;
}

export interface QuizQuestion {
  id: string;
  section_id: string | null;
  itc_id: string | null;
  question: string;
  options: string[];
  correct_index: number;
  explanation: string | null;
  difficulty: "facil" | "medio" | "dificil";
}
