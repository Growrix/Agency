import {
  BoltIcon,
  CodeBracketSquareIcon,
  DevicePhoneMobileIcon,
  MagnifyingGlassCircleIcon,
  SparklesIcon,
  WindowIcon,
} from "@heroicons/react/24/outline";
import { ABOUT_HERO_PANEL } from "@/lib/about-landing-content";

const BUILD_ICONS = [
  WindowIcon,
  CodeBracketSquareIcon,
  DevicePhoneMobileIcon,
  BoltIcon,
  MagnifyingGlassCircleIcon,
  SparklesIcon,
];

export function AboutHeroPanelMobile() {
  return (
    <div className="services-landing-hero-mobile__ecosystem">
      <p className="services-landing-hero-mobile__ecosystem-label">{ABOUT_HERO_PANEL.heading}</p>

      <ul className="about-hero-mobile__build-list" aria-label={ABOUT_HERO_PANEL.heading}>
        {ABOUT_HERO_PANEL.items.map((item, index) => {
          const Icon = BUILD_ICONS[index] ?? SparklesIcon;

          return (
            <li key={item}>
              <span className="about-hero-mobile__build-row">
                <span className="services-landing-hero-mobile__ecosystem-link-icon" aria-hidden>
                  <Icon className="services-landing-hero-mobile__ecosystem-icon-glyph" />
                </span>
                <span className="services-landing-hero-mobile__ecosystem-link-label">{item}</span>
              </span>
            </li>
          );
        })}
      </ul>

      <p className="about-hero-mobile__panel-footnote">{ABOUT_HERO_PANEL.footerNote}</p>
    </div>
  );
}
