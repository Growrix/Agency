"use client";

import { Card } from "@/components/primitives/Card";
import { Container, Section } from "@/components/primitives/Container";

type ClerkAuthShellProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function ClerkAuthShell({ title, description, children }: ClerkAuthShellProps) {
  return (
    <Section className="py-16 sm:py-24">
      <Container width="reading">
        <Card>
          <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Account access</p>
          <h1 className="mt-3 font-display text-4xl tracking-tight">{title}</h1>
          <p className="mt-3 text-sm leading-6 text-text-muted">{description}</p>
          <div className="mt-8">{children}</div>
        </Card>
      </Container>
    </Section>
  );
}

export const clerkAuthAppearance = {
  elements: {
    rootBox: "mx-auto w-full",
    card: "rounded-2xl border border-border bg-surface shadow-none p-0",
  },
} as const;
