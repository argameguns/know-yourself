import fs from "node:fs";
import path from "node:path";
import { notFound } from "next/navigation";
import { tests } from "@/lib/testsCatalog";
import type { TestData } from "@/lib/scoring";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/getLocale";
import { QuizClient } from "./QuizClient";

export function generateStaticParams() {
  return tests.map((test) => ({ slug: test.slug }));
}

export default async function TestPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const meta = tests.find((test) => test.slug === slug);
  if (!meta) notFound();

  const locale = await getLocale();
  const dict = await getDictionary(locale);

  const filePath = path.join(process.cwd(), "src/data/tests", locale, `${slug}.json`);
  if (!fs.existsSync(filePath)) notFound();

  const testData = JSON.parse(fs.readFileSync(filePath, "utf8")) as TestData;

  return (
    <QuizClient
      testSlug={slug}
      testName={dict.testNames[slug]}
      testData={testData}
      locale={locale}
      dict={dict.quiz}
    />
  );
}
