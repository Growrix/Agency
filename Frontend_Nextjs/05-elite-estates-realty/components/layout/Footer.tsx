import Link from 'next/link';
import type { NavigationContent } from '@/lib/content/types';
import { siteConfig } from '@/config/site.config';
import { FooterNewsletter } from '@/components/layout/FooterNewsletter';
import { IconInstagram, IconLinkedIn, IconYouTube } from '@/components/icons';

interface FooterProps {
  navigation: NavigationContent;
}

export function Footer({ navigation }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="container" style={{ paddingBlock: '64px' }}>
        <div className="footer-grid">
          <div>
            <div className="logo" style={{ gap: '10px' }}>
              <div className="logo-icon">{siteConfig.brand.monogram}</div>
              <span className="logo-text">
                {siteConfig.brand.primary}
                <span className="logo-dot">{siteConfig.brand.accent}</span>
              </span>
            </div>
            <p className="ft-desc">{siteConfig.metadata.defaultDescription}</p>
            <div style={{ display: 'flex', gap: '14px', marginTop: '18px', opacity: 0.7 }}>
              <span style={{ fontFamily: 'var(--fm)', fontSize: '11px' }}>
                {siteConfig.organization.ratingValue} {siteConfig.labels.footerClientRatingLabel}
              </span>
              <span style={{ fontFamily: 'var(--fm)', fontSize: '11px' }}>
                {siteConfig.organization.ratingCount}+ {siteConfig.labels.footerTransactionsLabel}
              </span>
            </div>
            <div style={{ marginTop: '18px' }}>
              <FooterNewsletter newsletter={navigation.footerNewsletter} />
            </div>
          </div>

          <FooterColumn title={navigation.footerLabels.properties} links={navigation.footer.properties} />
          <FooterColumn title={navigation.footerLabels.company} links={navigation.footer.company} />
          <FooterColumn title={navigation.footerLabels.resources} links={navigation.footer.resources} />

          <div>
            <div className="ft-col-h">{navigation.footerLabels.globalHq}</div>
            <ul className="ft-links">
              <li className="ft-link" style={{ cursor: 'default' }}>
                {siteConfig.address.street}, {siteConfig.address.locality}
              </li>
              <li className="ft-link" style={{ cursor: 'default' }}>
                {siteConfig.phoneDisplay}
              </li>
              <li className="ft-link" style={{ cursor: 'default' }}>
                {siteConfig.email}
              </li>
              <li className="ft-link" style={{ cursor: 'default' }}>
                {siteConfig.hours}
              </li>
            </ul>
          </div>
        </div>

        <div className="ft-bottom">
          <div className="ft-copy">
            <span>
              &copy; {year} {siteConfig.name}. {navigation.footerLabels.allRightsReserved}
            </span>
            <span style={{ opacity: 0.3 }}>-</span>
            <span>
              {siteConfig.credits.label}{' '}
              <a href={siteConfig.credits.href} target="_blank" rel="noopener noreferrer" className="ft-brand">
                {siteConfig.credits.name}
              </a>
            </span>
          </div>
          <div className="ft-social" aria-label="Social links">
            <a href={siteConfig.social.linkedIn} aria-label="LinkedIn">
              <IconLinkedIn width={16} height={16} />
            </a>
            <a href={siteConfig.social.instagram} aria-label="Instagram">
              <IconInstagram width={16} height={16} />
            </a>
            <a href={siteConfig.social.youtube} aria-label="YouTube">
              <IconYouTube width={16} height={16} />
            </a>
          </div>
          <div className="ft-legal">
            {navigation.footer.legal.map((item) => (
              <Link href={item.href} key={item.label}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: NavigationContent['footer']['properties'] }) {
  return (
    <div>
      <div className="ft-col-h">{title}</div>
      <ul className="ft-links">
        {links.map((link) => (
          <li key={`${title}-${link.href}`}>
            <Link href={link.href} className="ft-link">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
