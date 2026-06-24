"use client";

import { cn } from "@/lib/utils";

export type MobileMarketingTab = {
  id: string;
  label: string;
};

type MobileMarketingTabsProps = {
  tabs: MobileMarketingTab[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  ariaLabel: string;
  variant?: "pills" | "segmented";
  className?: string;
};

export function MobileMarketingTabs({
  tabs,
  activeTabId,
  onTabChange,
  ariaLabel,
  variant = "pills",
  className,
}: MobileMarketingTabsProps) {
  if (tabs.length <= 1) {
    return null;
  }

  return (
    <div
      className={cn(
        "home-mobile-marketing__tabs",
        variant === "segmented" && "home-mobile-marketing__tabs--segmented",
        className,
      )}
      role="tablist"
      aria-label={ariaLabel}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "home-mobile-marketing__tab",
              variant === "segmented" && "home-mobile-marketing__tab--segmented",
              variant === "pills" && isActive && "home-mobile-marketing__tab--active",
              variant === "segmented" && isActive && "home-mobile-marketing__tab--segmented-active",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
