import type { ReactNode } from "react";
import { Eyebrow } from "@/components/primitives/SectionHeading";
import { MobileMarketingAccentTitle } from "@/components/marketing/mobile/MobileMarketingAccentTitle";
import { resolveMarketingTitle } from "@/lib/marketing-title";
import { MOBILE_MARKETING_TITLE_CLASS } from "@/lib/typography";
import { cn } from "@/lib/utils";

type MobileMarketingSectionHeaderProps = {
  eyebrow: string;
  title?: ReactNode;
  titleLead?: string;
  titleAccent?: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
  children?: ReactNode;
};

export function MobileMarketingSectionHeader({
  eyebrow,
  title,
  titleLead,
  titleAccent,
  description,
  align = "center",
  className,
  children,
}: MobileMarketingSectionHeaderProps) {
  const resolved = resolveMarketingTitle({ title, titleLead, titleAccent });
  const resolvedTitle =
    resolved.kind === "accent" ? (
      <MobileMarketingAccentTitle lead={resolved.titleLead} accent={resolved.titleAccent} />
    ) : (
      title
    );

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
      {resolvedTitle ? <h2 className={MOBILE_MARKETING_TITLE_CLASS}>{resolvedTitle}</h2> : null}
      {description ? <p className="home-mobile-marketing__description">{description}</p> : null}
      {children}
    </header>
  );
}
