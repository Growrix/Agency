import Link from "next/link";
import { ArrowRightIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { Badge } from "@/components/primitives/Badge";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";

const INCLUDED = [
  "Technical SEO audit of your current setup",
  "Google Search Console property setup and Google Indexing submission",
  "Sitemap generation and robots.txt configuration",
  "On-page meta tags (title, description, OG) review and setup",
  "Google Analytics 4 property and data stream setup",
  "Meta Pixel installation and base event verification",
  "Structured data (schema) implementation for key page types",
  "Core Web Vitals audit with actionable fixes",
  "Handoff documentation for every configuration made",
];

const NOT_INCLUDED = [
  "Ongoing monthly SEO retainers or content strategy",
  "Paid advertising or campaign management (Google Ads, Meta Ads)",
  "Content creation, copywriting, or blog production",
  "Link building or off-page SEO outreach",
];

export function AdditionalServicesDeliveryMobile() {
  return (
    <div className="home-mobile-marketing">
      <MobileMarketingSectionHeader
        eyebrow="Delivery model"
        titleLead="One-time setup."
        titleAccent="Permanent results."
        description="We audit, configure, verify, and hand off everything with documentation. You own the setup and understand every decision made."
        align="left"
        className="home-mobile-marketing__header--left max-w-none"
      />

      <div className="home-mobile-marketing__stack">
        <article className="home-mobile-marketing__principle-card home-mobile-marketing__principle-card--text-only">
          <Badge tone="primary" className="mb-3">
            What&apos;s covered
          </Badge>
          <h3 className="home-mobile-marketing__principle-card-title">
            Everything included in a standard SEO service engagement.
          </h3>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
            Included — Setup &amp; Configuration Scope
          </p>
          <ul className="mt-4 space-y-3">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <CheckCircleIcon className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="home-mobile-marketing__principle-card home-mobile-marketing__principle-card--text-only">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
            Not included — Out of Scope
          </p>
          <ul className="mt-4 space-y-3">
            {NOT_INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-text-muted">
                <XCircleIcon className="mt-0.5 size-4 shrink-0" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-6 text-text-muted">
            These are mostly one-time configurations designed to set a strong foundation for your growth.
            If you need ongoing SEO, automation, or scaling—we can support that as well through custom collaboration.
          </p>
          <Link
            href="/book-appointment"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Let&apos;s talk custom <ArrowRightIcon className="size-3.5" aria-hidden />
          </Link>
        </article>
      </div>
    </div>
  );
}
