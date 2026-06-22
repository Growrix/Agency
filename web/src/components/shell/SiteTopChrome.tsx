"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Header } from "@/components/shell/Header";
import { UtilityRibbon } from "@/components/shell/UtilityRibbon";
import { useTopChromeVisibilityState } from "@/components/shell/TopChromeVisibilityProvider";

export function SiteTopChrome() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const chromeVisible = useTopChromeVisibilityState();
  const reduced = useReducedMotion();

  const hidden = !mobileOpen && !chromeVisible;

  return (
    <>
      {/* Fixed-height spacer — never collapses, so the page does not jump when chrome hides. */}
      <div
        aria-hidden="true"
        data-testid="site-top-chrome-spacer"
        className="pointer-events-none"
        style={{ height: "var(--site-chrome-height)" }}
      />
      <div
        data-testid="site-top-chrome"
        data-chrome-hidden={hidden ? "true" : "false"}
        data-chrome-visible={chromeVisible ? "true" : "false"}
        data-mobile-open={mobileOpen ? "true" : "false"}
        className={cn(
          "fixed inset-x-0 top-0 z-50 will-change-transform",
          !reduced && "transition-transform duration-300 ease-signal",
          hidden && "-translate-y-full pointer-events-none",
        )}
      >
        <UtilityRibbon />
        <Header mobileOpen={mobileOpen} onMobileOpenChange={setMobileOpen} />
      </div>
    </>
  );
}
