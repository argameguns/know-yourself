export type Locale = "uk" | "en" | "ru";

export const LOCALE_COOKIE = "ky_locale";

export const defaultLocale: Locale = "uk";

export const locales: Locale[] = ["uk", "en", "ru"];

export const localeNames: Record<Locale, string> = {
  uk: "UA",
  en: "EN",
  ru: "RU",
};

export function isLocale(value: string | undefined | null): value is Locale {
  return value !== undefined && value !== null && locales.includes(value as Locale);
}
