"use client";

import { useEffect } from "react";
import type { SliderVariant } from "@/data/native-content";

type SwiperInstance = {
  destroy: (deleteInstance?: boolean, cleanStyles?: boolean) => void;
};

type SwiperConstructor = new (element: Element, options: Record<string, unknown>) => SwiperInstance;

const baseOptions = {
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
};

const resolveVariantOptions = (variant: SliderVariant) => {
  if (variant === "three") {
    return {
      ...baseOptions,
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
    };
  }

  if (variant === "two") {
    return {
      ...baseOptions,
      loop: true,
      spaceBetween: 30,
      effect: "fade",
      pagination: {
        el: false,
        clickable: false,
      },
    };
  }

  return {
    ...baseOptions,
    spaceBetween: 30,
    effect: "fade",
    pagination: {
      el: false,
      clickable: false,
    },
  };
};

export function SwiperBoot({ variant }: { variant: SliderVariant }) {
  useEffect(() => {
    const globalWindow = window as typeof window & { Swiper?: SwiperConstructor };
    if (!variant) {
      return;
    }

    const options = resolveVariantOptions(variant);
    const instances: SwiperInstance[] = [];

    let retryTimer: ReturnType<typeof globalThis.setTimeout> | undefined;
    let disposed = false;

    const initialize = () => {
      if (disposed) {
        return;
      }

      if (!globalWindow.Swiper) {
        retryTimer = globalThis.setTimeout(initialize, 120);
        return;
      }

      document.querySelectorAll(".swiper").forEach((swiperElement) => {
        const instance = new globalWindow.Swiper!(swiperElement, options);
        instances.push(instance);
      });
    };

    initialize();

    return () => {
      disposed = true;
      if (retryTimer) {
        globalThis.clearTimeout(retryTimer);
      }
      instances.forEach((instance) => {
        instance.destroy(true, true);
      });
    };
  }, [variant]);

  return null;
}