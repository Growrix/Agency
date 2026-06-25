import { MarketingHeroTitle } from "@/components/marketing/MarketingHeroTitle";
import { cn } from "@/lib/utils";

type ShopProductHeroTitleProps = {
  name: string;
  variant?: "mobile" | "sidebar";
  className?: string;
};

const VARIANT_CLASS = {
  mobile: "mt-2 font-display text-3xl font-bold tracking-tight",
  sidebar: "mt-2 font-display text-2xl font-bold leading-snug tracking-tight",
} as const;

export function ShopProductHeroTitle({ name, variant = "mobile", className }: ShopProductHeroTitleProps) {
  return (
    <MarketingHeroTitle title={name} layout="block" className={cn(VARIANT_CLASS[variant], className)} />
  );
}
