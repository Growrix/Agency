"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  GA_MEASUREMENT_ID,
  gaConsentGranted,
  isGaConfigured,
  readStoredAnalyticsConsent,
} from "@/lib/analytics";

/** Mount GA4 after window load so gtag does not count toward domcontentloaded resource budget. */
export function GoogleAnalytics() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!isGaConfigured()) {
      return;
    }

    const enable = () => setMounted(true);
    if (document.readyState === "complete") {
      enable();
      return;
    }

    window.addEventListener("load", enable, { once: true });
    return () => window.removeEventListener("load", enable);
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
      <Script id="ga4-gtag-init" strategy="afterInteractive">
        {initScript}
      </Script>
      <Script
        id="ga4-gtag-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
        onLoad={() => {
          if (readStoredAnalyticsConsent() === "granted") {
            gaConsentGranted();
          }
        }}
      />
    </>
  );
}
