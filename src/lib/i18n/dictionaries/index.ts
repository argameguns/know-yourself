import type { Locale } from "../locales";
import type { Dictionary } from "./types";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  uk: () => import("./uk").then((m) => m.default),
  en: () => import("./en").then((m) => m.default),
  ru: () => import("./ru").then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

export type { Dictionary };
