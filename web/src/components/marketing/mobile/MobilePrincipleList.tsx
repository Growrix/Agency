import type { ComponentType, SVGProps } from "react";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { cn } from "@/lib/utils";

export type MobilePrincipleListItem = {
  title: string;
  description: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
};

type MobilePrincipleListProps = {
  eyebrow: string;
  title?: string;
  titleLead?: string;
  titleAccent?: string;
  description?: string;
  items: readonly MobilePrincipleListItem[];
  className?: string;
};

export function MobilePrincipleList({
  eyebrow,
  title,
  titleLead,
  titleAccent,
  description,
  items,
  className,
}: MobilePrincipleListProps) {
  return (
    <div className={cn("home-mobile-marketing", className)}>
      <MobileMarketingSectionHeader
        eyebrow={eyebrow}
        titleLead={titleLead}
        titleAccent={titleAccent}
        title={titleLead && titleAccent ? undefined : title}
        description={description}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <div className="home-mobile-marketing__stack">
        {items.map((item) => {
          const Icon = item.icon;
          const textOnly = !Icon;

          return (
            <article
              key={item.title}
              className={cn(
                "home-mobile-marketing__principle-card",
                textOnly && "home-mobile-marketing__principle-card--text-only",
              )}
            >
              {Icon ? (
                <span className="home-mobile-marketing__principle-card-icon" aria-hidden>
                  <Icon className="home-mobile-marketing__principle-card-icon-glyph" />
                </span>
              ) : null}
              <div className="home-mobile-marketing__principle-card-body">
                <h3 className="home-mobile-marketing__principle-card-title">{item.title}</h3>
                <p className="home-mobile-marketing__principle-card-description">{item.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
