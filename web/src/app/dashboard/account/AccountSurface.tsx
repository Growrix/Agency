"use client";

import { UserProfile } from "@clerk/nextjs";
import { AppPreferencesCard } from "@/components/dashboard/AppPreferencesCard";
import { Card } from "@/components/primitives/Card";
import { isClerkConfiguredClient } from "@/lib/clerk-client";

const userProfileAppearance = {
  elements: {
    rootBox: "mx-auto w-full",
    card: "rounded-md border border-border bg-surface shadow-none p-0",
    navbar: "bg-inset/30 border-r border-border/60",
    navbarButton: "text-sm text-text",
    navbarButtonIcon: "text-text-muted",
    pageScrollBox: "p-6",
    headerTitle: "font-display text-xl tracking-tight",
    headerSubtitle: "text-sm text-text-muted",
    formButtonPrimary:
      "bg-primary text-surface hover:bg-primary-hover shadow-[var(--shadow-1)]",
  },
} as const;

export function AccountSurface() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
      <header className="mb-8">
        <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">Account</p>
        <h1 className="mt-1 font-display text-3xl tracking-tight">Profile and preferences</h1>
        <p className="mt-2 max-w-2xl text-sm text-text-muted">
          Identity, password, two-factor, connected accounts, and account deletion are managed by
          Clerk in the panel below. App-specific contact and marketing preferences live in the
          card underneath.
        </p>
      </header>

      <div className="space-y-6">
        {isClerkConfiguredClient() ? (
          <UserProfile
            appearance={userProfileAppearance}
            routing="hash"
          />
        ) : (
          <Card>
            <h2 className="font-display text-lg tracking-tight">Profile</h2>
            <p className="mt-2 text-sm text-text-muted">
              Clerk is not configured in this environment, so the hosted profile panel is
              unavailable. Identity changes happen in production where Clerk is enabled.
            </p>
          </Card>
        )}

        <AppPreferencesCard />
      </div>
    </div>
  );
}
