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
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import { INVESTMENT_SERVICE_RANGES } from "@/lib/investment-guide-content";

const SERVICE_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  "Technical SEO": MagnifyingGlassCircleIcon,
  Automation: BoltIcon,
  "AI Business Systems": SparklesIcon,
  Websites: WindowIcon,
  "Mobile Apps": DevicePhoneMobileIcon,
  "SaaS Applications": CodeBracketSquareIcon,
};

export function InvestmentServiceRangesMobile() {
  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow={INVESTMENT_SERVICE_RANGES.eyebrow}
        titleLead={INVESTMENT_SERVICE_RANGES.titleLead}
        titleAccent={INVESTMENT_SERVICE_RANGES.titleAccent}
        description={INVESTMENT_SERVICE_RANGES.description}
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <div className="investment-service-ranges-mobile__stack">
        {INVESTMENT_SERVICE_RANGES.services.map((service) => {
          const Icon = SERVICE_ICONS[service.title] ?? SparklesIcon;

          return (
            <Link key={service.title} href={service.href} className="investment-service-ranges-mobile__card">
              <span className="investment-service-ranges-mobile__icon" aria-hidden>
                <Icon className="investment-service-ranges-mobile__icon-glyph" />
              </span>

              <span className="investment-service-ranges-mobile__title">{service.title}</span>

              <span className="investment-service-ranges-mobile__action" aria-hidden>
                <ChevronRightIcon className="investment-service-ranges-mobile__action-icon" />
              </span>

              <span className="investment-service-ranges-mobile__investment">{service.investment}</span>

              <p className="investment-service-ranges-mobile__description">{service.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
