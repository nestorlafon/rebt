import { createClient } from "@/lib/supabase/server";
import QuizRunner from "./QuizRunner";

export const dynamic = "force-dynamic";

export default async function QuizPage() {
  const supabase = await createClient();
  const { data: questions, error } = await supabase
    .from("quiz_questions")
    .select("*")
    .limit(20);

  if (error) {
    return (
      <div className="rounded-xl border border-amber-500/30 bg-slate-900/50 p-8">
        <p className="text-slate-400">
          Configura Supabase para acceder a los cuestionarios.
        </p>
      </div>
    );
  }

  if (!questions?.length) {
    return (
      <div className="rounded-xl border border-amber-500/30 bg-slate-900/50 p-8">
        <p className="text-slate-400">
          No hay preguntas. Ejecuta el seed SQL para cargar cuestionarios.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Cuestionario REBT</h1>
        <p className="mt-2 text-slate-400">
          Practica con preguntas tipo examen. {questions.length} preguntas
          disponibles.
        </p>
      </div>

      <QuizRunner questions={questions} />
    </div>
  );
}
