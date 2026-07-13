import { DFY_PRICING_NOTICE } from "@/lib/commerce-pricing";
import { cn } from "@/lib/utils";

type QuotePricingPanelProps = {
  className?: string;
  compact?: boolean;
};

export function QuotePricingPanel({ className, compact = false }: QuotePricingPanelProps) {
  return (
    <div
      className={cn(
        "rounded-sm border border-primary/30 bg-primary/10",
        compact ? "px-3 py-2.5" : "px-4 py-3",
        className,
      )}
    >
      <p className={cn("font-medium text-text", compact ? "text-sm" : "text-base")}>
        Pricing confirmed after discovery
      </p>
      <p className={cn("mt-1 text-text-muted", compact ? "text-xs leading-5" : "text-sm leading-6")}>
        {DFY_PRICING_NOTICE}
      </p>
    </div>
  );
}
