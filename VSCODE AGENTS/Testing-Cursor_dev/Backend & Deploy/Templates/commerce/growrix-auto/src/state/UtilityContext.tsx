"use client";

import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import {
  currencyOptions,
  formatPriceByPreference,
  getLanguageLabel,
  languageOptions,
  normalizeCurrency,
  normalizeLanguage,
  preferenceKeys,
  translate,
  type CurrencyCode,
  type LanguageCode,
} from "@/lib/localization";

type UtilityContextValue = {
  languages: typeof languageOptions;
  currencies: CurrencyCode[];
  selectedLanguage: LanguageCode;
  selectedLanguageLabel: string;
  selectedCurrency: CurrencyCode;
  setLanguage: (language: string) => void;
  setCurrency: (currency: string) => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
  formatPrice: (price: number) => string;
};

const UtilityContext = createContext<UtilityContextValue | null>(null);

type UtilityProviderProps = {
  children: ReactNode;
  initialLanguage?: LanguageCode;
  initialCurrency?: CurrencyCode;
};

function readCookieValue(key: string) {
  if (typeof document === "undefined") return null;

  const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = document.cookie.match(new RegExp(`(?:^|; )${escaped}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function writePreference(key: string, value: string) {
  if (typeof document === "undefined") return;
  localStorage.setItem(key, value);
  document.cookie = `${key}=${encodeURIComponent(value)}; path=/; max-age=2592000; SameSite=Lax`;
}

function readLanguage() {
  if (typeof window === "undefined") return normalizeLanguage(null);
  const fromStorage = localStorage.getItem(preferenceKeys.language);
  const fromCookie = readCookieValue(preferenceKeys.language);
  return normalizeLanguage(fromStorage ?? fromCookie);
}

function readCurrency() {
  if (typeof window === "undefined") return normalizeCurrency(null);
  const fromStorage = localStorage.getItem(preferenceKeys.currency);
  const fromCookie = readCookieValue(preferenceKeys.currency);
  return normalizeCurrency(fromStorage ?? fromCookie);
}

export function UtilityProvider({ children, initialLanguage, initialCurrency }: UtilityProviderProps) {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>(() => normalizeLanguage(initialLanguage ?? readLanguage()));
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>(() => normalizeCurrency(initialCurrency ?? readCurrency()));

  const setLanguage = useCallback((language: string) => {
    const nextLanguage = normalizeLanguage(language);
    setSelectedLanguage(nextLanguage);
    writePreference(preferenceKeys.language, nextLanguage);
    router.refresh();
  }, [router]);

  const setCurrency = useCallback((currency: string) => {
    const nextCurrency = normalizeCurrency(currency);
    setSelectedCurrency(nextCurrency);
    writePreference(preferenceKeys.currency, nextCurrency);
    router.refresh();
  }, [router]);

  const value = useMemo(
    () => ({
      languages: languageOptions,
      currencies: [...currencyOptions],
      selectedLanguage,
      selectedLanguageLabel: getLanguageLabel(selectedLanguage),
      selectedCurrency,
      setLanguage,
      setCurrency,
      t: (key: string, replacements: Record<string, string | number> = {}) => translate(selectedLanguage, key, replacements),
      formatPrice: (price: number) => formatPriceByPreference(price, selectedCurrency, selectedLanguage),
    }),
    [selectedLanguage, selectedCurrency, setLanguage, setCurrency],
  );

  return <UtilityContext.Provider value={value}>{children}</UtilityContext.Provider>;
}

export function useUtility() {
  const context = useContext(UtilityContext);

  if (!context) {
    throw new Error("useUtility must be used within a UtilityProvider");
  }

  return context;
}
