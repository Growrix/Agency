"use client";

import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { ClerkAuthShell, clerkAuthAppearance } from "@/components/auth/ClerkAuthShell";
import { LinkButton } from "@/components/primitives/Button";
import { isClerkConfiguredClient } from "@/lib/clerk-client";

type SignInExperienceProps = {
  redirectUrl: string;
};

export function SignInExperience({ redirectUrl }: SignInExperienceProps) {
  if (!isClerkConfiguredClient()) {
    return (
      <ClerkAuthShell
        title="Sign in unavailable"
        description="Clerk is not configured in this environment. Use the legacy customer login path while developing without Clerk keys."
      >
        <LinkButton href={`/dashboard/login?next=${encodeURIComponent(redirectUrl)}`}>Continue to login</LinkButton>
      </ClerkAuthShell>
    );
  }

  return (
    <ClerkAuthShell
      title="Sign in to your account"
      description="Access downloads, orders, appointments, and support from your customer dashboard."
    >
      <SignIn forceRedirectUrl={redirectUrl} signUpUrl="/sign-up" appearance={clerkAuthAppearance} />
      <p className="mt-6 text-center text-sm text-text-muted">
        Need an account?{" "}
        <Link href="/sign-up" className="font-medium text-primary hover:underline">
          Sign up
        </Link>
      </p>
    </ClerkAuthShell>
  );
}
