type MobileMarketingAccentTitleProps = {
  lead: string;
  accent: string;
};

export function MobileMarketingAccentTitle({ lead, accent }: MobileMarketingAccentTitleProps) {
  return (
    <>
      {lead}{" "}
      <span className="home-mobile-marketing__title-accent">{accent}</span>
    </>
  );
}
