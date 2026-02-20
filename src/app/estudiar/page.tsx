import { createClient } from "@/lib/supabase/server";
import SupabaseConfigNeeded from "@/components/SupabaseConfigNeeded";
import type { RebtSection } from "@/types/rebt";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function EstudiarPage() {
  const supabase = await createClient();
  if (!supabase) {
    return <SupabaseConfigNeeded />;
  }
  const { data: sections, error } = await supabase
    .from("rebt_sections")
    .select("*")
    .order("order", { ascending: true });

  if (error) {
    return <SupabaseConfigNeeded />;
  }

  if (!sections?.length) {
    return <SupabaseConfigNeeded />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Reglamento REBT</h1>
        <p className="mt-2 text-slate-400">
          Artículos y disposiciones del Real Decreto 842/2002
        </p>
      </div>

      <div className="space-y-3">
        {sections.map((section: RebtSection) => (
          <Link
            key={section.id}
            href={`/estudiar/${section.id}`}
            className="block rounded-xl border border-slate-700/50 bg-slate-900/50 p-4 transition hover:border-amber-500/40 hover:bg-slate-800/50"
          >
            <span className="font-mono text-sm text-amber-400">
              {section.code}
            </span>
            <h2 className="mt-1 font-semibold text-slate-200">
              {section.title}
            </h2>
            {section.content && (
              <p className="mt-2 line-clamp-2 text-sm text-slate-400">
                {section.content}
              </p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
