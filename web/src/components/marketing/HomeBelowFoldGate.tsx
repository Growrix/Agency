"use client";

import { useEffect, useState, type ComponentType } from "react";
import type { HomeBelowFoldSectionsProps } from "@/components/marketing/HomeBelowFoldSections";
import { scheduleHomepageBundleLoad } from "@/lib/homepage-deferred-load";

type HomeBelowFoldComponent = ComponentType<HomeBelowFoldSectionsProps>;

/** Defers below-fold homepage bundles until after window load (domcontentloaded resource budget). */
export function HomeBelowFoldGate(props: HomeBelowFoldSectionsProps) {
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
    return null;
  }

  return <Sections {...props} />;
}
