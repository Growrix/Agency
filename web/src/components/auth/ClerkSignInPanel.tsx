"use client";

import { SignIn } from "@clerk/nextjs";
import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";
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
    <Section className="py-16 sm:py-24">
      <Container width="reading">
        <Card>
          <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Protected access</p>
          <h1 className="mt-3 font-display text-4xl tracking-tight">{title}</h1>
          <p className="mt-3 text-sm leading-6 text-text-muted">{description}</p>
          <div className="mt-8">
            <SignIn
              forceRedirectUrl={redirectUrl}
              signUpUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL ?? "/dashboard/login"}
              appearance={{
                elements: {
                  rootBox: "mx-auto w-full",
                  card: "rounded-2xl border border-border bg-surface shadow-none p-0",
                },
              }}
            />
          </div>
        </Card>
      </Container>
    </Section>
  );
}
