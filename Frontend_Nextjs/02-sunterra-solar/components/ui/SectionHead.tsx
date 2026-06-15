import type { SectionHead as SectionHeadType } from '@/lib/content/types';

interface SectionHeadProps extends SectionHeadType {
  center?: boolean;
  row?: boolean;
}

export function SectionHead({ eyebrow, title, lede, link, center, row }: SectionHeadProps) {
  const wrap = center ? 'mx-auto text-center' : row ? 'flex flex-wrap items-end justify-between gap-4' : '';
  return (
    <div className={`mb-10 max-w-3xl ${wrap}`}>
      <div className={row ? 'max-w-3xl' : ''}>
        {eyebrow && (
          <p className="mb-2 text-caption font-bold uppercase tracking-wide text-accent-strong">{eyebrow}</p>
        )}
        <h2 className="text-h2 font-black tracking-tight text-text" style={{ fontSize: 'var(--text-h2)' }}>
          {title}
        </h2>
        {lede && <p className={`mt-3 max-w-prose text-text-muted ${center ? 'mx-auto' : ''}`}>{lede}</p>}
      </div>
      {link && (
        <a href={link.href} className="text-link shrink-0">
          {link.label}
        </a>
      )}
    </div>
  );
}
