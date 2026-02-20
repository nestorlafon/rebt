import { createClient } from "@/lib/supabase/server";
import SupabaseConfigNeeded from "@/components/SupabaseConfigNeeded";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ItcPage() {
  const supabase = await createClient();
  if (!supabase) {
    return <SupabaseConfigNeeded />;
  }
  const { data: itcs, error } = await supabase
    .from("rebt_itc")
    .select("*")
    .order("order", { ascending: true });

  if (error || !itcs?.length) {
    return <SupabaseConfigNeeded />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Instrucciones Técnicas Complementarias (ITC-BT)
        </h1>
        <p className="mt-2 text-slate-400">
          Prescripciones específicas para cada tipo de instalación eléctrica
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {itcs.map((itc) => (
          <Link
            key={itc.id}
            href={`/itc/${itc.id}`}
            className="block rounded-xl border border-slate-700/50 bg-slate-900/50 p-4 transition hover:border-amber-500/40 hover:bg-slate-800/50"
          >
            <span className="font-mono text-sm text-amber-400">{itc.code}</span>
            <h2 className="mt-1 font-semibold text-slate-200">{itc.title}</h2>
            {itc.summary && (
              <p className="mt-2 line-clamp-2 text-sm text-slate-400">
                {itc.summary}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
