import Link from 'next/link';
import type { PageContent } from '@/lib/content/types';
import { Container } from '@/components/ui/Container';

interface PageHeroProps {
  title: string;
  lede?: string;
  breadcrumb?: string;
}

export function PageHero({ title, lede, breadcrumb }: PageHeroProps) {
  return (
    <div className="border-b border-border bg-surface py-10">
      <Container>
        {breadcrumb && (
          <nav className="mb-3 text-sm text-text-muted" aria-label="Breadcrumb">
            <Link href="/" className="text-secondary">
              Home
            </Link>
            {' / '}
            <span aria-current="page">{breadcrumb}</span>
          </nav>
        )}
        <h1 className="text-[length:var(--text-h1)] font-black text-text">{title}</h1>
        {lede && <p className="mt-3 max-w-prose text-text-muted">{lede}</p>}
      </Container>
    </div>
  );
}

export function ProsePageView({ page }: { page: PageContent }) {
  return (
    <>
      <PageHero title={page.hero?.title ?? page.title} lede={page.hero?.lede ?? page.description} breadcrumb={page.hero?.breadcrumb} />
      <section className="section-pad">
        <Container className="max-w-3xl">
          <div className="prose-content">
            {page.prose?.map((block, i) => (
              <div key={i} dangerouslySetInnerHTML={{ __html: block }} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
