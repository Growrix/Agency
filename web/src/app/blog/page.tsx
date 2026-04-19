import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { Badge } from "@/components/primitives/Badge";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { BlogCard } from "@/components/sections/BlogCard";
import { BlogSidebar } from "@/components/sections/BlogSidebar";
import {
  BLOG_POSTS,
  formatBlogDate,
  getBlogCategoryCounts,
  getBlogTagCounts,
  type BlogPost,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog — Field notes from Signal Atelier",
  description:
    "Field notes, engineering deep-dives, and studio reflections on building SaaS apps, websites, MCP servers, and automation.",
};

type SearchParams = Promise<{
  category?: string;
  tag?: string;
  q?: string;
}>;

function filterPosts(posts: BlogPost[], { category, tag, q }: { category?: string; tag?: string; q?: string }) {
  let out = posts;
  if (category) out = out.filter((p) => p.category === category);
  if (tag) out = out.filter((p) => p.tags.includes(tag));
  if (q) {
    const needle = q.toLowerCase();
    out = out.filter(
      (p) =>
        p.title.toLowerCase().includes(needle) ||
        p.excerpt.toLowerCase().includes(needle) ||
        p.tags.some((t) => t.toLowerCase().includes(needle))
    );
  }
  return out;
}

export default async function BlogIndexPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const sorted = [...BLOG_POSTS].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt)
  );
  const featured = sorted[0];
  const rest = sorted.slice(1);

  const filtered = filterPosts(sorted, params);
  const isFiltering = !!(params.category || params.tag || params.q);
  const grid = isFiltering ? filtered : rest;

  const categories = getBlogCategoryCounts();
  const tags = getBlogTagCounts();

  const activeChips: { label: string; key: "category" | "tag" | "q"; value: string }[] = [];
  if (params.category) activeChips.push({ label: `Category: ${params.category}`, key: "category", value: params.category });
  if (params.tag) activeChips.push({ label: `Tag: ${params.tag}`, key: "tag", value: params.tag });
  if (params.q) activeChips.push({ label: `Search: "${params.q}"`, key: "q", value: params.q });

  function chipHref(removeKey: string) {
    const next = new URLSearchParams();
    for (const [k, v] of Object.entries(params)) {
      if (v && k !== removeKey) next.set(k, v);
    }
    const qs = next.toString();
    return qs ? `/blog?${qs}` : "/blog";
  }

  return (
    <>
      {/* Hero / featured */}
      <Section className="pt-12 sm:pt-16 pb-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" aria-hidden />
        <Container>
          <div className="max-w-2xl">
            <Badge tone="primary" dot>The Signal Atelier blog</Badge>
            <h1 className="mt-5 font-display text-5xl sm:text-6xl tracking-tight leading-[1.05] text-balance">
              Field notes from a studio that ships.
            </h1>
            <p className="mt-5 text-lg text-[var(--color-text-muted)] leading-7 text-pretty">
              Long-form writing on SaaS architecture, MCP servers, automation, and the studio operating model that keeps it all moving.
            </p>
          </div>

          {!isFiltering && featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group mt-12 grid overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-[var(--color-surface)] hover:shadow-[var(--shadow-3)] transition-all lg:grid-cols-12"
            >
              <div className={`relative aspect-[16/10] lg:aspect-auto lg:col-span-7 bg-gradient-to-br ${featured.accent}`}>
                <div className="absolute inset-0 bg-grid-strong opacity-20" aria-hidden />
                <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-black/30 backdrop-blur px-3 py-1 text-[11px] font-mono uppercase tracking-wider text-white">
                  Featured · {featured.category}
                </div>
              </div>
              <div className="lg:col-span-5 flex flex-col justify-center p-8 lg:p-10">
                <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">
                  {formatBlogDate(featured.publishedAt)} · {featured.readMinutes} min read
                </p>
                <h2 className="mt-3 font-display text-3xl lg:text-[34px] tracking-tight leading-[1.1] group-hover:text-[var(--color-primary)] transition-colors">
                  {featured.title}
                </h2>
                <p className="mt-4 text-[15px] leading-6 text-[var(--color-text-muted)] text-pretty">
                  {featured.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex size-9 items-center justify-center rounded-full bg-[var(--color-inset)] font-mono text-xs font-semibold">
                      {featured.author.initials}
                    </span>
                    <div>
                      <div className="text-sm font-medium">{featured.author.name}</div>
                      <div className="text-xs text-[var(--color-text-muted)]">{featured.author.role}</div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] group-hover:gap-2 transition-all">
                    Read <ArrowUpRightIcon className="size-4" />
                  </span>
                </div>
              </div>
            </Link>
          )}
        </Container>
      </Section>

      {/* Grid + sidebar */}
      <Section className="py-12">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <SectionHeading
                  eyebrow={isFiltering ? "Filtered" : "Latest writing"}
                  title={isFiltering ? `${filtered.length} article${filtered.length === 1 ? "" : "s"}` : "More from the studio"}
                />
              </div>

              {activeChips.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {activeChips.map((c) => (
                    <Link
                      key={c.key}
                      href={chipHref(c.key)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-primary)]/30 bg-[var(--color-primary)]/10 px-3 py-1 text-xs font-medium text-[var(--color-primary)] hover:bg-[var(--color-primary)]/15"
                    >
                      {c.label}
                      <XMarkIcon className="size-3.5" />
                    </Link>
                  ))}
                  <Link
                    href="/blog"
                    className="inline-flex items-center rounded-full border border-[var(--color-border)] px-3 py-1 text-xs font-medium text-[var(--color-text-muted)] hover:bg-[var(--color-inset)]"
                  >
                    Clear all
                  </Link>
                </div>
              )}

              {grid.length === 0 ? (
                <div className="mt-10 rounded-[20px] border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center">
                  <p className="font-display text-2xl tracking-tight">No matching articles.</p>
                  <p className="mt-2 text-[var(--color-text-muted)]">Try clearing filters or searching for a different term.</p>
                  <Link
                    href="/blog"
                    className="mt-4 inline-block text-sm font-medium text-[var(--color-primary)]"
                  >
                    Reset filters →
                  </Link>
                </div>
              ) : (
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {grid.map((p) => (
                    <BlogCard key={p.slug} post={p} />
                  ))}
                </div>
              )}
            </div>

            <div className="lg:col-span-4">
              <BlogSidebar categories={categories} tags={tags} initialSearch={params.q ?? ""} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
