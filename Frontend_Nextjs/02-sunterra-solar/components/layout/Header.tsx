'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '@/config/site.config';
import type { NavigationContent } from '@/lib/content/types';
import { useHeaderScroll } from '@/hooks/useHeaderScroll';
import { BrandMark, IconPhone, ServiceIcon } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { MobileNav } from '@/components/layout/MobileNav';

interface HeaderProps {
  nav: NavigationContent;
}

export function Header({ nav }: HeaderProps) {
  const pathname = usePathname();
  const scrolled = useHeaderScroll();
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLLIElement>(null);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (megaRef.current && !megaRef.current.contains(target)) setMegaOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMegaOpen(false);
    };
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
      <Container wide>
        <div className="header__inner">
          <MobileNav nav={nav} />
          <Link href="/" className="header__brand">
            <BrandMark className="header__logo" />
            <span className="hidden sm:inline">{siteConfig.name}</span>
          </Link>
          <a href={`tel:${siteConfig.phoneTel}`} className="header__phone">
            <IconPhone size={18} />
            {siteConfig.phoneDisplay}
          </a>
          <div className="header__actions">
            <ThemeToggle />
            <Button href="/quote" variant="accent" size="sm" className="header__cta">
              Free Quote
            </Button>
          </div>
        </div>
      </Container>
      <nav className="navbar" aria-label="Main">
        <Container wide>
          <ul className="navbar__list">
            {nav.main.map((link) =>
              link.label === 'Services' ? (
                <li key={link.href} ref={megaRef} className="navbar__item--mega">
                  <button
                    type="button"
                    className="navbar__link"
                    aria-expanded={megaOpen}
                    aria-controls="mega-menu"
                    onClick={() => setMegaOpen((o) => !o)}
                  >
                    Services ▾
                  </button>
                  <div id="mega-menu" className={`mega ${megaOpen ? 'is-open' : ''}`} data-component="mega">
                    <Container wide>
                      <div className="mega__inner">
                        {nav.mega.groups.map((g) => (
                          <div key={g.title}>
                            <p className="mega__group-title">{g.title}</p>
                            <ul className="mega__list">
                              {g.links.map((l) => (
                                <li key={l.href}>
                                  <Link href={l.href} className="mega__link" onClick={() => setMegaOpen(false)}>
                                    <ServiceIcon href={l.href} size={18} />
                                    {l.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                        <div className="mega__promo">
                          <p className="mega__promo-title">{nav.mega.promo.title}</p>
                          <p className="text-sm opacity-90">{nav.mega.promo.description}</p>
                          <Button href={nav.mega.promo.cta.href} variant="accent" size="sm" className="mt-3">
                            {nav.mega.promo.cta.label}
                          </Button>
                        </div>
                      </div>
                    </Container>
                  </div>
                </li>
              ) : (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                    className={`navbar__link ${link.accent ? 'navbar__link--accent' : ''}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </Container>
      </nav>
    </header>
  );
}
