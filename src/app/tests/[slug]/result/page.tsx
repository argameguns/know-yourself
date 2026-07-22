import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { tests } from "@/lib/testsCatalog";
import type { TestResult } from "@/lib/scoring";

function NotFoundResult({ slug }: { slug: string }) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-4 px-5 py-24 text-center">
      <h1 className="font-fraunces text-2xl text-ink">Результат не знайдено</h1>
      <p className="text-ink-soft">
        Схоже, це посилання застаріло або результат ще не збережено.
      </p>
      <Link
        href={`/tests/${slug}`}
        className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-pine"
      >
        Пройти тест ще раз
      </Link>
    </div>
  );
}

export default async function ResultPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ attemptId?: string }>;
}) {
  const { slug } = await params;
  const { attemptId } = await searchParams;

  const meta = tests.find((test) => test.slug === slug);
  if (!meta) notFound();

  if (!attemptId) {
    return <NotFoundResult slug={slug} />;
  }

  const attempt = await prisma.attempt.findUnique({
    where: { id: attemptId },
    include: { test: true },
  });

  if (!attempt || attempt.test.slug !== slug) {
    return <NotFoundResult slug={slug} />;
  }

  const result = attempt.result as unknown as TestResult;

  return (
    <div className="mx-auto w-full max-w-3xl flex-1 px-5 py-12 desktop:px-8">
      <div className="mb-10 flex items-center justify-between gap-4">
        <h1 className="font-fraunces text-3xl text-ink">{meta.name}</h1>
        <Link href="/tests" className="text-sm text-ink-soft transition-colors hover:text-ink">
          ← Усі тести
        </Link>
      </div>

      <div className="space-y-6">
        {result.scaleResults.map((scaleResult) => (
          <div key={scaleResult.scaleId} className="rounded-2xl border border-line p-6">
            <div className="mb-3 flex items-center justify-between gap-4">
              <h2 className="font-fraunces text-xl text-ink">{scaleResult.scaleName}</h2>
              <span className="shrink-0 rounded-full bg-pine-soft px-3 py-1 text-xs font-medium text-pine">
                {scaleResult.label} · {Math.round(scaleResult.score)}
              </span>
            </div>
            <p className="whitespace-pre-line text-sm leading-relaxed text-ink-soft">
              {scaleResult.text}
            </p>
          </div>
        ))}
      </div>

      {result.portrait && (
        <div className="mt-10 rounded-2xl bg-ochre-soft p-8">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-ochre">Портрет</p>
          <h2 className="mb-3 font-fraunces text-2xl text-ink">{result.portrait.title}</h2>
          <p className="whitespace-pre-line text-base leading-relaxed text-ink-soft">
            {result.portrait.text}
          </p>
        </div>
      )}

      <div className="mt-10 flex justify-center">
        <Link
          href="/tests"
          className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-pine"
        >
          Пройти інший тест
        </Link>
      </div>
    </div>
  );
}
