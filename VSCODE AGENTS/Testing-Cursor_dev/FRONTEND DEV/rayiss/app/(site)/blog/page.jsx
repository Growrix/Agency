import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { CtaStrip, PageHero, SectionWrap } from '@/components/site/PageBlocks';
import { blogPosts } from '@/lib/site-data';

export const metadata = {
  title: 'Blog',
  description: 'Practical guidance from Rayiss on solar, electrical upgrades, and energy planning in NSW.',
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Practical guidance"
        highlight="from site work"
        description="Rayiss articles focus on planning decisions that impact budget, compliance, and long-term system performance."
      />

      <SectionWrap
        eyebrow="Latest"
        title="Articles for real project planning."
        description="Use these guides as a starting point before requesting detailed scope advice."
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(10,10,10,0.08)', padding: 22 }}
              className="group"
            >
              <div className="eyebrow mb-3" style={{ color: '#FF5B1F' }}>
                {post.category}
              </div>
              <h3 className="display" style={{ fontSize: 30, fontWeight: 600, lineHeight: 1.08, marginBottom: 8 }}>
                {post.title}
              </h3>
              <p className="text-sm text-neutral-500 mb-5">
                {post.date} · {post.readTime}
              </p>
              <p style={{ color: '#4A4A45', lineHeight: 1.65, fontSize: 14.5 }}>{post.excerpt}</p>
              <div className="inline-flex items-center gap-2 text-sm font-medium mt-6 group-hover:translate-x-0.5 transition-transform" style={{ color: '#FF5B1F' }}>
                Read article <ArrowUpRight size={14} />
              </div>
            </Link>
          ))}
        </div>
      </SectionWrap>

      <CtaStrip
        title="Need project-specific advice?"
        description="Use the contact route for tailored guidance tied to your property and service scope."
      />
    </>
  );
}
