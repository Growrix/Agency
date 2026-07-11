"use client";

import { type ReactNode } from "react";
import { CartProvider } from "@/state/CartContext";
import { AuthProvider } from "@/state/AuthContext";
import { SiteShellProvider } from "@/state/SiteShellContext";
import { UtilityProvider } from "@/state/UtilityContext";
import type { CurrencyCode, LanguageCode } from "@/lib/localization";

type AppProvidersProps = {
  children: ReactNode;
  initialLanguage: LanguageCode;
  initialCurrency: CurrencyCode;
};

export default function AppProviders({ children, initialLanguage, initialCurrency }: AppProvidersProps) {
  return (
    <SiteShellProvider>
      <UtilityProvider initialLanguage={initialLanguage} initialCurrency={initialCurrency}>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </UtilityProvider>
    </SiteShellProvider>
  );
}
