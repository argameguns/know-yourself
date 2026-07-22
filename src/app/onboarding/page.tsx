import Link from "next/link";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getLocale } from "@/lib/i18n/getLocale";

export default async function OnboardingPage() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center gap-6 px-5 py-24 text-center">
      <h1 className="font-fraunces text-4xl text-ink">
        <span className="italic text-pine">{dict.onboarding.comingSoon}</span>
      </h1>
      <p className="max-w-md text-base text-ink-soft">{dict.onboarding.description}</p>
      <Link
        href="/tests"
        className="inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-pine"
      >
        {dict.onboarding.browseAll}
      </Link>
    </div>
  );
}
