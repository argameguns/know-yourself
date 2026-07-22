import Link from "next/link";
import {
  categories,
  categoryColor,
  categoryLabel,
  tests,
  type Category,
} from "@/lib/testsCatalog";

function isCategory(value: string | undefined): value is Category {
  return value !== undefined && categories.some((cat) => cat.id === value);
}

export default async function TestsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory = isCategory(category) ? category : null;

  const visibleTests = activeCategory
    ? tests.filter((test) => test.category === activeCategory)
    : tests;

  return (
    <div className="mx-auto w-full max-w-5xl flex-1 px-5 py-12 desktop:px-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="font-fraunces text-3xl text-ink">Усі тести</h1>
        <Link href="/" className="text-sm text-ink-soft transition-colors hover:text-ink">
          ← На головну
        </Link>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <Link
          href="/tests"
          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            activeCategory === null
              ? "border-ink bg-ink text-paper"
              : "border-line text-ink-soft hover:border-ink hover:text-ink"
          }`}
        >
          Усі
        </Link>
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <Link
              key={cat.id}
              href={`/tests?category=${cat.id}`}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? categoryColor[cat.id] === "pine"
                    ? "border-pine bg-pine text-paper"
                    : "border-ochre bg-ochre text-paper"
                  : "border-line text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              {cat.name}
            </Link>
          );
        })}
      </div>

      <ol className="divide-y divide-line border-y border-line">
        {visibleTests.map((test) => {
          const originalIndex = tests.findIndex((t) => t.slug === test.slug);
          const color = categoryColor[test.category];
          return (
            <li key={test.slug}>
              <Link
                href={`/tests/${test.slug}`}
                className="flex items-center gap-4 py-4 transition-colors hover:bg-pine-soft/40"
              >
                <span className="w-8 shrink-0 font-fraunces text-sm text-ink-soft">
                  {String(originalIndex + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-fraunces text-base text-ink">{test.name}</span>
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                    color === "pine" ? "bg-pine-soft text-pine" : "bg-ochre-soft text-ochre"
                  }`}
                >
                  {categoryLabel[test.category]}
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      {visibleTests.length === 0 && (
        <p className="py-8 text-center text-sm text-ink-soft">
          У цій категорії поки немає тестів.
        </p>
      )}
    </div>
  );
}
