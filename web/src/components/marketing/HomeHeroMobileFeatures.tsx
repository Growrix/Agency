import {
  CodeBracketSquareIcon,
  CubeTransparentIcon,
  ShieldCheckIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { HOME_HERO_HIGHLIGHTS } from "@/lib/home-conversion-content";

const highlightIcons = {
  cube: CubeTransparentIcon,
  code: CodeBracketSquareIcon,
  users: UserGroupIcon,
  shield: ShieldCheckIcon,
} as const;

export function HomeHeroMobileFeatures() {
  return (
    <ul className="home-hero-mobile__features" aria-label="Platform highlights">
      {HOME_HERO_HIGHLIGHTS.map((item) => {
        const Icon = highlightIcons[item.icon];
        return (
          <li key={item.label} className="home-hero-mobile__feature">
            <Icon className="home-hero-mobile__feature-icon" aria-hidden />
            <span className="home-hero-mobile__feature-label">{item.label}</span>
          </li>
        );
      })}
    </ul>
  );
}
