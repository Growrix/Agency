import Image from "next/image";
import { HOME_HERO_COPY, HOME_HERO_TRUSTED_LOGOS } from "@/lib/home-conversion-content";
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
        <p className={HERO_MOBILE_EYEBROW_CLASS}>{HOME_HERO_COPY.trustedByLabel}</p>
        <span className="home-hero-mobile__trust-divider" aria-hidden />
      </div>
      <ul className="home-hero-mobile__trust-logos mt-3" aria-label={HOME_HERO_COPY.trustedByLabel}>
        {HOME_HERO_TRUSTED_LOGOS.map((logo) => (
          <li key={logo.name}>
            <Image
              src={logo.src}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
              className="home-hero-mobile__trust-logo h-auto w-auto object-contain"
              unoptimized
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
