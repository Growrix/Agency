'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/config/site.config';
import type { NavigationContent } from '@/lib/content/types';
import { IconArrowRight, IconClose } from '@/components/icons';

interface MobileNavProps {
  nav: NavigationContent;
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ nav, open, onClose }: MobileNavProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div
      id="mobile-drawer"
      className={`drawer ${open ? 'open' : ''}`}
      aria-hidden={!open}
      role="dialog"
      aria-modal={open}
      aria-label="Mobile navigation"
    >
      <div className="drawer-hd">
        <span className="logo-text" style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 19 }}>
          {siteConfig.shortName}
          <span className="logo-dot">.</span>
        </span>
        <button
          type="button"
          id="drawer-close"
          aria-label="Close menu"
          onClick={onClose}
          style={{
            width: 44,
            height: 44,
            borderRadius: 11,
            border: '1px solid var(--border)',
            background: 'var(--surface)',
            color: 'var(--text)',
            display: 'grid',
            placeItems: 'center',
            cursor: 'pointer',
          }}
        >
          <IconClose size={22} />
        </button>
      </div>
      <nav className="drawer-links" aria-label="Mobile">
        {nav.drawer.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`drawer-link ${isActive(link.href) ? 'active' : ''}`}
            onClick={onClose}
          >
            {link.label}
            {link.num ? <span className="drawer-num">{link.num}</span> : null}
          </Link>
        ))}
      </nav>
      <div style={{ marginTop: 28 }}>
        <Link href={nav.cta.href} className="btn btn-p btn-full" onClick={onClose}>
          {nav.cta.label} <IconArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
