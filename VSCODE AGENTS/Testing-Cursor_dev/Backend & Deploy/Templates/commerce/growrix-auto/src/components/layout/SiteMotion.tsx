"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealSelector = "main section, main article, main aside, main form, main [data-motion-card]";

export default function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mainElement = document.querySelector("main");

    if (mainElement instanceof HTMLElement) {
      mainElement.dataset.pageMotion = prefersReducedMotion ? "false" : "true";
    }

    if (prefersReducedMotion) return;

    const revealTargets = Array.from(document.querySelectorAll<HTMLElement>(revealSelector));

    revealTargets.forEach((element, index) => {
      element.setAttribute("data-reveal", "true");

      if (!element.style.getPropertyValue("--reveal-delay")) {
        const revealDelay = Math.min((index % 6) * 70, 350);
        element.style.setProperty("--reveal-delay", `${revealDelay}ms`);
      }
    });

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;

          if (!entry.isIntersecting) return;

          target.classList.add("is-revealed");
          currentObserver.unobserve(target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -10% 0px",
      },
    );

    revealTargets.forEach((element) => observer.observe(element));

    window.requestAnimationFrame(() => {
      revealTargets.slice(0, 2).forEach((element) => {
        element.classList.add("is-revealed");
      });
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
