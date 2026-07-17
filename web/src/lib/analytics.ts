/** Client-side GA4 measurement ID (baked at build time via NEXT_PUBLIC_*). */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";

export const GA_CONSENT_STORAGE_KEY = "growrix-analytics-consent";

export type AnalyticsConsentChoice = "granted" | "essential";

const consentListeners = new Set<() => void>();

export function subscribeToAnalyticsConsent(listener: () => void) {
  consentListeners.add(listener);
  return () => {
    consentListeners.delete(listener);
  };
}

function notifyAnalyticsConsentChange() {
  for (const listener of consentListeners) {
    listener();
  }
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function getGtag() {
  if (typeof window === "undefined") {
    return undefined;
  }
  return window.gtag;
}

/** Consent Mode defaults — analytics denied until the user accepts. */
export function gaConsentDefault() {
  const gtag = getGtag();
  if (!gtag) {
    return;
  }

  gtag("consent", "default", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    wait_for_update: 500,
  });
}

/** Grant analytics storage after explicit user consent. */
export function gaConsentGranted() {
  const gtag = getGtag();
  if (!gtag) {
    return;
  }

  gtag("consent", "update", {
    analytics_storage: "granted",
  });
}

export function trackGaEvent(eventName: string, params?: Record<string, string | number | boolean>) {
  const gtag = getGtag();
  if (!gtag || !GA_MEASUREMENT_ID) {
    return;
  }

  gtag("event", eventName, params);
}

export function readStoredAnalyticsConsent(): AnalyticsConsentChoice | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const value = window.localStorage.getItem(GA_CONSENT_STORAGE_KEY);
    if (value === "granted" || value === "essential") {
      return value;
    }
  } catch {
    return null;
  }

  return null;
}

export function storeAnalyticsConsent(choice: AnalyticsConsentChoice) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(GA_CONSENT_STORAGE_KEY, choice);
    notifyAnalyticsConsentChange();
  } catch {
    // Ignore quota or private-mode failures.
  }
}

export function isGaConfigured() {
  return GA_MEASUREMENT_ID.length > 0;
}
