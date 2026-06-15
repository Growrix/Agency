'use client';

import Link from 'next/link';
import { siteConfig } from '@/config/site.config';
import { IconPhone } from '@/components/icons';

export function StickyCta() {
  return (
    <div className="sticky-cta lg:hidden">
      <a href={`tel:${siteConfig.phoneTel}`} className="sticky-cta__call">
        <IconPhone size={18} />
        Call now
      </a>
      <Link href="/quote" className="sticky-cta__quote">
        Free quote
      </Link>
    </div>
  );
}
