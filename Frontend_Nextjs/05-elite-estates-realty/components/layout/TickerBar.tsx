'use client';

import { useState } from 'react';

interface TickerBarProps {
  items: string[];
  ariaLabel: string;
  pauseLabel: string;
  resumeLabel: string;
}

export function TickerBar({ items, ariaLabel, pauseLabel, resumeLabel }: TickerBarProps) {
  const [paused, setPaused] = useState(false);

  return (
    <section className="ticker-wrap" role="region" aria-label={ariaLabel}>
      <div className="container ticker-inner">
        <button
          type="button"
          className="ticker-toggle"
          aria-pressed={paused}
          onClick={() => setPaused((current) => !current)}
        >
          {paused ? resumeLabel : pauseLabel}
        </button>
        <div className="ticker-track">
          <div className={`ticker${paused ? ' is-paused' : ''}`}>
            <div className="ticker-group">
              {items.map((item, index) => (
                <span className="t-item" key={`primary-${item}-${index}`}>
                  <span className="t-sep" />
                  {item}
                </span>
              ))}
            </div>
            <div className="ticker-group" aria-hidden="true">
              {items.map((item, index) => (
                <span className="t-item" key={`clone-${item}-${index}`}>
                  <span className="t-sep" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
