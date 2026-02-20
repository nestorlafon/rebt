import { createClient } from "@/lib/supabase/server";
import SupabaseConfigNeeded from "@/components/SupabaseConfigNeeded";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function SectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  if (!supabase) {
    return <SupabaseConfigNeeded />;
  }
  const { data: section, error } = await supabase
    .from("rebt_sections")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !section) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Link
        href="/estudiar"
        className="inline-flex items-center gap-2 text-slate-400 transition hover:text-amber-400"
      >
        ← Volver al reglamento
      </Link>

      <article className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-6 md:p-8">
        <span className="font-mono text-sm text-amber-400">{section.code}</span>
        <h1 className="mt-2 text-2xl font-bold text-white md:text-3xl">
          {section.title}
        </h1>
        {section.content && (
          <div className="mt-6 leading-relaxed text-slate-300">
            <p className="whitespace-pre-wrap">{section.content}</p>
          </div>
        )}
      </article>
    </div>
  );
}
