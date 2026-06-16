'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { NavigationContent } from '@/lib/content/types';
import { useDrawer } from '@/hooks/use-drawer';
import { useNavbar } from '@/hooks/use-navbar';
import { IconArrowRight, IconClose, IconMenu, IconMoon, IconSun } from '@/components/icons';
import { siteConfig } from '@/config/site.config';

interface HeaderProps {
  navigation: NavigationContent;
}

function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header({ navigation }: HeaderProps) {
  const pathname = usePathname();
  const { open, closeDrawer, toggleDrawer } = useDrawer();
  const { scrolled } = useNavbar();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLElement | null>(null);
  const restoreFocusToMenu = useRef(false);
  const drawerId = 'mobile-drawer-navigation';
  const drawerLabelId = 'mobile-drawer-navigation-label';
  const closeDrawerAndRestoreFocus = useCallback(() => {
    restoreFocusToMenu.current = true;
    closeDrawer();
  }, [closeDrawer]);

  useEffect(() => setMounted(true), []);
  useEffect(() => closeDrawer(), [closeDrawer, pathname]);

  useEffect(() => {
    if (!open || !drawerRef.current) return;

    const root = drawerRef.current;
    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusables = Array.from(
      root.querySelectorAll<HTMLElement>(focusableSelector),
    );
    focusables[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeDrawerAndRestoreFocus();
        return;
      }

      if (event.key !== 'Tab' || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeDrawerAndRestoreFocus, open]);

  useEffect(() => {
    const shellSelectors = ['.ticker-wrap', '.navbar', 'main', 'footer', '.bottom-nav', '.fab-wrap'];
    const shellNodes = shellSelectors
      .flatMap((selector) => Array.from(document.querySelectorAll<HTMLElement>(selector)))
      .filter((node, index, array) => array.indexOf(node) === index);

    if (open) {
      document.body.style.overflow = 'hidden';
      shellNodes.forEach((node) => {
        node.setAttribute('aria-hidden', 'true');
        node.setAttribute('inert', '');
      });
    } else {
      document.body.style.overflow = '';
      shellNodes.forEach((node) => {
        node.removeAttribute('aria-hidden');
        node.removeAttribute('inert');
      });
      if (restoreFocusToMenu.current) {
        restoreFocusToMenu.current = false;
        window.requestAnimationFrame(() => menuButtonRef.current?.focus());
      }
    }

    return () => {
      document.body.style.overflow = '';
      shellNodes.forEach((node) => {
        node.removeAttribute('aria-hidden');
        node.removeAttribute('inert');
      });
    };
  }, [open]);

  return (
    <header>
      <nav className={`navbar ${scrolled ? 'scrolled' : 'hero-pos'}`} aria-label={navigation.accessibility.primaryNavLabel}>
        <div className="container">
          <div className="nav-inner">
            <Link href="/" className="logo" aria-label={navigation.accessibility.homepageLinkLabel}>
              <div className="logo-icon">{siteConfig.brand.monogram}</div>
              <span className="logo-text">
                {siteConfig.brand.primary}
                <span className="logo-dot">{siteConfig.brand.accent}</span>
              </span>
            </Link>

            <div className="nav-links">
              {navigation.main.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${isActive(pathname, item.href) ? 'active' : ''}`}
                  aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="nav-acts">
              <button
                type="button"
                className="btn-ico theme-btn"
                aria-label={navigation.accessibility.toggleThemeLabel}
                aria-pressed={resolvedTheme === 'dark'}
                onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              >
                {mounted && resolvedTheme === 'dark' ? <IconSun width={18} height={18} /> : <IconMoon width={18} height={18} />}
              </button>

              <Link href={navigation.headerCtas.consultation.href} className="btn btn-outline btn-desktop btn-sm">
                {navigation.headerCtas.consultation.label}
              </Link>
              <Link href={navigation.headerCtas.browse.href} className="btn btn-gold btn-desktop btn-sm">
                {navigation.headerCtas.browse.label}
                <IconArrowRight width={16} height={16} />
              </Link>

              <button
                type="button"
                className="hamburger"
                ref={menuButtonRef}
                aria-label={open ? navigation.accessibility.closeMenuLabel : navigation.accessibility.openMenuLabel}
                aria-expanded={open}
                aria-controls={drawerId}
                onClick={toggleDrawer}
              >
                {open ? <IconClose width={20} height={20} /> : <IconMenu width={20} height={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {open ? (
        <aside id={drawerId} className="drawer open" role="dialog" aria-modal="true" aria-labelledby={drawerLabelId} ref={drawerRef}>
          <h2 id={drawerLabelId} className="sr-only">
            {navigation.accessibility.drawerLabel}
          </h2>
          <div className="drawer-hd">
            <div className="logo" aria-hidden="true">
              <div className="logo-icon">{siteConfig.brand.monogram}</div>
              <span className="logo-text">
                {siteConfig.brand.primary}
                <span className="logo-dot">{siteConfig.brand.accent}</span>
              </span>
            </div>
            <button type="button" id="drawer-close" className="btn-ico" onClick={closeDrawerAndRestoreFocus} aria-label={navigation.accessibility.closeDrawerLabel}>
              <IconClose width={20} height={20} />
            </button>
          </div>

          <nav className="drawer-links" aria-label={navigation.accessibility.drawerLinksLabel}>
            {navigation.main.map((item, index) => (
              <Link key={item.href} href={item.href} className="drawer-link" onClick={closeDrawer} aria-current={isActive(pathname, item.href) ? 'page' : undefined}>
                {item.label}
                <span className="drawer-num">{String(index + 1).padStart(2, '0')}</span>
              </Link>
            ))}
          </nav>

          <div style={{ marginTop: '24px', display: 'grid', gap: '10px' }}>
            <Link href={navigation.headerCtas.consultation.href} className="btn btn-gold btn-full" onClick={closeDrawer}>
              {navigation.headerCtas.consultation.label}
              <IconArrowRight width={16} height={16} />
            </Link>
            <Link href={navigation.headerCtas.browse.href} className="btn btn-outline btn-full" onClick={closeDrawer}>
              {navigation.headerCtas.browse.label}
            </Link>
          </div>
        </aside>
      ) : null}
    </header>
  );
}
