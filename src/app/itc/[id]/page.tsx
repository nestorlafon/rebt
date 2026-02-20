import { createClient } from "@/lib/supabase/server";
import SupabaseConfigNeeded from "@/components/SupabaseConfigNeeded";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ItcDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  if (!supabase) {
    return <SupabaseConfigNeeded />;
  }
  const { data: itc, error } = await supabase
    .from("rebt_itc")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !itc) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Link
        href="/itc"
        className="inline-flex items-center gap-2 text-slate-400 transition hover:text-amber-400"
      >
        ← Volver a ITC-BT
      </Link>

      <article className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-6 md:p-8">
        <span className="font-mono text-sm text-amber-400">{itc.code}</span>
        <h1 className="mt-2 text-2xl font-bold text-white md:text-3xl">
          {itc.title}
        </h1>
        {itc.summary && (
          <p className="mt-4 text-slate-400">{itc.summary}</p>
        )}
        {itc.content && (
          <div className="mt-6 leading-relaxed text-slate-300">
            <p className="whitespace-pre-wrap">{itc.content}</p>
          </div>
        )}
      </article>
    </div>
  );
}
