'use client';

import Link from 'next/link';
import { siteConfig } from '@/config/site.config';
import type { FormsContent, NavigationContent } from '@/lib/content/types';
import { BrandMark, IconArrowRight } from '@/components/icons';
import { useNewsletter } from '@/hooks/useNewsletter';

interface FooterProps {
  nav: NavigationContent;
  forms: FormsContent;
}

export function Footer({ nav, forms }: FooterProps) {
  const year = new Date().getFullYear();
  const { submit } = useNewsletter(forms.newsletter.successMessage);

  return (
    <footer>
      <div className="container" style={{ paddingBlock: 64 }}>
        <div className="footer-grid">
          <div>
            <div className="logo">
              <span className="logo-icon" style={{ width: 32, height: 32, borderRadius: 9 }}>
                <BrandMark size={19} />
              </span>
              <span className="logo-text">
                {siteConfig.shortName}
                <span className="logo-dot">.</span>
              </span>
            </div>
            <p className="ft-desc">{siteConfig.organization.slogan} A global construction and engineering partner since {siteConfig.organization.foundingYear}.</p>
            <form className="ft-nl nl-form" onSubmit={submit}>
              <input type="email" placeholder={forms.newsletter.footerPlaceholder} aria-label="Newsletter email" required />
              <button type="submit" aria-label="Subscribe">
                <IconArrowRight size={16} />
              </button>
            </form>
          </div>
          {Object.entries(nav.footer).map(([key, links]) =>
            key === 'legal' ? null : (
              <div key={key}>
                <div className="ft-col-h">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
                <ul className="ft-links">
                  {links.map((link) => (
                    <li key={`${key}-${link.label}`}>
                      <Link href={link.href} className="ft-link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ),
          )}
        </div>
        <div className="ft-bottom">
          <div className="ft-copy">
            <span>
              © {year} {siteConfig.name}. All Rights Reserved.
            </span>
            <span style={{ color: 'var(--faint)' }}>·</span>
            <span>
              Built & Maintenance by{' '}
              <a href={siteConfig.credits.href} target="_blank" rel="noopener noreferrer" className="ft-brand">
                {siteConfig.credits.label}
              </a>
            </span>
          </div>
          <div className="ft-legal">
            {nav.footer.legal?.map((link) => (
              <Link key={link.label} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
