'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useFab } from '@/hooks/use-fab';
import { siteConfig } from '@/config/site.config';
import { IconArrowRight, IconClose, IconContact, IconPhone } from '@/components/icons';

export function Fab() {
  const { open, toggle, close } = useFab();
  const [showTop, setShowTop] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    let rafId = 0;
    const update = () => {
      rafId = 0;
      const next = window.scrollY > 600;
      setShowTop((prev) => (prev === next ? prev : next));
    };
    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        window.requestAnimationFrame(() => triggerRef.current?.focus());
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [close, open]);

  return (
    <div className="fab-wrap">
      <div id="fab-opts" className={`fab-opts ${open ? 'open' : ''}`} hidden={!open} aria-hidden={!open}>
        {showTop ? (
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <button
              type="button"
              id="fab-top"
              className="fab-opt top"
              aria-label={siteConfig.labels.fabBackToTop}
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                })
              }
              style={{ display: 'grid' }}
            >
              <IconArrowRight width={20} height={20} style={{ transform: 'rotate(-90deg)' }} />
              <span className="fab-tip">{siteConfig.labels.fabBackToTop}</span>
            </button>
          </div>
        ) : null}

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <a href={`tel:${siteConfig.phoneTel}`} className="fab-opt call" aria-label={siteConfig.labels.fabCall}>
            <IconPhone width={20} height={20} />
            <span className="fab-tip">{siteConfig.phoneDisplay}</span>
          </a>
        </div>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" className="fab-opt wa" aria-label={siteConfig.labels.fabWhatsapp}>
            <IconContact width={20} height={20} />
            <span className="fab-tip">{siteConfig.labels.fabWhatsapp}</span>
          </a>
        </div>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Link href={siteConfig.consultationPath} className="fab-opt consult" aria-label={siteConfig.labels.fabConsultation}>
            <IconContact width={20} height={20} />
            <span className="fab-tip">{siteConfig.labels.fabConsultation}</span>
          </Link>
        </div>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Link href={siteConfig.aiAssistantPath} className="fab-opt ai" aria-label={siteConfig.labels.fabAiAdvisor}>
            <IconArrowRight width={20} height={20} />
            <span className="fab-tip">{siteConfig.labels.fabAiAdvisor}</span>
          </Link>
        </div>
      </div>

      <button
        type="button"
        id="fab-main"
        ref={triggerRef}
        className={`fab-main ${open ? 'open' : ''}`}
        aria-label={siteConfig.labels.fabQuickActions}
        aria-expanded={open}
        aria-controls="fab-opts"
        onClick={toggle}
      >
        {open ? <IconClose width={20} height={20} /> : <IconPhone width={20} height={20} />}
      </button>
    </div>
  );
}
