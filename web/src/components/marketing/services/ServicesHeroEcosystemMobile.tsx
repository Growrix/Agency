import type { ComponentType, SVGProps } from "react";
import Link from "next/link";
import {
  BoltIcon,
  ChevronRightIcon,
  CodeBracketSquareIcon,
  DevicePhoneMobileIcon,
  MagnifyingGlassCircleIcon,
  SparklesIcon,
  WindowIcon,
} from "@heroicons/react/24/outline";
import type { ServiceEcosystemLink } from "@/lib/services-landing-content";
import { SERVICES_HERO_ECOSYSTEM } from "@/lib/services-landing-content";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

const EXTENSION_ICONS: Record<string, IconComponent> = {
  "technical-seo": MagnifyingGlassCircleIcon,
  automation: BoltIcon,
  "ai-business-systems": SparklesIcon,
  "mobile-apps": DevicePhoneMobileIcon,
  "saas-applications": CodeBracketSquareIcon,
};

type ServicesHeroEcosystemMobileProps = {
  links: readonly ServiceEcosystemLink[];
};

export function ServicesHeroEcosystemMobile({ links }: ServicesHeroEcosystemMobileProps) {
  const { hub } = SERVICES_HERO_ECOSYSTEM;

  return (
    <div className="services-landing-hero-mobile__ecosystem">
      <p className="services-landing-hero-mobile__ecosystem-label">Service ecosystem</p>

      <Link href={hub.href} className="services-landing-hero-mobile__ecosystem-hub">
        <span className="services-landing-hero-mobile__ecosystem-hub-icon" aria-hidden>
          <WindowIcon className="services-landing-hero-mobile__ecosystem-icon-glyph" />
        </span>
        <span className="services-landing-hero-mobile__ecosystem-hub-body">
          <span className="services-landing-hero-mobile__ecosystem-hub-title">{hub.label}</span>
          <span className="services-landing-hero-mobile__ecosystem-hub-meta">Launch foundation</span>
        </span>
        <ChevronRightIcon className="services-landing-hero-mobile__ecosystem-chevron" aria-hidden />
      </Link>

      <ul className="services-landing-hero-mobile__ecosystem-links" aria-label="Related services">
        {links.map((link) => {
          const Icon = EXTENSION_ICONS[link.toSlug] ?? SparklesIcon;

          return (
            <li key={link.toSlug}>
              <Link
                href={`/services/${link.toSlug}`}
                className="services-landing-hero-mobile__ecosystem-link"
                aria-label={link.hint ? `${link.label} — ${link.hint}` : link.label}
              >
                <span className="services-landing-hero-mobile__ecosystem-link-icon" aria-hidden>
                  <Icon className="services-landing-hero-mobile__ecosystem-icon-glyph" />
                </span>
                <span className="services-landing-hero-mobile__ecosystem-link-label">{link.label}</span>
                <ChevronRightIcon className="services-landing-hero-mobile__ecosystem-chevron" aria-hidden />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
