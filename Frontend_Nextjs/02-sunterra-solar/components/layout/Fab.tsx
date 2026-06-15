'use client';

import Link from 'next/link';
import { siteConfig } from '@/config/site.config';
import type { FormsContent } from '@/lib/content/types';
import { useFab } from '@/hooks/useFab';
import { IconPlus } from '@/components/icons';

interface FabProps {
  forms: FormsContent['fab'];
}

export function Fab({ forms }: FabProps) {
  const { open, toggle, close, mainRef, menuRef } = useFab();

  const items = forms.items.map((item) => ({
    ...item,
    label: item.label
      .replace('{phone}', siteConfig.phoneDisplay)
      .replace('{phoneTel}', siteConfig.phoneTel),
    href: item.href
      .replace('{phone}', siteConfig.phoneDisplay)
      .replace('{phoneTel}', siteConfig.phoneTel),
  }));

  return (
    <div className="fab" data-component="fab">
      <div ref={menuRef} id="fab-menu" className="fab__menu" hidden={!open}>
        {items.map((item) =>
          item.type === 'tel' || item.href.startsWith('tel:') ? (
            <a key={item.href} className="fab__item" href={item.href} onClick={() => close()}>
              {item.label}
            </a>
          ) : (
            <Link key={item.href} href={item.href} className="fab__item" onClick={() => close()}>
              {item.label}
            </Link>
          ),
        )}
      </div>
      <button
        ref={mainRef}
        type="button"
        className="fab__main"
        aria-expanded={open}
        aria-controls="fab-menu"
        aria-label={open ? forms.closeLabel : forms.openLabel}
        onClick={toggle}
      >
        <IconPlus size={24} />
      </button>
    </div>
  );
}
