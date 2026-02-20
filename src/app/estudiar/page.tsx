import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function EstudiarPage() {
  const supabase = await createClient();
  const { data: sections, error } = await supabase
    .from("rebt_sections")
    .select("*")
    .order("order", { ascending: true });

  if (error) {
    return (
      <div className="rounded-xl border border-amber-500/30 bg-slate-900/50 p-8">
        <h2 className="mb-4 text-xl font-semibold text-amber-400">
          Configuración necesaria
        </h2>
        <p className="text-slate-400">
          Conecta tu proyecto Supabase para ver el contenido del REBT. Crea un
          proyecto en{" "}
          <a
            href="https://supabase.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:underline"
          >
            supabase.com
          </a>
          , ejecuta las migraciones en{" "}
          <code className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-sm">
            supabase/migrations/
          </code>
          , añade{" "}
          <code className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-sm">
            NEXT_PUBLIC_SUPABASE_URL
          </code>{" "}
          y{" "}
          <code className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-sm">
            NEXT_PUBLIC_SUPABASE_ANON_KEY
          </code>{" "}
          a tu .env.local, y ejecuta{" "}
          <code className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-sm">
            supabase db execute -f supabase/seed.sql
          </code>
          .
        </p>
        <p className="mt-4 text-sm text-slate-500">
          Error: {error.message}
        </p>
      </div>
    );
  }

  if (!sections?.length) {
    return (
      <div className="rounded-xl border border-amber-500/30 bg-slate-900/50 p-8">
        <p className="text-slate-400">
          No hay secciones cargadas. Ejecuta el seed:{" "}
          <code className="rounded bg-slate-800 px-1.5 py-0.5 font-mono">
            supabase db execute -f supabase/seed.sql
          </code>
        </p>
      </div>
    );
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
        {sections.map((section) => (
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
