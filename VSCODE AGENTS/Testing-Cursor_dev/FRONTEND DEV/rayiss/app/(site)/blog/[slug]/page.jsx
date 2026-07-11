import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { CtaStrip, PageHero, SectionWrap } from '@/components/site/PageBlocks';
import { blogPosts, getBlogPost } from '@/lib/site-data';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: 'Article not found' };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        highlight=""
        description={`${post.date} · ${post.readTime}`}
        ctaHref={post.relatedHref}
        ctaLabel={`Explore ${post.relatedLabel}`}
      />

      <SectionWrap
        eyebrow="Article"
        title="Straightforward field guidance."
        description="Each article is scoped for practical use and links back to a relevant Rayiss service route."
      >
        <article style={{ background: '#fff', border: '1px solid rgba(10,10,10,0.08)', borderRadius: 18, padding: 28 }}>
          <div className="space-y-5">
            {post.body.map((paragraph) => (
              <p key={paragraph} style={{ color: '#4A4A45', fontSize: 16, lineHeight: 1.75 }}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 pt-7 border-t hairline flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: '#FF5B1F' }}>
              <ArrowLeft size={14} /> Back to blog
            </Link>
            <Link href={post.relatedHref} className="inline-flex items-center gap-2 text-sm font-medium" style={{ color: '#FF5B1F' }}>
              Related service: {post.relatedLabel} <ArrowUpRight size={14} />
            </Link>
          </div>
        </article>
      </SectionWrap>

      <CtaStrip
        title="Need help applying this to your site?"
        description="Share your location, property type, and goals for a practical recommendation."
      />
    </>
  );
}
