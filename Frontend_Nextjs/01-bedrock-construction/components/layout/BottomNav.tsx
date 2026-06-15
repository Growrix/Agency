'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavigationContent } from '@/lib/content/types';
import { BottomNavIcon } from '@/components/icons';

export function BottomNav({ nav }: { nav: NavigationContent }) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="bottom-nav lg:hidden" aria-label="Mobile navigation">
      {nav.bottomNav.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`bn-item ${isActive(link.href) ? 'active' : ''}`}
          aria-current={isActive(link.href) ? 'page' : undefined}
        >
          <BottomNavIcon icon={link.icon} size={20} />
          <span>{link.label}</span>
        </Link>
      ))}
    </nav>
  );
}
