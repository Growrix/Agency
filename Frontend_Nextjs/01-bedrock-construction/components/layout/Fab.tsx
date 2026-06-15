'use client';

import Link from 'next/link';
import { siteConfig } from '@/config/site.config';
import type { FormsContent } from '@/lib/content/types';
import { useFab } from '@/hooks/useFab';
import { IconArrowUp, IconClose, IconPhone } from '@/components/icons';

interface FabProps {
  forms: FormsContent['fab'];
}

export function Fab({ forms }: FabProps) {
  const { open, toggle, close, scrollTop, mainRef } = useFab();

  return (
    <div className="fab-wrap">
      <div id="fab-opts" className={`fab-opts ${open ? 'open' : ''}`}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <button type="button" id="fab-top" className="fab-opt top" aria-label="Back to top" onClick={scrollTop}>
            <IconArrowUp size={20} />
            <span className="fab-tip">Back to top</span>
          </button>
        </div>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <a href={`tel:${siteConfig.phoneTel}`} className="fab-opt call" aria-label="Call us" onClick={() => close()}>
            <IconPhone size={22} />
            <span className="fab-tip">{siteConfig.phoneDisplay}</span>
          </a>
        </div>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <a
            href={`https://wa.me/${siteConfig.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="fab-opt wa"
            aria-label="WhatsApp"
            onClick={() => close()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="fab-tip">WhatsApp</span>
          </a>
        </div>
      </div>
      <button
        ref={mainRef}
        id="fab-main"
        type="button"
        className={`fab-main ${open ? 'open' : ''}`}
        aria-label={open ? forms.closeLabel : forms.openLabel}
        aria-expanded={open}
        onClick={toggle}
      >
        {open ? <IconClose size={22} /> : <IconPhone size={22} />}
      </button>
    </div>
  );
}
