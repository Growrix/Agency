import { HomeHeroStackLogos } from "@/components/marketing/HomeHeroStackLogos";
import { HOME_HERO_TECH_STACK } from "@/lib/home-conversion-content";
import { HERO_MOBILE_EYEBROW_CLASS } from "@/lib/typography";
import { cn } from "@/lib/utils";

type HomeHeroTrustedByLogosProps = {
  className?: string;
};

export function HomeHeroTrustedByLogos({ className }: HomeHeroTrustedByLogosProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="home-hero-mobile__trust-row">
        <span className="home-hero-mobile__trust-divider" aria-hidden />
        <p className={HERO_MOBILE_EYEBROW_CLASS}>{HOME_HERO_TECH_STACK.label}</p>
        <span className="home-hero-mobile__trust-divider" aria-hidden />
      </div>
      <HomeHeroStackLogos variant="mobile" className="mt-3" />
    </div>
  );
}
