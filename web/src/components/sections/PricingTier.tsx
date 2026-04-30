import { CheckIcon } from "@heroicons/react/24/outline";
import { LinkButton } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Badge } from "@/components/primitives/Badge";
import { cn } from "@/lib/utils";

export type Tier = {
  name: string;
  price: string;
  cadence?: string;
  mutePrice?: boolean;
  description: string;
  features: string[];
  cta: { label: string; href: string };
  featured?: boolean;
  badge?: string;
};

export function PricingTier({ tier, className }: { tier: Tier; className?: string }) {
  return (
    <Card
      variant={tier.featured ? "dark" : "surface"}
      hoverable
      className={cn(
        "h-full flex flex-col",
        tier.featured && "ring-1 ring-primary/40 shadow-[var(--shadow-2)]",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl tracking-tight">{tier.name}</h3>
        {tier.badge && (
          <Badge tone={tier.featured ? "secondary" : "primary"}>{tier.badge}</Badge>
        )}
      </div>
      {!tier.mutePrice && (
        <div className="mt-5 flex items-baseline gap-1">
          <span className="font-display text-4xl tracking-tight">{tier.price}</span>
          {tier.cadence && (
            <span className={cn("text-sm", tier.featured ? "text-white/60" : "text-text-muted")}>
              {tier.cadence}
            </span>
          )}
        </div>
      )}
      <p className={cn("mt-3 leading-7 text-pretty", tier.featured ? "text-white/75" : "text-text-muted")}>
        {tier.description}
      </p>
      <ul className="mt-6 space-y-3 flex-1">
        {tier.features.map((f) => (
          <li key={f} className="flex gap-3 text-sm leading-6">
            <CheckIcon
              className={cn(
                "mt-0.5 size-5 shrink-0",
                tier.featured ? "text-secondary" : "text-primary"
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
          variant={tier.featured ? "secondary" : "outline"}
          fullWidth
        >
          {tier.cta.label}
        </LinkButton>
      </div>
    </Card>
  );
}
