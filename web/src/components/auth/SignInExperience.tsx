"use client";

import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { ClerkAuthShell, clerkAuthAppearance } from "@/components/auth/ClerkAuthShell";
import { ClerkLoadGuard } from "@/components/auth/ClerkLoadGuard";
import { LinkButton } from "@/components/primitives/Button";
import { isClerkConfiguredClient } from "@/lib/clerk-client";

type SignInExperienceProps = {
  redirectUrl: string;
};

export function SignInExperience({ redirectUrl }: SignInExperienceProps) {
  const signUpWithNext = `/sign-up?next=${encodeURIComponent(redirectUrl)}`;
  const legacyLoginHref = `/dashboard/login?next=${encodeURIComponent(redirectUrl)}`;

  if (!isClerkConfiguredClient()) {
    return (
      <ClerkAuthShell
        title="Sign in unavailable"
        description="Clerk is not configured in this environment. Use the legacy customer login path while developing without Clerk keys."
      >
        <LinkButton href={legacyLoginHref}>Continue to login</LinkButton>
      </ClerkAuthShell>
    );
  }

  return (
    <ClerkAuthShell
      title="Sign in to your account"
      description="Access downloads, orders, appointments, and support from your customer dashboard."
    >
      <ClerkLoadGuard
        recoveryHref={legacyLoginHref}
        recoveryLabel="Continue to login"
        title="Sign-in is taking longer than expected"
        description="We could not load Clerk on this domain. Retry, or use the alternate login path while we restore authentication."
      >
        <SignIn forceRedirectUrl={redirectUrl} signUpUrl={signUpWithNext} appearance={clerkAuthAppearance} />
        <p className="mt-6 text-center text-sm text-text-muted">
          Need an account?{" "}
          <Link href={signUpWithNext} className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </ClerkLoadGuard>
    </ClerkAuthShell>
  );
}
