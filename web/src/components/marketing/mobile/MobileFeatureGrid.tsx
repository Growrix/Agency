import type { ComponentType, SVGProps } from "react";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { cn } from "@/lib/utils";

export type MobileFeatureGridItem = {
  title: string;
  description: string;
  icon?: ComponentType<SVGProps<SVGSVGElement>>;
};

type MobileFeatureGridProps = {
  eyebrow: string;
  title?: string;
  titleLead?: string;
  titleAccent?: string;
  description?: string;
  items: readonly MobileFeatureGridItem[];
  className?: string;
};

export function MobileFeatureGrid({
  eyebrow,
  title,
  titleLead,
  titleAccent,
  description,
  items,
  className,
}: MobileFeatureGridProps) {
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

      <div className="home-mobile-marketing__outcomes-grid">
        {items.map((item) => {
          const Icon = item.icon;
          const textOnly = !Icon;

          return (
            <article
              key={item.title}
              className={cn(
                "home-mobile-marketing__outcome-card",
                textOnly && "home-mobile-marketing__outcome-card--text-only",
              )}
            >
              {Icon ? (
                <span className="home-mobile-marketing__outcome-card-icon" aria-hidden>
                  <Icon className="home-mobile-marketing__outcome-card-icon-glyph" />
                </span>
              ) : null}
              <h3 className="home-mobile-marketing__outcome-card-title">{item.title}</h3>
              <p className="home-mobile-marketing__outcome-card-description">{item.description}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
