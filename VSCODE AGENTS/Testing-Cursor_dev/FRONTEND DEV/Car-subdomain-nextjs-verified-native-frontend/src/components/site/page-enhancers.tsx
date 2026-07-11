"use client";

import { useEffect, useMemo } from "react";
import type { SliderVariant } from "@/data/native-content";
import { SwiperBoot } from "@/components/site/swiper-boot";

type PageEnhancersProps = {
  scripts: string[];
  sliderVariant: SliderVariant;
};

const CORE_VENDOR_SCRIPTS = [
  "/js/plugins.js",
  "/js/designesia.js",
];

const createScriptSelector = (src: string) => `script[data-native-script="${src}"]`;

const appendScript = (src: string) => {
  return new Promise<void>((resolve, reject) => {
    const existingTagged = document.querySelector<HTMLScriptElement>(createScriptSelector(src));
    if (existingTagged) {
      resolve();
      return;
    }

    const absoluteSrc = new URL(src, window.location.origin).toString();
    const existingBySrc = Array.from(document.querySelectorAll<HTMLScriptElement>("script[src]")).find((scriptNode) => {
      const scriptSrc = scriptNode.getAttribute("src");
      if (!scriptSrc) {
        return false;
      }

      return scriptSrc === src || scriptNode.src === absoluteSrc;
    });

    if (existingBySrc) {
      existingBySrc.setAttribute("data-native-script", src);
      resolve();
      return;
    }

    const scriptNode = document.createElement("script");
    scriptNode.src = src;
    scriptNode.async = false;
    scriptNode.setAttribute("data-native-script", src);

    scriptNode.addEventListener("load", () => resolve(), { once: true });
    scriptNode.addEventListener("error", () => reject(new Error(`Failed to load script: ${src}`)), { once: true });

    document.body.appendChild(scriptNode);
  });
};

export function PageEnhancers({ scripts, sliderVariant }: PageEnhancersProps) {
  const orderedScripts = useMemo(() => {
    return Array.from(new Set([...CORE_VENDOR_SCRIPTS, ...scripts]));
  }, [scripts]);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      for (const scriptSrc of orderedScripts) {
        if (cancelled) {
          return;
        }

        try {
          await appendScript(scriptSrc);
        } catch {
          // Keep rendering resilient even if a legacy script fails.
        }
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [orderedScripts]);

  return (
    <>
      <SwiperBoot variant={sliderVariant} />
    </>
  );
}