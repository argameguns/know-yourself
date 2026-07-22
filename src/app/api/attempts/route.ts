import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { TestResult } from "@/lib/scoring";

interface AttemptPayload {
  anonId: string;
  testSlug: string;
  answers: Record<string, number>;
  result: TestResult;
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as Partial<AttemptPayload>;
  const { anonId, testSlug, answers, result } = body;

  if (!anonId || !testSlug || !answers || !result) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Attempt.testId is a FK to Test.id, but Test rows aren't seeded from the
  // content JSON yet — upsert a minimal Test row by slug so the FK resolves.
  const test = await prisma.test.upsert({
    where: { slug: testSlug },
    update: {},
    create: {
      slug: testSlug,
      title: testSlug,
      category: "unknown",
      description: "",
      scaleInfo: {},
      goalTags: "[]",
      questionCount: Object.keys(answers).length,
    },
  });

  const attempt = await prisma.attempt.create({
    data: {
      anonId,
      testId: test.id,
      answers,
      result: result as object,
    },
  });

  return NextResponse.json({ id: attempt.id });
}
