import type { ReactNode } from "react";
import { Eyebrow } from "@/components/primitives/SectionHeading";
import { MOBILE_MARKETING_TITLE_CLASS } from "@/lib/typography";
import { cn } from "@/lib/utils";

type MobileMarketingSectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
  className?: string;
  children?: ReactNode;
};

export function MobileMarketingSectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  children,
}: MobileMarketingSectionHeaderProps) {
  return (
    <header
      className={cn(
        "home-mobile-marketing__header",
        align === "center" && "home-mobile-marketing__header--center",
        align === "left" && "home-mobile-marketing__header--left",
        className,
      )}
    >
      <div className="home-mobile-marketing__eyebrow-wrap">
        <Eyebrow className="home-mobile-marketing__eyebrow">{eyebrow}</Eyebrow>
      </div>
      <h2 className={MOBILE_MARKETING_TITLE_CLASS}>{title}</h2>
      {description ? <p className="home-mobile-marketing__description">{description}</p> : null}
      {children}
    </header>
  );
}
