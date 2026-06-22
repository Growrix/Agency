import { CheckIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Badge } from "@/components/primitives/Badge";
import { cn } from "@/lib/utils";
import {
  getTierCardCheckClass,
  getTierCardContainerClass,
  getTierCardMutedTextClass,
} from "@/components/sections/tierCardTheme";

export type Tier = {
  name: string;
  price: string;
  cadence?: string;
  mutePrice?: boolean;
  description: string;
  features: string[];
  timeline?: string;
  cta: { label: string; href: string };
  featured?: boolean;
  badge?: string;
};

export function PricingTier({ tier, className }: { tier: Tier; className?: string }) {
  const isFeatured = Boolean(tier.featured);

  return (
    <Card
      variant={isFeatured ? "dark" : "surface"}
      hoverable
      className={cn(
        getTierCardContainerClass(isFeatured),
        className
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl tracking-tight">{tier.name}</h3>
        {tier.badge && <Badge tone="primary">{tier.badge}</Badge>}
      </div>
      {!tier.mutePrice && (
        <div className="mt-5 flex items-baseline gap-1">
          <span className="font-display text-4xl tracking-tight">{tier.price}</span>
          {tier.cadence && (
            <span className={cn("text-sm", getTierCardMutedTextClass(isFeatured))}>
              {tier.cadence}
            </span>
          )}
        </div>
      )}
      <p className={cn("mt-3 leading-7 text-pretty", getTierCardMutedTextClass(isFeatured))}>
        {tier.description}
      </p>
      {tier.timeline ? (
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
          Timeline · {tier.timeline}
        </p>
      ) : null}
      <ul className="mt-6 space-y-3 flex-1">
        {tier.features.map((f) => (
          <li key={f} className="flex gap-3 text-sm leading-6">
            <CheckIcon
              className={cn(
                "mt-0.5 size-5 shrink-0",
                getTierCardCheckClass()
              )}
              aria-hidden
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <LinkButton
          href={tier.cta.href}
          variant={isFeatured ? "primary" : "outline"}
          fullWidth
        >
          {tier.cta.label}
        </LinkButton>
      </div>
    </Card>
  );
}
