"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  GA_MEASUREMENT_ID,
  gaConsentGranted,
  isGaConfigured,
  readStoredAnalyticsConsent,
} from "@/lib/analytics";

/** Mount GA4 after window load + idle so gtag does not count toward domcontentloaded. */
export function GoogleAnalytics() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!isGaConfigured()) {
      return;
    }

    let cancelled = false;
    let idleHandle: number | undefined;

    const scheduleMount = () => {
      const requestIdle =
        window.requestIdleCallback ??
        ((callback: IdleRequestCallback) =>
          window.setTimeout(() => callback({ didTimeout: true, timeRemaining: () => 0 }), 1));

      idleHandle = requestIdle(
        () => {
          if (!cancelled) {
            setMounted(true);
          }
        },
        { timeout: 2000 },
      ) as number;
    };

    if (document.readyState === "complete") {
      scheduleMount();
    } else {
      window.addEventListener("load", scheduleMount, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", scheduleMount);
      if (idleHandle !== undefined) {
        const cancelIdle = window.cancelIdleCallback ?? window.clearTimeout;
        cancelIdle(idleHandle);
      }
    };
  }, []);

  if (!mounted || !isGaConfigured()) {
    return null;
  }

  const initScript = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500
    });
    gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: true });
  `;

  return (
    <>
      <Script id="ga4-gtag-init" strategy="lazyOnload">
        {initScript}
      </Script>
      <Script
        id="ga4-gtag-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="lazyOnload"
        onLoad={() => {
          if (readStoredAnalyticsConsent() === "granted") {
            gaConsentGranted();
          }
        }}
      />
    </>
  );
}
