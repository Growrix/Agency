import Link from 'next/link';
import type { BlogPost, CaseStudy, FaqItem } from '@/lib/content/types';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/views/PageHero';

export function BlogListView({ posts }: { posts: BlogPost[] }) {
  return (
    <>
      <PageHero title="Sunterra Solar Blog" lede="Expert guides on STCs, NEM tariffs, batteries and Australian solar policy." breadcrumb="Blog" />
      <section className="section-pad">
        <Container>
          <div className="grid gap-4 lg:grid-cols-3">
            {posts.map((p) => (
              <article key={p.id} className="rounded-lg border border-border bg-bg p-5">
                <p className="text-xs text-text-muted">
                  {p.date} · {p.read} · {p.author}
                </p>
                <h2 className="mt-2 text-lg font-bold">
                  <Link href={`/blog/${p.id}`} className="text-text no-underline hover:text-secondary">
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-text-muted">{p.excerpt}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

export function BlogArticleView({ post }: { post: BlogPost }) {
  return (
    <>
      <PageHero title={post.title} lede={`By ${post.author} · ${post.date} · ${post.read}`} breadcrumb={post.title} />
      <section className="section-pad">
        <Container className="max-w-3xl prose-content">
          {post.body.map((block, i) => (
            <div key={i} dangerouslySetInnerHTML={{ __html: block }} />
          ))}
        </Container>
      </section>
    </>
  );
}

export function CaseStudiesListView({ items }: { items: CaseStudy[] }) {
  return (
    <>
      <PageHero title="Case Studies" lede="Real savings across the NEM from residential to commercial." breadcrumb="Case Studies" />
      <section className="section-pad">
        <Container>
          <div className="grid gap-4 lg:grid-cols-2">
            {items.map((c) => (
              <article key={c.id} className="rounded-lg border border-border bg-bg p-5">
                <p className="text-xs text-text-muted">{c.loc}</p>
                <h2 className="mt-1 text-xl font-bold">
                  <Link href={`/case-studies/${c.id}`} className="text-text no-underline hover:text-secondary">
                    {c.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm font-semibold text-secondary">
                  {c.size} · {c.save}
                </p>
                <p className="mt-2 text-sm text-text-muted">{c.sum}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

export function CaseStudyView({ study }: { study: CaseStudy }) {
  return (
    <>
      <PageHero title={study.title} lede={`${study.loc} · ${study.size} · ${study.save}`} breadcrumb={study.title} />
      <section className="section-pad">
        <Container className="max-w-3xl prose-content">
          {study.body.map((block, i) => (
            <div key={i} dangerouslySetInnerHTML={{ __html: block }} />
          ))}
        </Container>
      </section>
    </>
  );
}

export function FaqPageView({ items }: { items: FaqItem[] }) {
  return (
    <>
      <PageHero
        title="Frequently Asked Questions"
        lede="Everything you need to know about solar, STCs, CEC accreditation and the NEM."
        breadcrumb="FAQ"
      />
      <section className="section-pad">
        <Container className="max-w-3xl space-y-2">
          {items.map((item) => (
            <details key={item.question} className="rounded-lg border border-border bg-bg p-4">
              <summary className="cursor-pointer font-semibold">{item.question}</summary>
              <p className="mt-2 text-sm text-text-muted">{item.answer}</p>
            </details>
          ))}
        </Container>
      </section>
    </>
  );
}
