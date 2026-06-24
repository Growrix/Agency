import { MarketingAccentTitle } from "@/components/marketing/MarketingAccentTitle";

type MobileMarketingAccentTitleProps = {
  lead: string;
  accent: string;
};

export function MobileMarketingAccentTitle({ lead, accent }: MobileMarketingAccentTitleProps) {
  return (
    <MarketingAccentTitle
      lead={lead}
      accent={accent}
      accentClassName="home-mobile-marketing__title-accent"
    />
  );
}
