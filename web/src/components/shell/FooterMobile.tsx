import Image from "next/image";
import Link from "next/link";
import {
  BoltIcon,
  ChevronRightIcon,
  ClockIcon,
  CodeBracketSquareIcon,
  DevicePhoneMobileIcon,
  MagnifyingGlassCircleIcon,
  SparklesIcon,
  WindowIcon,
} from "@heroicons/react/24/outline";
import { FOOTER_NAV } from "@/lib/nav";
import { HOME_FOOTER_COPY } from "@/lib/home-conversion-content";
import { SITE_NAME, SITE_SOCIAL_LINKS } from "@/lib/site";

const SERVICE_ICONS = {
  Websites: WindowIcon,
  "SaaS Applications": CodeBracketSquareIcon,
  "Mobile Apps": DevicePhoneMobileIcon,
  Automation: BoltIcon,
  "Technical SEO": MagnifyingGlassCircleIcon,
  "AI Business Systems": SparklesIcon,
} as const;

export function FooterMobile() {
  const services = FOOTER_NAV.Services;
  const digitalProducts = FOOTER_NAV["Digital Products"];
  const company = FOOTER_NAV.Company;
  const support = FOOTER_NAV.Support;
  const legal = FOOTER_NAV.Legal;

  return (
    <footer className="home-mobile-marketing home-mobile-marketing__footer border-t border-border bg-surface">
      <div className="home-mobile-marketing__footer-inner">
        <div className="home-mobile-marketing__footer-response">
          <ClockIcon className="home-mobile-marketing__footer-response-icon" aria-hidden />
          <div>
            <p className="home-mobile-marketing__footer-response-label">{HOME_FOOTER_COPY.responseLabel}</p>
            <p className="home-mobile-marketing__footer-response-value">{HOME_FOOTER_COPY.responseValue}</p>
          </div>
        </div>

        <section className="home-mobile-marketing__footer-block">
          <h2 className="home-mobile-marketing__footer-heading">Services</h2>
          <ul className="home-mobile-marketing__footer-service-grid">
            {services.map((item) => {
              const Icon = SERVICE_ICONS[item.label as keyof typeof SERVICE_ICONS] ?? WindowIcon;
              return (
                <li key={item.href}>
                  <Link href={item.href} className="home-mobile-marketing__footer-service-link">
                    <Icon className="home-mobile-marketing__footer-service-icon" aria-hidden />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="home-mobile-marketing__footer-block">
          <h2 className="home-mobile-marketing__footer-heading">Digital products</h2>
          <ul className="home-mobile-marketing__footer-list">
            {digitalProducts.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="home-mobile-marketing__footer-list-link">
                  <span>{item.label}</span>
                  <ChevronRightIcon className="home-mobile-marketing__footer-list-chevron" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="home-mobile-marketing__footer-columns">
          {[
            { title: "Company", items: company },
            { title: "Support", items: support },
            { title: "Legal", items: legal },
          ].map((group) => (
            <section key={group.title} className="home-mobile-marketing__footer-column">
              <h2 className="home-mobile-marketing__footer-heading">{group.title}</h2>
              <ul className="home-mobile-marketing__footer-column-list">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="home-mobile-marketing__footer-column-link">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="home-mobile-marketing__footer-bottom">
          <p className="home-mobile-marketing__footer-copyright">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="home-mobile-marketing__footer-tagline">{HOME_FOOTER_COPY.tagline}</p>
          <div className="home-mobile-marketing__footer-social">
            {SITE_SOCIAL_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="home-mobile-marketing__footer-social-link"
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export function FooterDesktop() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-shell px-4 sm:px-8 lg:px-12">
        <div className="grid gap-10 py-16 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/website logo main.svg"
                alt="Growrix logo"
                width={140}
                height={36}
                unoptimized
                className="h-8 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 max-w-sm text-text-muted leading-7">
              A product-minded studio building websites, HTML business profiles, SaaS applications, automation systems,
              and AI business systems for ambitious teams.
            </p>
            <p className="mt-6 font-mono text-xs uppercase tracking-wider text-text-muted">
              {HOME_FOOTER_COPY.responseLabel}
            </p>
            <p className="mt-1 font-display text-2xl tracking-tight">{HOME_FOOTER_COPY.responseValue}</p>
          </div>

          {Object.entries(FOOTER_NAV).map(([group, items]) => (
            <div key={group}>
              <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted">{group}</h3>
              <ul className="mt-4 space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm transition-colors hover:text-primary">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-border pb-[calc(5.5rem+env(safe-area-inset-bottom))] pt-6 sm:flex-row sm:items-center sm:justify-between sm:pb-6">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p className="font-mono text-xs text-text-muted">{HOME_FOOTER_COPY.tagline}</p>
          <div className="flex items-center gap-3">
            {SITE_SOCIAL_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-xs text-text-muted transition-colors hover:text-primary"
                target="_blank"
                rel="noreferrer"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
