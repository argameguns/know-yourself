import Link from "next/link";

export default function OnboardingPage() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-6 px-5 py-24 text-center">
      <h1 className="font-fraunces text-4xl text-ink">
        <span className="italic text-pine">Скоро</span>
      </h1>
      <p className="max-w-md text-base text-ink-soft">
        Ми готуємо коротке вступне опитування, яке підбере тести під твої цілі. А поки що можеш
        обрати тест зі списку самостійно.
      </p>
      <Link
        href="/tests"
        className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-pine"
      >
        Переглянути всі тести
      </Link>
    </div>
  );
}
