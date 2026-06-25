import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { GoogleReviews } from "@/components/sections/GoogleReviews";
import { ABOUT_REVIEWS_SECTION } from "@/lib/about-landing-content";

export function AboutReviewsMobile() {
  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={ABOUT_REVIEWS_SECTION.eyebrow}
        titleLead={ABOUT_REVIEWS_SECTION.titleLead}
        titleAccent={ABOUT_REVIEWS_SECTION.titleAccent}
        description={ABOUT_REVIEWS_SECTION.description}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <GoogleReviews
        hideHeading
        displayMode="single"
        limit={1}
        title={ABOUT_REVIEWS_SECTION.title}
        description={ABOUT_REVIEWS_SECTION.description}
        className="about-reviews-mobile__feed"
      />
    </div>
  );
}
