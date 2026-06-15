'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { NavigationContent } from '@/lib/content/types';
import { siteConfig } from '@/config/site.config';
import { IconClose, IconMenu } from '@/components/icons';

interface MobileNavProps {
  nav: NavigationContent;
}

export function MobileNav({ nav }: MobileNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  const toggle = () => setOpen((v) => !v);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const focusable = panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key !== 'Tab' || focusable.length === 0) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, close]);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        className="header__menu-btn header__action"
        aria-expanded={open}
        aria-controls="mobile-drawer"
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={toggle}
      >
        <IconMenu size={22} />
      </button>
      <div className={`drawer lg:hidden ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <button type="button" className="drawer__overlay" aria-label="Close menu" onClick={close} />
        <div
          ref={panelRef}
          id="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="drawer__panel"
        >
          <div className="drawer__head">
            <Link href="/" className="font-bold text-primary no-underline" onClick={close}>
              {siteConfig.name}
            </Link>
            <button type="button" className="drawer__close" aria-label="Close menu" onClick={close}>
              <IconClose size={22} />
            </button>
          </div>
          {nav.drawer.map((group) => (
            <nav key={group.title} className="drawer__group" aria-label={group.title}>
              <p className="drawer__group-title">{group.title}</p>
              {group.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="drawer__link"
                  aria-current={pathname.startsWith(l.href) && l.href !== '/' ? 'page' : pathname === l.href ? 'page' : undefined}
                  onClick={close}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
      </div>
    </>
  );
}
