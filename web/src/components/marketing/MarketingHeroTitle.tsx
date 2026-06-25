import type { ElementType } from "react";
import { MarketingAccentTitle } from "@/components/marketing/MarketingAccentTitle";
import { resolveMarketingTitle, type MarketingTitleSource } from "@/lib/marketing-title";
import { HERO_TITLE_CLASS } from "@/lib/typography";
import { cn } from "@/lib/utils";

type MarketingHeroTitleProps = MarketingTitleSource & {
  className?: string;
  as?: ElementType;
  /** Block layout (mobile-style two lines) instead of inline accent. */
  layout?: "inline" | "block";
};

export function MarketingHeroTitle({
  title,
  titleLead,
  titleAccent,
  className,
  as: Tag = "h1",
  layout = "inline",
}: MarketingHeroTitleProps) {
  const resolved = resolveMarketingTitle({ title, titleLead, titleAccent });
  const titleClass = cn(HERO_TITLE_CLASS, className);

  if (resolved.kind === "accent" && layout === "block") {
    return (
      <Tag className={titleClass}>
        <span className="block">{resolved.titleLead}</span>
        <span className="block marketing-title-accent">{resolved.titleAccent}</span>
      </Tag>
    );
  }

  if (resolved.kind === "accent") {
    return (
      <Tag className={titleClass}>
        <MarketingAccentTitle lead={resolved.titleLead} accent={resolved.titleAccent} />
      </Tag>
    );
  }

  return <Tag className={titleClass}>{resolved.title}</Tag>;
}
