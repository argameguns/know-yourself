"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { setLocaleCookie } from "@/lib/i18n/setLocaleCookie";
import { locales, localeNames, type Locale } from "@/lib/i18n/locales";

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function switchTo(locale: Locale) {
    if (locale === currentLocale) return;
    setLocaleCookie(locale);
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div
      className="fixed top-4 right-4 z-50 flex items-center gap-1 rounded-full border border-line bg-paper/90 p-1 text-xs shadow-sm backdrop-blur"
      style={{ opacity: isPending ? 0.6 : 1 }}
    >
      {locales.map((locale) => (
        <button
          key={locale}
          type="button"
          onClick={() => switchTo(locale)}
          aria-current={locale === currentLocale}
          className={`rounded-full px-2.5 py-1 font-medium transition-colors ${
            locale === currentLocale
              ? "bg-ink text-paper"
              : "text-ink-soft hover:text-ink"
          }`}
        >
          {localeNames[locale]}
        </button>
      ))}
    </div>
  );
}
