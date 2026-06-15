import Link from 'next/link';
import { siteConfig } from '@/config/site.config';
import type { NavigationContent } from '@/lib/content/types';
import { Container } from '@/components/ui/Container';

interface FooterProps {
  nav: NavigationContent;
}

export function Footer({ nav }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface pb-24 pt-12 lg:pb-12">
      <Container className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-bold text-primary">{siteConfig.name}</p>
          <p className="mt-2 text-sm text-text-muted">{siteConfig.organization.slogan}. CEC accredited since {siteConfig.organization.foundingYear}.</p>
          <a href={`tel:${siteConfig.phoneTel}`} className="mt-4 inline-block font-semibold text-secondary no-underline">
            {siteConfig.phoneDisplay}
          </a>
        </div>
        {Object.entries(nav.footer).map(([key, links]) => (
          <div key={key}>
            <p className="mb-3 text-sm font-bold capitalize text-text">{key}</p>
            <div className="flex flex-col gap-2">
              {links.map((l) => (
                <Link key={l.href} href={l.href} className="text-sm text-text-muted no-underline hover:text-secondary">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </Container>
      <Container className="mt-8 flex flex-wrap justify-between gap-4 border-t border-border pt-6 text-xs text-text-muted">
        <span>
          © {year} {siteConfig.name} Pty Ltd. ABN {siteConfig.abn}.
        </span>
        <span>CEC Accredited Installer {siteConfig.cecId}</span>
      </Container>
    </footer>
  );
}
