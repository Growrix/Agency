'use client';

import Link from 'next/link';
import type { BlogPost, HomePageContent, InsightsPageContent } from '@/lib/content/types';
import { PageHero } from '@/components/sections/PageHero';
import { CtaBand } from '@/components/sections/CtaBand';
import { useNewsletter } from '@/hooks/useNewsletter';
import { IconArrowRight } from '@/components/icons';

export function InsightsView({
  page,
  posts,
  ctaBand,
  newsletterSuccess,
  newsletterPlaceholder,
}: {
  page: InsightsPageContent;
  posts: BlogPost[];
  ctaBand: HomePageContent['ctaBand'];
  newsletterSuccess: string;
  newsletterPlaceholder: string;
}) {
  const { submit } = useNewsletter(newsletterSuccess);

  return (
    <>
      <PageHero hero={page.hero} />
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="grid3">
            {posts.map((post, i) => (
              <div key={post.id} className="reveal" data-d={String((i % 3) * 80)}>
                <article className="blog-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="blog-img" src={post.image} alt={post.title} loading="lazy" width={800} height={200} />
                  <div className="blog-body">
                    <div className="blog-cat">{post.category}</div>
                    <div className="blog-title">{post.title}</div>
                    <div className="blog-exc">{post.excerpt}</div>
                    <div className="blog-meta">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                    <span className="blog-more">
                      Read more <IconArrowRight size={16} />
                    </span>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-sm" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center' }}>
            <span className="eyebrow" style={{ justifyContent: 'center' }}>{page.newsletter.eyebrow}</span>
            <h2 className="h-display" style={{ textAlign: 'center', maxWidth: 'none' }}>{page.newsletter.title}</h2>
            <p className="h-sub" style={{ textAlign: 'center', marginInline: 'auto' }}>{page.newsletter.lede}</p>
            <form className="nl-form" onSubmit={submit} style={{ display: 'flex', gap: 10, justifyContent: 'center', maxWidth: 440, margin: '28px auto 0' }}>
              <input className="f-input" type="email" placeholder={newsletterPlaceholder} aria-label="Newsletter email" required style={{ flex: 1 }} />
              <button className="btn btn-p" type="submit">
                Subscribe <IconArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </section>
      <CtaBand {...ctaBand} />
    </>
  );
}
