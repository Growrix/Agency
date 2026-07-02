"use client";

import { UserProfile } from "@clerk/nextjs";
import { ShieldCheckIcon, UserCircleIcon } from "@heroicons/react/24/outline";
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
    <div className="space-y-4 p-4 sm:p-5 lg:p-6">
      <section className="dashboard-hero-surface relative overflow-hidden rounded-md border border-primary/25 p-6 lg:p-7">
        <div className="dashboard-hero-glow pointer-events-none absolute inset-y-0 right-0 hidden w-2/5 lg:block" aria-hidden />
        <div className="relative grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
          <p className="text-xs uppercase tracking-[0.18em] text-primary">Account</p>
          <h1 className="mt-2 max-w-3xl font-display text-5xl leading-tight tracking-tight">Profile and preferences</h1>
          <p className="mt-3 max-w-3xl text-base text-text-muted">
            Identity, password, two-factor authentication, connected accounts, and account deletion are managed by Clerk in the panel below.
          </p>
          </div>

          <div className="hidden lg:flex lg:justify-end">
            <div className="relative flex h-44 w-44 items-center justify-center rounded-4xl border border-primary/25 bg-primary/12">
              <UserCircleIcon className="size-20 text-primary" />
              <span className="absolute -bottom-2 -right-2 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/25 bg-primary/12">
                <ShieldCheckIcon className="size-7 text-primary" />
              </span>
              <span className="pointer-events-none absolute -inset-6 rounded-[2.5rem] border border-primary/15" aria-hidden />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[18rem_1fr]">
        <Card className="dashboard-panel-surface rounded-sm border-border/65 p-5" hoverable={false}>
          <p className="font-display text-3xl tracking-tight">Account</p>
          <p className="mt-1 text-sm text-text-muted">Manage your account info.</p>

          <div className="mt-6 space-y-2">
            <div className="flex items-center gap-2 rounded-sm border border-primary/35 bg-primary/12 px-3 py-2 text-text">
              <UserCircleIcon className="size-5 text-primary" />
              <span className="text-base">Profile</span>
            </div>
            <div className="flex items-center gap-2 rounded-sm border border-border/55 bg-surface/20 px-3 py-2 text-text-muted">
              <ShieldCheckIcon className="size-5" />
              <span className="text-base">Security</span>
            </div>
          </div>

          <div className="mt-16 rounded-sm border border-border/50 bg-surface/20 px-3 py-2">
            <p className="text-sm text-text-muted">Secured by Clerk</p>
            <p className="text-sm text-warning">Development mode</p>
          </div>
        </Card>

        <Card className="dashboard-panel-surface rounded-sm border-border/65 p-0" hoverable={false}>
          <div className="border-b border-border/55 px-5 py-4">
            <h2 className="font-display text-3xl tracking-tight">Profile details</h2>
          </div>

          <div className="p-5">
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
          </div>
        </Card>
      </section>

      <section>
        <AppPreferencesCard />
      </section>
    </div>
  );
}
