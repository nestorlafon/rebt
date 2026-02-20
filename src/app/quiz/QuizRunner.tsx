"use client";

import { useState, useCallback } from "react";
import type { QuizQuestion } from "@/types/rebt";

interface QuizRunnerProps {
  questions: (QuizQuestion & {
    options: string[] | unknown;
    correct_index: number;
    explanation: string | null;
  })[];
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j]!, arr[i]!];
  }
  return arr;
}

export default function QuizRunner({ questions: rawQuestions }: QuizRunnerProps) {
  const [questions] = useState(() => shuffleArray(rawQuestions));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const question = questions[currentIndex];
  const options: string[] = Array.isArray(question.options)
    ? (question.options as string[])
    : [];

  const handleSelect = useCallback(
    (index: number) => {
      if (showResult) return;
      setSelectedIndex(index);
      setShowResult(true);
      if (index === question.correct_index) {
        setScore((s) => s + 1);
      }
    },
    [showResult, question.correct_index]
  );

  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelectedIndex(null);
      setShowResult(false);
    } else {
      setShowResult(false);
      setSelectedIndex(null);
      setCurrentIndex(0);
      setScore(0);
    }
  }, [currentIndex, questions.length]);

  if (!question) return null;

  const correctIndex = question.correct_index;
  const isLast = currentIndex === questions.length - 1;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-700/50 bg-slate-900/50 p-6 md:p-8">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-mono text-sm text-amber-400">
            Pregunta {currentIndex + 1} / {questions.length}
          </span>
          {showResult && (
            <span
              className={
                selectedIndex === correctIndex
                  ? "text-emerald-400"
                  : "text-rose-400"
              }
            >
              {selectedIndex === correctIndex ? "✓ Correcta" : "✗ Incorrecta"}
            </span>
          )}
        </div>

        <h2 className="text-lg font-medium text-slate-200 md:text-xl">
          {question.question}
        </h2>

        <div className="mt-6 space-y-2">
          {options.map((opt, i) => {
            const isSelected = selectedIndex === i;
            const isCorrect = i === correctIndex;
            const showCorrectness = showResult;

            let btnClass =
              "w-full rounded-lg border px-4 py-3 text-left text-sm font-medium transition ";
            if (showCorrectness) {
              if (isCorrect) {
                btnClass += "border-emerald-500/50 bg-emerald-500/10 text-emerald-300";
              } else if (isSelected && !isCorrect) {
                btnClass += "border-rose-500/50 bg-rose-500/10 text-rose-300";
              } else {
                btnClass += "border-slate-600/50 bg-slate-800/50 text-slate-400";
              }
            } else {
              btnClass +=
                "border-slate-600/50 bg-slate-800/50 text-slate-200 hover:border-amber-500/40 hover:bg-slate-700/50";
            }

            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                disabled={showResult}
                className={btnClass}
              >
                <span className="font-mono text-amber-400/80">{String.fromCharCode(65 + i)}.</span>{" "}
                {opt}
              </button>
            );
          })}
        </div>

        {showResult && question.explanation && (
          <div className="mt-6 rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
            <p className="text-sm font-medium text-amber-400/90">
              Explicación
            </p>
            <p className="mt-1 text-slate-300">{question.explanation}</p>
          </div>
        )}

        {showResult && (
          <div className="mt-6">
            <button
              onClick={handleNext}
              className="rounded-lg bg-amber-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-amber-400"
            >
              {isLast ? "Reiniciar quiz" : "Siguiente"}
            </button>
          </div>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 min-w-[20px] max-w-[40px] rounded-full ${
              i < currentIndex
                ? "bg-emerald-500/50"
                : i === currentIndex
                  ? "bg-amber-500"
                  : "bg-slate-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
