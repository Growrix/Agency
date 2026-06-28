"use client";

import { SignIn } from "@clerk/nextjs";
import { ClerkAuthShell, clerkAuthAppearance } from "@/components/auth/ClerkAuthShell";
import { isClerkConfiguredClient } from "@/lib/clerk-client";

type ClerkSignInPanelProps = {
  redirectUrl: string;
  title: string;
  description: string;
  fallback?: React.ReactNode;
};

export function ClerkSignInPanel({ redirectUrl, title, description, fallback }: ClerkSignInPanelProps) {
  if (!isClerkConfiguredClient()) {
    return fallback ?? null;
  }

  return (
    <ClerkAuthShell title={title} description={description}>
      <SignIn
        forceRedirectUrl={redirectUrl}
        signUpUrl="/sign-up"
        appearance={clerkAuthAppearance}
      />
    </ClerkAuthShell>
  );
}
