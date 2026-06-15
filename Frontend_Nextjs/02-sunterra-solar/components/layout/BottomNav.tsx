'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavigationContent } from '@/lib/content/types';
import { BottomNavIcon } from '@/components/icons';
import { useBottomNavScrollHide } from '@/hooks/useBottomNavScrollHide';

export function BottomNav({ nav }: { nav: NavigationContent }) {
  const pathname = usePathname();
  const hidden = useBottomNavScrollHide();

  return (
    <nav
      className={`bottomnav lg:hidden ${hidden ? 'is-hidden' : ''}`}
      data-component="bottomnav"
      aria-label="Mobile"
    >
      {nav.bottomNav.map((link) => {
        const active = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? 'page' : undefined}
            className="bottomnav__link"
          >
            <BottomNavIcon href={link.href} size={22} />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
