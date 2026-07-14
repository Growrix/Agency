"use client";

import { UserProfile } from "@clerk/nextjs";
import { ShieldCheckIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { AppPreferencesCard } from "@/components/dashboard/AppPreferencesCard";
import { Card } from "@/components/primitives/Card";
import {
  DASHBOARD_EYEBROW_CLASS,
  DASHBOARD_PAGE_LEAD_CLASS,
  DASHBOARD_PAGE_TITLE_CLASS,
  DASHBOARD_SECTION_HEADING_CLASS,
} from "@/lib/dashboard-typography";
import { isClerkConfiguredClient } from "@/lib/clerk-client";

const userProfileAppearance = {
  elements: {
    rootBox: "mx-auto w-full max-w-full",
    card: "rounded-md border border-border bg-surface shadow-none p-0 w-full",
    navbar: "bg-inset/30 border-r border-border/60",
    navbarButton: "text-sm text-text",
    navbarButtonIcon: "text-text-muted",
    pageScrollBox: "p-4 sm:p-6",
    headerTitle: "font-display text-lg tracking-tight sm:text-xl",
    headerSubtitle: "text-sm text-text-muted",
    formButtonPrimary: "bg-primary text-surface hover:bg-primary-hover shadow-[var(--shadow-1)]",
  },
} as const;

export function AccountSurface() {
  return (
    <div className="space-y-4 p-4 sm:p-5 lg:p-6">
      <section className="dashboard-hero-surface relative overflow-hidden rounded-md border border-primary/25 p-4 sm:p-6 lg:p-7">
        <div className="dashboard-hero-glow pointer-events-none absolute inset-y-0 right-0 hidden w-2/5 lg:block" aria-hidden />
        <div className="relative grid gap-5 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="min-w-0">
            <p className={DASHBOARD_EYEBROW_CLASS}>Account</p>
            <h1 className={DASHBOARD_PAGE_TITLE_CLASS}>Profile and preferences</h1>
            <p className={DASHBOARD_PAGE_LEAD_CLASS}>
              Identity, password, two-factor authentication, connected accounts, and account deletion are managed by Clerk in the panel below.
            </p>
          </div>

          <div className="hidden lg:flex lg:justify-end">
            <div className="relative flex h-36 w-36 items-center justify-center rounded-4xl border border-primary/25 bg-primary/12 xl:h-44 xl:w-44">
              <UserCircleIcon className="size-16 text-primary xl:size-20" />
              <span className="absolute -bottom-2 -right-2 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/25 bg-primary/12 xl:h-14 xl:w-14">
                <ShieldCheckIcon className="size-6 text-primary xl:size-7" />
              </span>
              <span className="pointer-events-none absolute -inset-6 rounded-[2.5rem] border border-primary/15" aria-hidden />
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[16rem_1fr]">
        <Card className="dashboard-panel-surface rounded-sm border-border/65 p-4 sm:p-5" hoverable={false}>
          <p className={DASHBOARD_SECTION_HEADING_CLASS}>Account</p>
          <p className="mt-1 text-sm text-text-muted">Manage your account info.</p>

          <div className="mt-5 space-y-2 sm:mt-6">
            <div className="flex items-center gap-2 rounded-sm border border-primary/35 bg-primary/12 px-3 py-2 text-sm text-text sm:text-base">
              <UserCircleIcon className="size-4 shrink-0 text-primary sm:size-5" />
              <span>Profile</span>
            </div>
            <div className="flex items-center gap-2 rounded-sm border border-border/55 bg-surface/20 px-3 py-2 text-sm text-text-muted sm:text-base">
              <ShieldCheckIcon className="size-4 shrink-0 sm:size-5" />
              <span>Security</span>
            </div>
          </div>

          <div className="mt-8 rounded-sm border border-border/50 bg-surface/20 px-3 py-2 sm:mt-10">
            <p className="text-xs text-text-muted sm:text-sm">Secured by Clerk</p>
            <p className="text-xs text-warning sm:text-sm">Development mode</p>
          </div>
        </Card>

        <Card className="dashboard-panel-surface min-w-0 overflow-hidden rounded-sm border-border/65 p-0" hoverable={false}>
          <div className="border-b border-border/55 px-4 py-3 sm:px-5 sm:py-4">
            <h2 className={DASHBOARD_SECTION_HEADING_CLASS}>Profile details</h2>
          </div>

          <div className="overflow-x-auto p-4 sm:p-5">
            {isClerkConfiguredClient() ? (
              <UserProfile appearance={userProfileAppearance} routing="hash" />
            ) : (
              <Card>
                <h2 className="font-display text-lg tracking-tight">Profile</h2>
                <p className="mt-2 text-sm text-text-muted">
                  Clerk is not configured in this environment, so the hosted profile panel is unavailable. Identity changes happen in production where Clerk is enabled.
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
