/**
 * Приклад використання:
 *
 * import { getTestResult } from "@/lib/scoring";
 *
 * const result = await getTestResult("big-five", {
 *   openness: 72,
 *   conscientiousness: 85,
 *   extraversion: 40,
 *   agreeableness: 55,
 *   neuroticism: 30,
 * });
 *
 * result.scaleResults.forEach((r) => {
 *   console.log(`${r.scaleName}: ${r.label}`);
 *   console.log(r.text);
 * });
 *
 * if (result.portrait) {
 *   console.log(result.portrait.title, result.portrait.text);
 * }
 */

interface Band {
  range: [number, number];
  label: string;
  text: string;
}

interface Scale {
  id: string;
  name: string;
  poles?: [string, string];
  bands: Band[];
}

interface Portrait {
  id: string;
  condition: string;
  title: string;
  text: string;
}

interface TestData {
  test: string;
  note?: string;
  scales: Scale[];
  portraits: Portrait[];
}

export interface ScaleResult {
  scaleId: string;
  scaleName: string;
  score: number;
  label: string;
  text: string;
}

export interface TestResult {
  scaleResults: ScaleResult[];
  portrait: Portrait | null;
}

function findBand(scale: Scale, score: number): Band | undefined {
  return scale.bands.find(({ range: [min, max] }) => score >= min && score <= max);
}

function parseConditionPart(
  part: string
): { direction: "high" | "low"; scaleId: string } | null {
  const match = part.trim().match(/^(high|low)\s+(.+)$/i);
  if (!match) return null;

  return { direction: match[1].toLowerCase() as "high" | "low", scaleId: match[2].trim() };
}

function portraitMatches(portrait: Portrait, scaleScores: Record<string, number>): boolean {
  const parts = portrait.condition.split("+").map((part) => part.trim());

  return parts.every((part) => {
    const parsed = parseConditionPart(part);
    if (!parsed) return false;

    const score = scaleScores[parsed.scaleId];
    if (score === undefined) return false;

    return parsed.direction === "high" ? score >= 60 : score <= 40;
  });
}

export async function getTestResult(
  testSlug: string,
  scaleScores: Record<string, number>
): Promise<TestResult> {
  const testData = (
    (await import(`@/data/tests/${testSlug}.json`)) as { default: TestData }
  ).default;

  const scaleResults: ScaleResult[] = Object.entries(scaleScores).flatMap(
    ([scaleId, score]) => {
      const scale = testData.scales.find((s) => s.id === scaleId);
      if (!scale) return [];

      const band = findBand(scale, score);
      if (!band) return [];

      return [
        {
          scaleId: scale.id,
          scaleName: scale.name,
          score,
          label: band.label,
          text: band.text,
        },
      ];
    }
  );

  const portrait = testData.portraits.find((p) => portraitMatches(p, scaleScores)) ?? null;

  return { scaleResults, portrait };
}
