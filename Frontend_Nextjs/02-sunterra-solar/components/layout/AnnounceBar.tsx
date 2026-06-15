'use client';

import { useEffect, useState } from 'react';
import type { Announcement } from '@/lib/content/types';
import { siteConfig } from '@/config/site.config';
import { IconCheck, IconClose } from '@/components/icons';

const DISMISS_KEY = 'sunterra_announce_dismissed';

interface AnnounceBarProps {
  items: Announcement[];
}

export function AnnounceBar({ items }: AnnounceBarProps) {
  const [index, setIndex] = useState(0);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    try {
      setDismissed(localStorage.getItem(DISMISS_KEY) === 'true');
    } catch {
      setDismissed(false);
    }
  }, []);

  useEffect(() => {
    if (dismissed || items.length <= 1) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % items.length), 4500);
    return () => window.clearInterval(id);
  }, [dismissed, items.length]);

  const dismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, 'true');
    } catch {
      /* ignore */
    }
  };

  if (dismissed || items.length === 0) return null;

  const formatHtml = (html: string) =>
    html.replace(siteConfig.phoneDisplay, `<a href="tel:${siteConfig.phoneTel}">${siteConfig.phoneDisplay}</a>`);

  return (
    <div id="announce" className="announce" data-component="announce">
      <div className="container announce__inner">
        <div className="announce__track" role="status" aria-live="polite">
          {items.map((item, i) => (
            <span
              key={item.id}
              className={`announce__msg ${i === index ? 'is-active' : ''}`}
              data-announce-msg
            >
              <IconCheck size={16} />
              <span dangerouslySetInnerHTML={{ __html: formatHtml(item.html) }} />
            </span>
          ))}
        </div>
        <button
          type="button"
          className="announce__close"
          aria-label="Dismiss announcement bar"
          data-action="dismiss-announce"
          onClick={dismiss}
        >
          <IconClose size={16} />
        </button>
      </div>
    </div>
  );
}
