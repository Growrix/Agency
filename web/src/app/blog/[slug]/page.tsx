import { BlogCommentForm } from "@/components/blog/comment-form";
import { BlogPostCard } from "@/components/blog/post-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Container, LinkButton, Section } from "@/components/ui/container";
import {
  BLOG_POSTS,
  formatBlogDate,
  getBlogPostBySlug,
  getRelatedBlogPosts,
} from "@/lib/blog";
import { SITE_CONFIG } from "@/lib/constants";
import { ArrowLeftIcon, ArrowRightIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const categoryLinks: Record<string, { label: string; href: string }[]> = {
  "SaaS Applications": [
    { label: "SaaS service", href: "/services/saas-applications" },
    { label: "Pricing", href: "/pricing" },
  ],
  Websites: [
    { label: "Website service", href: "/services/websites" },
    { label: "Portfolio", href: "/portfolio" },
  ],
  "MCP Servers": [
    { label: "MCP service", href: "/services/mcp-servers" },
    { label: "AI Concierge", href: "/ai-concierge" },
  ],
  Automation: [
    { label: "Automation service", href: "/services/automation" },
    { label: "Book Appointment", href: "/book-appointment" },
  ],
};

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Agency Blog",
    };
  }

  return {
    title: `${post.title} | Agency Blog`,
    description: post.summary,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(post.slug, 3);
  const suggestedLinks = categoryLinks[post.category] ?? [];

  return (
    <>
      <Section className="pt-16 sm:pt-20 lg:pt-28 pb-10 sm:pb-12">
        <Container size="xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeftIcon className="h-3.5 w-3.5" />
            Back to Blog
          </Link>

          <Badge variant="primary" className="mb-4">
            {post.category}
          </Badge>
          <h1
            className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.08]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {post.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg text-muted leading-relaxed">
            {post.summary}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted">
            <span>{post.author.name}</span>
            <span>{post.author.role}</span>
            <span>{formatBlogDate(post.publishedAt)}</span>
            <span>{post.readingTime}</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                <Badge>{tag}</Badge>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
            <article className="space-y-10">
              <div className="aspect-video rounded-(--radius-xl) bg-surface border border-border p-8 flex items-end">
                <div>
                  <span className="inline-flex rounded-full bg-background px-3 py-1 text-xs font-semibold border border-border">
                    {post.coverLabel}
                  </span>
                </div>
              </div>

              {post.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-28">
                  <h2
                    className="text-2xl sm:text-3xl font-bold tracking-tight"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {section.title}
                  </h2>
                  <div className="mt-5 space-y-4 text-base leading-8 text-muted">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.highlight ? (
                    <Card className="mt-6 bg-primary/5 border-primary/15">
                      <p className="text-sm leading-relaxed">{section.highlight}</p>
                    </Card>
                  ) : null}
                </section>
              ))}

              <section className="border-t border-border pt-8">
                <h2
                  className="text-2xl font-bold tracking-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Comments
                </h2>
                <p className="mt-3 text-sm text-muted">
                  Discussion and implementation questions from readers following this topic.
                </p>
                <div className="mt-6 space-y-4">
                  {post.comments.length === 0 ? (
                    <Card className="bg-surface/80">
                      <p className="text-sm text-muted">
                        No comments yet. Use the form below to start the discussion.
                      </p>
                    </Card>
                  ) : (
                    post.comments.map((comment) => (
                      <Card key={`${comment.name}-${comment.postedAt}`}>
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div>
                            <div className="font-semibold">{comment.name}</div>
                            <div className="text-xs text-muted">{comment.role}</div>
                          </div>
                          <div className="text-xs text-muted">{formatBlogDate(comment.postedAt)}</div>
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-muted">{comment.message}</p>
                      </Card>
                    ))
                  )}
                </div>
                <Card className="mt-6 bg-surface/80">
                  <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-display)" }}>
                    Add your comment
                  </h3>
                  <p className="mt-2 text-sm text-muted">
                    Ask a follow-up question or share a related implementation lesson.
                  </p>
                  <div className="mt-6">
                    <BlogCommentForm />
                  </div>
                </Card>
              </section>
            </article>

            <aside className="space-y-5 lg:sticky lg:top-24 self-start">
              <Card>
                <h3 className="text-sm font-semibold text-muted">On this page</h3>
                <div className="mt-4 space-y-2">
                  {post.sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block rounded-md px-3 py-2 text-sm text-muted transition-colors hover:bg-inset hover:text-foreground"
                    >
                      {section.title}
                    </a>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="text-sm font-semibold text-muted">Tags</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                      <Badge>{tag}</Badge>
                    </Link>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="text-sm font-semibold text-muted">Related Paths</h3>
                <div className="mt-4 space-y-2">
                  {suggestedLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block rounded-md px-3 py-2 text-sm text-muted transition-colors hover:bg-inset hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </Card>

              <Card className="bg-foreground text-background border-foreground">
                <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-display)" }}>
                  Want help applying this to your build?
                </h3>
                <p className="mt-3 text-sm opacity-70 leading-relaxed">
                  Turn this article into a scoped plan, architecture review, or delivery roadmap.
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  <LinkButton href={SITE_CONFIG.bookingUrl} variant="light">
                    Book Appointment
                  </LinkButton>
                  <LinkButton href="/ai-concierge" variant="outline" className="border-white/15 text-white hover:bg-white/10">
                    <ChatBubbleLeftRightIcon className="h-4 w-4" />
                    Ask the AI Concierge
                  </LinkButton>
                </div>
              </Card>
            </aside>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container size="xl">
          <div className="flex items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                Related Articles
              </h2>
              <p className="mt-3 text-muted max-w-2xl">
                Keep exploring adjacent topics or move from research into delivery planning.
              </p>
            </div>
            <LinkButton href="/blog" variant="outline" className="hidden sm:inline-flex">
              Browse Blog
            </LinkButton>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
              <BlogPostCard key={relatedPost.slug} post={relatedPost} variant="compact" />
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <LinkButton href="/blog" variant="outline">
              Browse Blog
            </LinkButton>
          </div>
        </Container>
      </Section>

      <Section className="bg-foreground text-background">
        <Container size="lg" className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
            Ready to turn research into a build plan?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto opacity-70 leading-relaxed">
            We can turn the topic you just read into a scoped roadmap, technical audit, or delivery sprint.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <LinkButton href={SITE_CONFIG.bookingUrl} variant="light" size="lg">
              Book Appointment
              <ArrowRightIcon className="h-4 w-4" />
            </LinkButton>
            <LinkButton href="/services" variant="outline" size="lg" className="border-white/15 text-white hover:bg-white/10">
              Explore Services
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}