"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTopChromeVisibility } from "@/lib/use-scroll-direction";
import { Header } from "@/components/shell/Header";
import { UtilityRibbon } from "@/components/shell/UtilityRibbon";

export function SiteTopChrome() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const chromeVisible = useTopChromeVisibility();
  const reduced = useReducedMotion();

  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 0);
    return () => window.clearTimeout(id);
  }, []);

  const hidden = !mobileOpen && !chromeVisible;

  return (
    <div
      data-testid="site-top-chrome"
      data-chrome-ready={ready ? "true" : "false"}
      data-chrome-hidden={hidden ? "true" : "false"}
      data-chrome-visible={chromeVisible ? "true" : "false"}
      data-mobile-open={mobileOpen ? "true" : "false"}
      className={cn(
        "sticky top-0 z-50",
        !reduced && "transition-transform duration-300 ease-signal",
        hidden && "-translate-y-full pointer-events-none"
      )}
    >
      <UtilityRibbon />
      <Header mobileOpen={mobileOpen} onMobileOpenChange={setMobileOpen} />
    </div>
  );
}
