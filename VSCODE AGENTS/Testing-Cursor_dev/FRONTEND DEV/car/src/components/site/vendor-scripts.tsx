"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

type SwiperVariant = "style-1" | "style-2" | "style-3";

type SwiperOptions = {
  autoplay: { delay: number; disableOnInteraction: boolean };
  loop?: boolean;
  effect: "fade" | "slide";
  slidesPerView?: number;
  speed?: number;
  mousewheel?: boolean;
  watchSlidesProgress?: boolean;
  parallax?: boolean;
  spaceBetween: number;
  pagination: { el: string | false; clickable?: boolean; type?: "fraction" };
  navigation: { nextEl: string; prevEl: string };
};

type SwiperInstance = {
  destroy?: (deleteInstance?: boolean, cleanStyles?: boolean) => void;
};

type SwiperConstructor = new (selector: string, options: SwiperOptions) => SwiperInstance;

type JQueryCollection = {
  jarallax?: () => void;
  twentytwenty?: (options?: Record<string, unknown>) => void;
};

type JQueryFunction = (selector: string) => JQueryCollection;

declare global {
  interface Window {
    jQuery?: JQueryFunction;
    $?: JQueryFunction;
    WOW?: new () => { init: () => void };
    Swiper?: SwiperConstructor;
    jarallax?: unknown;
  }
}

function resolveSwiperVariant(pathname: string): SwiperVariant | null {
  if (pathname === "/" || /^\/homepage-[2-8]$/.test(pathname)) {
    return "style-3";
  }

  if (pathname === "/gallery-slider") {
    return "style-2";
  }

  if (pathname.startsWith("/services/")) {
    return "style-1";
  }

  return null;
}

const SWIPER_OPTIONS_BY_VARIANT: Record<SwiperVariant, SwiperOptions> = {
  "style-1": {
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    spaceBetween: 30,
    effect: "fade",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: false,
      clickable: false,
    },
  },
  "style-2": {
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true,
    spaceBetween: 30,
    effect: "fade",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: false,
      clickable: false,
    },
  },
  "style-3": {
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    effect: "slide",
    slidesPerView: 1,
    loop: true,
    speed: 1200,
    mousewheel: false,
    watchSlidesProgress: true,
    parallax: true,
    spaceBetween: -1,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  },
};

/**
 * VendorScripts mirrors the script contract from the Car-subdomain baseline
 * (pixel-perfect SOT). Scripts must load in the exact order used by the
 * baseline index.html so that jQuery → plugins → designesia → phase2-flows →
 * swiper → custom-swiper init in dependency order.
 *
 * It also re-runs the most critical re-initializers on client-side route
 * changes so animations and the slider keep working when navigating between
 * App Router pages.
 */
export function VendorScripts() {
  const pathname = usePathname();
  const swiperInstanceRef = useRef<SwiperInstance | null>(null);
  const swiperVariant = resolveSwiperVariant(pathname);

  useEffect(() => {
    // Re-initialize visual runtimes on client-side navigation.
    if (typeof window === "undefined") return;

    try {
      if (typeof window.WOW === "function") {
        new window.WOW().init();
      }
    } catch {
      // ignore
    }

    try {
      const jq = window.jQuery;
      if (typeof jq === "function") {
        jq(".jarallax")?.jarallax?.();

        if (document.querySelector(".twentytwenty-container")) {
          jq(".twentytwenty-container")?.twentytwenty?.();
        }
      }
    } catch {
      // ignore
    }

    try {
      if (swiperInstanceRef.current?.destroy) {
        swiperInstanceRef.current.destroy(true, true);
        swiperInstanceRef.current = null;
      }

      const SwiperCtor = window.Swiper;
      const hasSwiperTarget = !!document.querySelector(".swiper");

      if (typeof SwiperCtor === "function" && hasSwiperTarget && swiperVariant) {
        swiperInstanceRef.current = new SwiperCtor(
          ".swiper",
          SWIPER_OPTIONS_BY_VARIANT[swiperVariant],
        );
      }
    } catch {
      // ignore
    }
  }, [pathname, swiperVariant]);

  return (
    <>
      <Script src="/js/plugins.js" strategy="afterInteractive" />
      <Script src="/js/designesia.js" strategy="afterInteractive" />
      <Script src="/js/phase2-flows.js" strategy="afterInteractive" />
      {swiperVariant ? <Script src="/js/swiper.js" strategy="afterInteractive" /> : null}
      <Script src="/js/jquery.event.move.js" strategy="afterInteractive" />
      <Script src="/js/jquery.twentytwenty.js" strategy="afterInteractive" />
    </>
  );
}
