import { BlogPostCard } from "@/components/blog/post-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Container, LinkButton, Section } from "@/components/ui/container";
import {
  BLOG_POSTS,
  getBlogCategoryCounts,
  getBlogTagCounts,
  getFeaturedBlogPosts,
  getFilteredBlogPosts,
} from "@/lib/blog";
import { SITE_CONFIG } from "@/lib/constants";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Agency Blog | SaaS Build Notes, Automation Playbooks, and Technical Guides",
  description:
    "Practical articles on SaaS product delivery, website performance, MCP servers, automation systems, and technical decision-making.",
};

function normalizeQueryValue(value?: string | string[]) {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

function buildBlogHref(category?: string, tag?: string) {
  const params = new URLSearchParams();

  if (category) {
    params.set("category", category);
  }

  if (tag) {
    params.set("tag", tag);
  }

  const queryString = params.toString();
  return queryString ? `/blog?${queryString}` : "/blog";
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string | string[]; tag?: string | string[] }>;
}) {
  const resolvedSearchParams = await searchParams;
  const selectedCategory = normalizeQueryValue(resolvedSearchParams.category);
  const selectedTag = normalizeQueryValue(resolvedSearchParams.tag);
  const filteredPosts = getFilteredBlogPosts(selectedCategory, selectedTag);
  const featuredPosts = getFeaturedBlogPosts(3);
  const leadPost = featuredPosts[0] ?? BLOG_POSTS[0];
  const supportingPosts = featuredPosts.slice(1);
  const categoryCounts = getBlogCategoryCounts();
  const tagCounts = getBlogTagCounts();
  const hasActiveFilter = Boolean(selectedCategory || selectedTag);

  return (
    <>
      <Section className="pt-16 sm:pt-20 lg:pt-28 pb-10 sm:pb-12">
        <Container size="2xl">
          <Badge variant="info" className="mb-5">
            Insights and Playbooks
          </Badge>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:items-end">
            <div>
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.06]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Practical Notes for Teams Building <span className="text-primary">Real Products</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-muted leading-relaxed">
                Strategy notes, technical guides, and field-tested delivery patterns for SaaS applications,
                websites, MCP servers, and automation systems.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <LinkButton href={`/blog/${leadPost.slug}`} size="lg">
                  Read Featured Article
                  <ArrowRightIcon className="h-4 w-4" />
                </LinkButton>
                <LinkButton href={SITE_CONFIG.bookingUrl} variant="outline" size="lg">
                  Book Appointment
                </LinkButton>
              </div>
            </div>

            <Card padding="lg" className="bg-surface/80">
              <div className="text-sm font-semibold text-muted">What this section covers</div>
              <div className="mt-4 flex flex-wrap gap-2">
                {getBlogTagCounts().slice(0, 6).map((item) => (
                  <Link key={item.tag} href={buildBlogHref(undefined, item.tag)}>
                    <Badge className="hover:bg-inset">{item.tag}</Badge>
                  </Link>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                    {BLOG_POSTS.length}
                  </div>
                  <div className="text-muted">Published notes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                    {categoryCounts.length}
                  </div>
                  <div className="text-muted">Core topics</div>
                </div>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container size="2xl">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                Featured Articles
              </h2>
              <p className="mt-3 text-muted max-w-2xl">
                Content designed to help technical buyers and operators make better build decisions.
              </p>
            </div>
          </div>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <BlogPostCard post={leadPost} variant="featured" />
            <div className="grid gap-6">
              {supportingPosts.map((post) => (
                <BlogPostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <Section className="bg-surface">
        <Container size="2xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div>
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <h2 className="text-3xl font-bold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>
                  Browse the Blog
                </h2>
                {selectedCategory ? <Badge variant="primary">Category: {selectedCategory}</Badge> : null}
                {selectedTag ? <Badge variant="secondary">Tag: {selectedTag}</Badge> : null}
                {hasActiveFilter ? (
                  <Link href="/blog" className="text-sm font-medium text-primary hover:underline">
                    Reset filters
                  </Link>
                ) : null}
              </div>

              {filteredPosts.length === 0 ? (
                <Card padding="lg">
                  <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
                    No posts match this filter yet.
                  </h3>
                  <p className="mt-3 text-muted max-w-xl">
                    Clear the current filter to explore the full article library, or book a call if you want guidance on a specific topic.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <LinkButton href="/blog" variant="outline">
                      Reset filters
                    </LinkButton>
                    <LinkButton href={SITE_CONFIG.bookingUrl}>Book Appointment</LinkButton>
                  </div>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredPosts.map((post) => (
                    <BlogPostCard key={post.slug} post={post} />
                  ))}
                </div>
              )}
            </div>

            <aside className="space-y-5 lg:sticky lg:top-24 self-start">
              <Card>
                <h3 className="text-sm font-semibold text-muted">Sidebar Menu</h3>
                <div className="mt-4 space-y-2">
                  {categoryCounts.map((item) => {
                    const active = item.category === selectedCategory;

                    return (
                      <Link
                        key={item.category}
                        href={buildBlogHref(item.category, selectedTag)}
                        className={active
                          ? "flex items-center justify-between rounded-md bg-inset px-3 py-2 text-sm font-semibold text-foreground"
                          : "flex items-center justify-between rounded-md px-3 py-2 text-sm text-muted transition-colors hover:bg-inset hover:text-foreground"}
                      >
                        <span>{item.category}</span>
                        <span>{item.count}</span>
                      </Link>
                    );
                  })}
                </div>
              </Card>

              <Card>
                <h3 className="text-sm font-semibold text-muted">Popular Tags</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tagCounts.map((item) => {
                    const active = item.tag === selectedTag;

                    return (
                      <Link key={item.tag} href={buildBlogHref(selectedCategory, item.tag)}>
                        <Badge className={active ? "ring-1 ring-primary/30" : undefined}>
                          {item.tag} ({item.count})
                        </Badge>
                      </Link>
                    );
                  })}
                </div>
              </Card>

              <Card>
                <h3 className="text-sm font-semibold text-muted">Editorial Picks</h3>
                <div className="mt-4 space-y-4">
                  {featuredPosts.map((post) => (
                    <div key={post.slug} className="border-b border-border last:border-b-0 last:pb-0 pb-4">
                      <div className="text-xs text-muted">{post.category}</div>
                      <Link href={`/blog/${post.slug}`} className="mt-1 block text-sm font-semibold hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="bg-foreground text-background border-foreground">
                <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-display)" }}>
                  Need a technical second opinion?
                </h3>
                <p className="mt-3 text-sm opacity-70 leading-relaxed">
                  Turn a research thread into a concrete build plan with a discovery call.
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  <LinkButton href={SITE_CONFIG.bookingUrl} variant="light">
                    Book Appointment
                  </LinkButton>
                  <LinkButton href="/portfolio" variant="outline" className="border-white/15 text-white hover:bg-white/10">
                    View Portfolio
                  </LinkButton>
                </div>
              </Card>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}