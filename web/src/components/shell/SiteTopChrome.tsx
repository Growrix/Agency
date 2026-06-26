"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Header } from "@/components/shell/Header";
import { useTopChromeVisibilityState } from "@/components/shell/TopChromeVisibilityProvider";

export function SiteTopChrome() {
  const pathname = usePathname();
  const heroOverlay = pathname === "/";
  const [scrollY, setScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const chromeVisible = useTopChromeVisibilityState();
  const reduced = useReducedMotion();
  const scrolled = heroOverlay && scrollY > 8;

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const hidden = !mobileOpen && !chromeVisible;

  return (
    <>
      <div
        aria-hidden="true"
        data-testid="site-top-chrome-spacer"
        className="pointer-events-none"
        style={{ height: heroOverlay ? 0 : "var(--site-chrome-height)" }}
      />
      <div
        data-testid="site-top-chrome"
        data-hero-overlay={heroOverlay ? "true" : "false"}
        data-chrome-at-top={heroOverlay && !scrolled ? "true" : "false"}
        data-chrome-hidden={hidden ? "true" : "false"}
        data-chrome-visible={chromeVisible ? "true" : "false"}
        data-mobile-open={mobileOpen ? "true" : "false"}
        className={cn(
          "fixed inset-x-0 top-0 z-50 will-change-transform",
          !reduced && "transition-transform duration-300 ease-signal",
          hidden && "-translate-y-full pointer-events-none",
        )}
      >
        <Header
          mobileOpen={mobileOpen}
          onMobileOpenChange={setMobileOpen}
          scrolled={heroOverlay ? scrolled : undefined}
        />
      </div>
    </>
  );
}