"use client";

import { ClerkProvider } from "@clerk/nextjs";
import type { ReactNode } from "react";

type ClerkAppProviderProps = {
  children: ReactNode;
};

export function ClerkAppProvider({ children }: ClerkAppProviderProps) {
  const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    return children;
  }

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      signInUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL ?? "/sign-in"}
      signUpUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL ?? "/sign-up"}
      signInFallbackRedirectUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL ?? "/dashboard"}
      signUpFallbackRedirectUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL ?? "/dashboard"}
    >
      {children}
    </ClerkProvider>
  );
}
