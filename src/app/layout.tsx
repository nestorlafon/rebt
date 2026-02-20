import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "REBT - Reglamento Electrotécnico para Baja Tensión | Aprende",
  description:
    "Plataforma interactiva para estudiar el REBT (RD 842/2002) y sus Instrucciones Técnicas Complementarias. Prepárate para ser electricista en España.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${outfit.variable} ${jetbrainsMono.variable} min-h-screen bg-slate-950 text-slate-100 font-sans antialiased`}
      >
        <header className="border-b border-amber-500/20 bg-slate-900/80 backdrop-blur">
          <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-semibold text-amber-400 transition hover:text-amber-300"
            >
              <span className="rounded bg-amber-500/20 px-2 py-0.5 font-mono text-sm text-amber-400">
                REBT
              </span>
              <span className="hidden sm:inline">RD 842/2002</span>
            </Link>
            <div className="flex gap-6">
              <Link
                href="/estudiar"
                className="text-slate-300 transition hover:text-amber-400"
              >
                Estudiar
              </Link>
              <Link
                href="/itc"
                className="text-slate-300 transition hover:text-amber-400"
              >
                ITC-BT
              </Link>
              <Link
                href="/quiz"
                className="text-slate-300 transition hover:text-amber-400"
              >
                Quiz
              </Link>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
