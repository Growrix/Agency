import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { Badge } from "@/components/primitives/Badge";
import { Card } from "@/components/primitives/Card";
import { ProseArticle } from "@/components/sections/ProseArticle";
import { ShareRail } from "@/components/sections/ShareRail";
import { Comments } from "@/components/sections/Comments";
import { BlogCard } from "@/components/sections/BlogCard";
import { CTABand } from "@/components/sections/CTABand";
import {
  BLOG_POSTS,
  formatBlogDate,
  getBlogPost,
  getRelatedPosts,
} from "@/lib/content";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 2);
  const url = `https://signalatelier.com/blog/${post.slug}`;

  return (
    <>
      {/* Hero */}
      <Section className="pt-10 pb-0">
        <Container width="reading">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
            <Link href="/" className="hover:text-[var(--color-primary)]">Home</Link>
            <ChevronRightIcon className="size-3.5" />
            <Link href="/blog" className="hover:text-[var(--color-primary)]">Blog</Link>
            <ChevronRightIcon className="size-3.5" />
            <span className="text-[var(--color-text)] truncate">{post.title}</span>
          </nav>

          <div className="mt-8">
            <Badge tone="primary">{post.category}</Badge>
            <h1 className="mt-5 font-display text-4xl sm:text-5xl lg:text-[56px] leading-[1.05] tracking-tight text-balance">
              {post.title}
            </h1>
            <p className="mt-5 text-lg text-[var(--color-text-muted)] leading-7 text-pretty">
              {post.excerpt}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-[var(--color-inset)] font-mono text-xs font-semibold">
                  {post.author.initials}
                </span>
                <div>
                  <div className="text-sm font-medium">{post.author.name}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">{post.author.role}</div>
                </div>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">
                {formatBlogDate(post.publishedAt)} · {post.readMinutes} min read
              </span>
            </div>
          </div>
        </Container>

        <Container width="content" className="mt-10">
          <div className={`relative aspect-[21/9] overflow-hidden rounded-[24px] bg-gradient-to-br ${post.accent}`}>
            <div className="absolute inset-0 bg-grid-strong opacity-20" aria-hidden />
          </div>
        </Container>
      </Section>

      {/* Body + share rail */}
      <Section className="pt-12 pb-8">
        <Container width="content">
          <div className="grid gap-8 lg:grid-cols-[64px_1fr]">
            <div>
              <ShareRail url={url} title={post.title} />
            </div>
            <article className="max-w-[720px]">
              <ProseArticle blocks={post.body} />

              <div className="mt-12 flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)] mr-1">
                  Tags
                </span>
                {post.tags.map((t) => (
                  <Link
                    key={t}
                    href={`/blog?tag=${encodeURIComponent(t)}`}
                    className="inline-flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 text-xs hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                  >
                    #{t}
                  </Link>
                ))}
              </div>

              {/* Author card */}
              <Card className="mt-12">
                <div className="flex items-start gap-4">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-mono text-sm font-semibold">
                    {post.author.initials}
                  </span>
                  <div>
                    <div className="font-display text-lg tracking-tight">{post.author.name}</div>
                    <div className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)]">
                      {post.author.role}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-[var(--color-text)]">{post.author.bio}</p>
                  </div>
                </div>
              </Card>

              {/* Comments */}
              <Comments initial={post.comments} />
            </article>
          </div>
        </Container>
      </Section>

      {/* Related */}
      {related.length > 0 && (
        <Section tone="inset" className="py-16">
          <Container>
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-3xl tracking-tight">Continue reading</h2>
              <Link href="/blog" className="text-sm font-medium text-[var(--color-primary)]">
                All articles →
              </Link>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <CTABand
        eyebrow="Work with us"
        title="Want this kind of thinking on your project?"
        description="Tell us what you're building. We'll respond with a written plan within 48 hours."
        primary={{ label: "Book Appointment", href: "/book-appointment" }}
        secondary={{ label: "See services", href: "/services" }}
      />
    </>
  );
}
