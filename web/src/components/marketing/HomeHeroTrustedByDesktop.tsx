import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { HOME_HERO_COPY, HOME_HERO_TRUSTED_LOGOS } from "@/lib/home-conversion-content";
import { cn } from "@/lib/utils";

type HomeHeroTrustedByDesktopProps = {
  className?: string;
};

export function HomeHeroTrustedByDesktop({ className }: HomeHeroTrustedByDesktopProps) {
  return (
    <div className={cn("home-hero-desktop__trust", className)}>
      <ul className="home-hero-desktop__trust-avatars" aria-hidden>
        {HOME_HERO_TRUSTED_LOGOS.slice(0, 4).map((logo) => (
          <li key={logo.name} className="home-hero-desktop__trust-avatar">
            <Image
              src={logo.src}
              alt=""
              width={logo.width}
              height={logo.height}
              unoptimized
              className="home-hero-desktop__trust-avatar-logo"
            />
          </li>
        ))}
      </ul>
      <div className="home-hero-desktop__trust-rating" aria-hidden>
        {Array.from({ length: 5 }).map((_, index) => (
          <StarIcon key={index} className="home-hero-desktop__trust-star" />
        ))}
      </div>
      <p className="home-hero-desktop__trust-label">{HOME_HERO_COPY.trustedByLabel}</p>
    </div>
  );
}
