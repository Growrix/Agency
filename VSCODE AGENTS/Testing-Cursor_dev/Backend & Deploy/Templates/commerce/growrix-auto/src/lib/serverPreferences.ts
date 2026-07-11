import { cookies } from "next/headers";
import {
  formatPriceByPreference,
  normalizeCurrency,
  normalizeLanguage,
  preferenceKeys,
  translate,
  type CurrencyCode,
  type LanguageCode,
} from "@/lib/localization";

export type ServerPreferences = {
  language: LanguageCode;
  currency: CurrencyCode;
  t: (key: string, replacements?: Record<string, string | number>) => string;
  formatPrice: (price: number) => string;
};

export async function getServerPreferences(): Promise<ServerPreferences> {
  const cookieStore = await cookies();
  const language = normalizeLanguage(cookieStore.get(preferenceKeys.language)?.value);
  const currency = normalizeCurrency(cookieStore.get(preferenceKeys.currency)?.value);

  return {
    language,
    currency,
    t: (key, replacements = {}) => translate(language, key, replacements),
    formatPrice: (price: number) => formatPriceByPreference(price, currency, language),
  };
}