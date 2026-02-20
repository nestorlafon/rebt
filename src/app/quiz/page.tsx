import { createClient } from "@/lib/supabase/server";
import SupabaseConfigNeeded from "@/components/SupabaseConfigNeeded";
import QuizRunner from "./QuizRunner";

export const dynamic = "force-dynamic";

export default async function QuizPage() {
  const supabase = await createClient();
  if (!supabase) {
    return <SupabaseConfigNeeded />;
  }
  const { data: questions, error } = await supabase
    .from("quiz_questions")
    .select("*")
    .limit(20);

  if (error || !questions?.length) {
    return <SupabaseConfigNeeded />;
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
