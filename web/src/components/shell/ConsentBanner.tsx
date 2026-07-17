"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSyncExternalStore } from "react";
import {
  gaConsentGranted,
  isGaConfigured,
  readStoredAnalyticsConsent,
  storeAnalyticsConsent,
  subscribeToAnalyticsConsent,
  type AnalyticsConsentChoice,
} from "@/lib/analytics";

const HIDDEN_PREFIXES = ["/admin", "/dashboard", "/previews"];

function shouldHideBanner(pathname: string) {
  return HIDDEN_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export function ConsentBanner() {
  const pathname = usePathname();
  const storedConsent = useSyncExternalStore(
    subscribeToAnalyticsConsent,
    () => readStoredAnalyticsConsent(),
    () => "essential" satisfies AnalyticsConsentChoice,
  );

  const hidden = !isGaConfigured() || shouldHideBanner(pathname) || storedConsent !== null;

  function resolveChoice(choice: AnalyticsConsentChoice) {
    storeAnalyticsConsent(choice);
    if (choice === "granted") {
      gaConsentGranted();
    }
  }

  if (hidden) {
    return null;
  }

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-100 border-t border-border bg-surface/95 p-4 shadow-lg backdrop-blur-sm sm:p-5"
      role="region"
      aria-label="Cookie and analytics consent"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-text-muted">
          We use essential cookies for site operation and optional Google Analytics to understand traffic and improve
          Growrix OS. You can accept analytics or continue with essential cookies only.{" "}
          <Link href="/legal/privacy" className="font-medium text-primary underline-offset-2 hover:underline">
            Privacy policy
          </Link>
        </p>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center rounded-md border border-border bg-surface px-4 py-2 text-sm font-medium text-text hover:bg-border/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => resolveChoice("essential")}
          >
            Essential only
          </button>
          <button
            type="button"
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-surface hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            onClick={() => resolveChoice("granted")}
          >
            Accept analytics
          </button>
        </div>
      </div>
    </div>
  );
}
