'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { siteConfig } from '@/config/site.config';
import type { NavigationContent } from '@/lib/content/types';
import { useHeaderScroll } from '@/hooks/useHeaderScroll';
import { BrandMark, IconArrowRight, IconMenu } from '@/components/icons';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { MobileNav } from '@/components/layout/MobileNav';

interface HeaderProps {
  nav: NavigationContent;
}

export function Header({ nav }: HeaderProps) {
  const pathname = usePathname();
  const scrolled = useHeaderScroll();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="nav-inner">
            <Link href="/" className="logo">
              <span className="logo-icon">
                <BrandMark size={19} />
              </span>
              <span className="logo-text">
                {siteConfig.shortName}
                <span className="logo-dot">.</span>
              </span>
            </Link>
            <div className="nav-links">
              {nav.main.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="nav-actions">
              <ThemeToggle />
              <Link href={nav.cta.href} className="btn btn-p btn-desktop">
                {nav.cta.label} <IconArrowRight size={16} />
              </Link>
              <button
                type="button"
                className="hamburger"
                aria-label="Open menu"
                aria-expanded={drawerOpen}
                aria-controls="mobile-drawer"
                onClick={() => setDrawerOpen(true)}
              >
                <IconMenu size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <MobileNav nav={nav} open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
