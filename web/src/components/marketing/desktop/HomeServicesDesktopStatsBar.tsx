import {
  ArrowsRightLeftIcon,
  ClockIcon,
  CubeIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { HOME_STATS } from "@/lib/content";

const HOME_STATS_ICONS = [CubeIcon, Squares2X2Icon, ClockIcon, ArrowsRightLeftIcon] as const;

export function HomeServicesDesktopStatsBar() {
  return (
    <div className="home-services-desktop__stats" aria-label="Platform metrics">
      {HOME_STATS.map((stat, index) => {
        const Icon = HOME_STATS_ICONS[index] ?? CubeIcon;

        return (
          <div key={stat.label} className="home-services-desktop__stat">
            {index > 0 ? <span className="home-services-desktop__stat-divider" aria-hidden /> : null}
            <span className="home-services-desktop__stat-icon" aria-hidden>
              <Icon className="size-4" />
            </span>
            <p className="home-services-desktop__stat-value">{stat.value}</p>
            <p className="home-services-desktop__stat-label">{stat.label}</p>
            <p className="home-services-desktop__stat-hint">{stat.hint}</p>
          </div>
        );
      })}
    </div>
  );
}
