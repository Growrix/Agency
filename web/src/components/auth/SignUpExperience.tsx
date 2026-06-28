"use client";

import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { ClerkAuthShell, clerkAuthAppearance } from "@/components/auth/ClerkAuthShell";
import { LinkButton } from "@/components/primitives/Button";
import { isClerkConfiguredClient } from "@/lib/clerk-client";

type SignUpExperienceProps = {
  redirectUrl: string;
};

export function SignUpExperience({ redirectUrl }: SignUpExperienceProps) {
  if (!isClerkConfiguredClient()) {
    return (
      <ClerkAuthShell
        title="Sign up unavailable"
        description="Clerk is not configured in this environment. Contact support or configure Clerk keys to enable self-service registration."
      >
        <LinkButton href="/contact">Contact support</LinkButton>
      </ClerkAuthShell>
    );
  }

  return (
    <ClerkAuthShell
      title="Create your account"
      description="Register to manage digital product downloads, order history, and customer support in one place."
    >
      <SignUp forceRedirectUrl={redirectUrl} signInUrl="/sign-in" appearance={clerkAuthAppearance} />
      <p className="mt-6 text-center text-sm text-text-muted">
        Already have an account?{" "}
        <Link href="/sign-in" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </ClerkAuthShell>
  );
}
