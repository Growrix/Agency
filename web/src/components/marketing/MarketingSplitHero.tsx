import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarketingSplitHeroProps = {
  copy: ReactNode;
  panel: ReactNode;
  prefix?: ReactNode;
  footer?: ReactNode;
  className?: string;
};

/**
 * Shared two-column marketing hero — copy left, panel/card right.
 * Layout is CSS-driven (`.marketing-split-hero`) for cross-browser alignment.
 */
export function MarketingSplitHero({ copy, panel, prefix, footer, className }: MarketingSplitHeroProps) {
  return (
    <div className={cn("marketing-split-hero", className)}>
      {prefix ? <div className="marketing-split-hero__prefix">{prefix}</div> : null}
      <div className="marketing-split-hero__grid">
        <div className="marketing-split-hero__copy">{copy}</div>
        <div className="marketing-split-hero__panel">{panel}</div>
      </div>
      {footer ? <div className="marketing-split-hero__footer">{footer}</div> : null}
    </div>
  );
}
