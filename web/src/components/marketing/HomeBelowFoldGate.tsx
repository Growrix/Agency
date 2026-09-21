"use client";

import { useEffect, useState, type ComponentType, type ReactNode } from "react";
import type { HomeBelowFoldSectionsProps } from "@/components/marketing/HomeBelowFoldSections";
import { scheduleHomepageBundleLoad } from "@/lib/homepage-deferred-load";

type HomeBelowFoldComponent = ComponentType<HomeBelowFoldSectionsProps>;

type HomeBelowFoldGateProps = HomeBelowFoldSectionsProps & {
  /**
   * Server-rendered content shown until the deferred sections mount. Keeps real body
   * copy and internal links in the initial HTML for crawlers.
   */
  fallback?: ReactNode;
};

/** Defers below-fold homepage bundles until after window load (domcontentloaded resource budget). */
export function HomeBelowFoldGate({ fallback, ...props }: HomeBelowFoldGateProps) {
  const [Sections, setSections] = useState<HomeBelowFoldComponent | null>(null);

  useEffect(() => {
    const loadSections = () => {
      void import("@/components/marketing/HomeBelowFoldSections").then((mod) => {
        setSections(() => mod.HomeBelowFoldSections);
      });
    };

    return scheduleHomepageBundleLoad(loadSections);
  }, []);

  if (!Sections) {
    return <>{fallback ?? null}</>;
  }

  return <Sections {...props} />;
}
