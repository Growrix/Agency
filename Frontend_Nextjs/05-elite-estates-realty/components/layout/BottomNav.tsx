'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { NavigationContent } from '@/lib/content/types';
import { useScrollDirection } from '@/hooks/use-scroll-direction';
import { IconBuildings, IconContact, IconHome, IconSearch, IconTrendUp } from '@/components/icons';

interface BottomNavProps {
  navigation: NavigationContent;
}

const iconMap = [IconHome, IconSearch, IconBuildings, IconTrendUp, IconContact];

export function BottomNav({ navigation }: BottomNavProps) {
  const pathname = usePathname();
  const hidden = useScrollDirection();

  return (
    <nav className={`bottom-nav ${hidden ? 'is-hidden' : ''}`} aria-label={navigation.accessibility.mobileNavLabel} aria-hidden={hidden} inert={hidden || undefined}>
      {navigation.bottom.map((item, index) => {
        const Icon = iconMap[index] ?? IconContact;
        const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
        return (
          <Link href={item.href} key={item.label} className={`bn-item ${active ? 'active' : ''}`} aria-current={active ? 'page' : undefined} tabIndex={hidden ? -1 : undefined}>
            <Icon width={20} height={20} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
