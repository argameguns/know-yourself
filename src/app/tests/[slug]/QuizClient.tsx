"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAnonId } from "@/lib/anonId";
import { getTestResult, questionKey, questionText, type Question, type TestData } from "@/lib/scoring";

interface FlatQuestion {
  scaleId: string;
  key: string;
  text: string;
}

function flattenQuestions(testData: TestData): FlatQuestion[] {
  return testData.scales.flatMap((scale) =>
    (scale.questions ?? []).map((question: Question, index: number) => ({
      scaleId: scale.id,
      key: questionKey(scale.id, question, index),
      text: questionText(question),
    }))
  );
}

const LIKERT_OPTIONS = [1, 2, 3, 4, 5];

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path
        d="M6 6l12 12M18 6 6 18"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function QuizClient({
  testSlug,
  testName,
  testData,
}: {
  testSlug: string;
  testName: string;
  testData: TestData;
}) {
  const router = useRouter();
  const [questions] = useState(() => flattenQuestions(testData));
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = questions.length;
  const current = questions[currentStep];
  const progress = total > 0 ? Math.round((currentStep / total) * 100) : 0;

  async function finish(finalAnswers: Record<string, number>) {
    setSubmitting(true);
    setError(null);

    try {
      const scaleScores: Record<string, number> = {};
      for (const scale of testData.scales) {
        const scaleQuestions = scale.questions ?? [];
        const scaleAnswers = scaleQuestions.map((question, index) => {
          const key = questionKey(scale.id, question, index);
          return finalAnswers[key];
        });
        const sum = scaleAnswers.reduce((acc, value) => acc + value, 0);
        scaleScores[scale.id] = (sum / scaleAnswers.length) * 20;
      }

      const result = await getTestResult(testSlug, scaleScores);
      const anonId = getAnonId();

      const response = await fetch("/api/attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ anonId, testSlug, answers: finalAnswers, result }),
      });

      if (!response.ok) throw new Error("Не вдалося зберегти результат");

      const { id } = (await response.json()) as { id: string };
      router.push(`/tests/${testSlug}/result?attemptId=${id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Щось пішло не так");
      setSubmitting(false);
    }
  }

  function handleExit() {
    if (window.confirm("Прогрес не буде збережено. Вийти?")) {
      router.push("/tests");
    }
  }

  function handleAnswer(value: number) {
    if (!current) return;

    const nextAnswers = { ...answers, [current.key]: value };
    setAnswers(nextAnswers);

    if (currentStep + 1 < total) {
      setCurrentStep(currentStep + 1);
    } else {
      void finish(nextAnswers);
    }
  }

  if (total === 0) {
    return (
      <div className="mx-auto max-w-2xl px-5 py-24 text-center">
        <p className="text-ink-soft">Для цього тесту ще не додано питань.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-5 py-12 desktop:px-8">
      <div className="mb-2 flex items-center justify-between gap-4">
        <p className="text-sm text-ink-soft">{testName}</p>
        {!submitting && (
          <button
            type="button"
            onClick={handleExit}
            aria-label="Вийти з тесту"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-sans text-ink-soft transition-colors hover:bg-ochre-soft hover:text-ochre"
          >
            <CloseIcon />
          </button>
        )}
      </div>

      <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-pine-soft">
        <div
          className="h-full rounded-full bg-pine transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {submitting ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 py-16 text-center">
          <p className="font-fraunces text-xl text-ink">Рахуємо результат…</p>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      ) : (
        <div className="flex flex-1 flex-col justify-center gap-8">
          <div>
            <p className="mb-3 text-xs uppercase tracking-wide text-ink-soft">
              Питання {currentStep + 1} з {total}
            </p>
            <h1 className="font-fraunces text-2xl leading-snug text-ink desktop:text-3xl">
              {current.text}
            </h1>
          </div>

          <div className="flex items-center justify-between gap-2">
            {LIKERT_OPTIONS.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => handleAnswer(value)}
                className="flex h-14 flex-1 items-center justify-center rounded-xl border border-line text-lg font-medium text-ink transition-colors hover:border-pine hover:bg-pine-soft"
              >
                {value}
              </button>
            ))}
          </div>
          <div className="flex justify-between text-xs text-ink-soft">
            <span>Не погоджуюсь</span>
            <span>Повністю погоджуюсь</span>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      )}
    </div>
  );
}
