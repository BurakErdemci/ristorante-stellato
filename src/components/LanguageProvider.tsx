"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import { translations, type Locale, type Translations } from "@/i18n";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "tr",
  setLocale: () => {},
  t: translations.tr,
});

const LOCALE_EVENT = "stellato-locale-change";

function isLocale(value: string | null): value is Locale {
  return value !== null && value in translations;
}

function getStoredLocale(): Locale {
  if (typeof window === "undefined") return "tr";
  const stored = localStorage.getItem("locale");
  return isLocale(stored) ? stored : "tr";
}

function subscribeLocale(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(LOCALE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(LOCALE_EVENT, onStoreChange);
  };
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore<Locale>(subscribeLocale, getStoredLocale, () => "tr");

  const setLocale = (newLocale: Locale) => {
    localStorage.setItem("locale", newLocale);
    document.documentElement.lang = newLocale;
    window.dispatchEvent(new Event(LOCALE_EVENT));
  };

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const t = translations[locale];
  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      <div lang={locale}>{children}</div>
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}
