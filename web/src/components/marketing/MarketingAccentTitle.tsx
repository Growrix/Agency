import { cn } from "@/lib/utils";

type MarketingAccentTitleProps = {
  lead: string;
  accent: string;
  accentClassName?: string;
};

export function MarketingAccentTitle({ lead, accent, accentClassName }: MarketingAccentTitleProps) {
  return (
    <>
      {lead}{" "}
      <span className={cn("marketing-title-accent", accentClassName)}>{accent}</span>
    </>
  );
}
