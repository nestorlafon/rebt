import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
          Reglamento Electrotécnico para Baja Tensión
        </h1>
        <p className="mx-auto max-w-2xl text-xl text-slate-400">
          Plataforma interactiva para estudiar el REBT (RD 842/2002) y sus
          Instrucciones Técnicas Complementarias. Prepárate para el examen de
          instalador electricista en España.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <Link
          href="/estudiar"
          className="group rounded-xl border border-amber-500/30 bg-slate-900/50 p-6 transition hover:border-amber-500/60 hover:bg-slate-800/50"
        >
          <div className="mb-3 text-3xl">📖</div>
          <h2 className="mb-2 font-semibold text-amber-400">
            Estudiar Reglamento
          </h2>
          <p className="text-sm text-slate-400">
            Artículos y disposiciones del REBT. Títulos, ámbito de aplicación y
            definiciones.
          </p>
          <span className="mt-4 inline-block text-sm text-amber-400/80 transition group-hover:text-amber-400">
            Comenzar →
          </span>
        </Link>

        <Link
          href="/itc"
          className="group rounded-xl border border-amber-500/30 bg-slate-900/50 p-6 transition hover:border-amber-500/60 hover:bg-slate-800/50"
        >
          <div className="mb-3 text-3xl">⚡</div>
          <h2 className="mb-2 font-semibold text-amber-400">
            Instrucciones Técnicas (ITC-BT)
          </h2>
          <p className="text-sm text-slate-400">
            ITC-BT-01 a ITC-BT-52. Prescripciones para viviendas, baños,
            generadores y más.
          </p>
          <span className="mt-4 inline-block text-sm text-amber-400/80 transition group-hover:text-amber-400">
            Explorar ITCs →
          </span>
        </Link>

        <Link
          href="/quiz"
          className="group rounded-xl border border-amber-500/30 bg-slate-900/50 p-6 transition hover:border-amber-500/60 hover:bg-slate-800/50"
        >
          <div className="mb-3 text-3xl">📝</div>
          <h2 className="mb-2 font-semibold text-amber-400">
            Cuestionarios
          </h2>
          <p className="text-sm text-slate-400">
            Preguntas de práctica tipo examen. Refuerza lo aprendido con
            explicaciones.
          </p>
          <span className="mt-4 inline-block text-sm text-amber-400/80 transition group-hover:text-amber-400">
            Hacer quiz →
          </span>
        </Link>
      </section>

      <section className="rounded-xl border border-slate-700/50 bg-slate-900/30 p-6">
        <h2 className="mb-4 font-semibold text-slate-200">
          ¿Qué es el REBT?
        </h2>
        <p className="text-slate-400 leading-relaxed">
          El Reglamento Electrotécnico para Baja Tensión (REBT), aprobado por el
          Real Decreto 842/2002, es la normativa que regula las instalaciones
          eléctricas de baja tensión en España. Aplica a tensiones de hasta
          1.000 V en corriente alterna y 1.500 V en corriente continua. Las
          Instrucciones Técnicas Complementarias (ITC-BT) desarrollan los
          requisitos específicos para cada tipo de instalación.
        </p>
      </section>
    </div>
  );
}
