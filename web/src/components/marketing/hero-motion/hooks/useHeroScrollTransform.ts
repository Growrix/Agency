"use client";

import { useEffect } from "react";
import type { HeroMotionTier } from "../hero-motion-config";
import { sendDebugLog } from "@/lib/debug-log";

export function useHeroScrollTransform(
  sectionRef: React.RefObject<HTMLElement | null>,
  tier: HeroMotionTier,
  setScrollProgress: (value: number) => void,
) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || tier === "reduced") {
      return;
    }
    // #region agent log
    sendDebugLog("useHeroScrollTransform.ts:11", "scroll transform effect started", { sectionFound: true, tier }, "A");
    // #endregion

    let killed = false;
    let scrollTriggerCleanup: (() => void) | undefined;

    const run = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (killed || !section) {
        // #region agent log
        sendDebugLog("useHeroScrollTransform.ts:26", "scroll transform run aborted", { killed, sectionFound: !!section }, "A");
        // #endregion
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      // #region agent log
      sendDebugLog("useHeroScrollTransform.ts:30", "gsap scrolltrigger registered", {}, "A");
      // #endregion

      const headline = section.querySelector(".hero-kinetic-headline");
      const showcase = section.querySelector(".hero-showcase-motion");
      const ambient = section.querySelector(".hero-ambient");
      const grid = section.querySelector(".hero-ambient__living-grid");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            // #region agent log
            sendDebugLog("useHeroScrollTransform.ts:43", "scrollProgress update", { progress: self.progress }, "A");
            // #endregion
            section.style.setProperty("--hero-scroll-progress", String(self.progress));
          },
        },
      });

      if (grid) {
        tl.to(grid, { backgroundPosition: "64px 64px", ease: "none" }, 0);
      }

      if (headline) {
        tl.fromTo(
          headline,
          { scale: 1, opacity: 1 },
          { scale: 0.98, opacity: 0, ease: "none" },
          0.55,
        );
      }

      if (showcase) {
        tl.fromTo(
          showcase,
          { rotateX: 0, rotateY: 0, y: 0 },
          { rotateX: -4, rotateY: 6, y: -20, ease: "none" },
          0,
        );
      }

      if (ambient) {
        tl.to(ambient, { scale: 1.08, ease: "none" }, 0.5);
      }

      scrollTriggerCleanup = () => {
        tl.scrollTrigger?.kill();
        tl.kill();
      };
      // #region agent log
      sendDebugLog("useHeroScrollTransform.ts:79", "scroll trigger timeline created", {}, "A");
      // #endregion
    };

    void run();

    return () => {
      killed = true;
      // #region agent log
      sendDebugLog("useHeroScrollTransform.ts:87", "scroll transform effect cleanup", {}, "A");
      // #endregion
      scrollTriggerCleanup?.();
    };
  }, [sectionRef, tier, setScrollProgress]);
}
