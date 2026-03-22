import tr from "./tr";
import en from "./en";
import it from "./it";
import type { Translations } from "./tr";

export type Locale = "tr" | "en" | "it";

export const locales: Record<Locale, { label: string; flag: string }> = {
  tr: { label: "Türkçe", flag: "🇹🇷" },
  en: { label: "English", flag: "🇬🇧" },
  it: { label: "Italiano", flag: "🇮🇹" },
};

export const translations: Record<Locale, Translations> = { tr, en, it };

export type { Translations };
