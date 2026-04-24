import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Container, Section } from "@/components/primitives/Container";
import { Badge } from "@/components/primitives/Badge";
import { Card } from "@/components/primitives/Card";
import { LinkButton } from "@/components/primitives/Button";
import { ProseArticle, getProseHeadingId } from "@/components/sections/ProseArticle";
import { ShareRail } from "@/components/sections/ShareRail";
import { Comments } from "@/components/sections/Comments";
import { BlogCard } from "@/components/sections/BlogCard";
import { CTABand } from "@/components/sections/CTABand";
import {
  formatBlogDate,
} from "@/lib/content";
import { getBlogImage } from "@/lib/site-images";
import {
  getBlogPostBySlug,
  getRelatedPosts,
  listBlogSlugs,
} from "@/server/blog/content";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const slugs = await listBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Article not found" };

  const canonical = post.seo?.canonicalUrl ?? `https://www.growrixos.com/blog/${post.slug}`;

  return {
    title: post.seo?.metaTitle ?? post.title,
    description: post.seo?.metaDescription ?? post.excerpt,
    alternates: {
      canonical,
    },
    robots: post.seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: post.seo?.metaTitle ?? post.title,
      description: post.seo?.metaDescription ?? post.excerpt,
      type: "article",
      url: canonical,
      images: post.seo?.ogImageUrl ? [{ url: post.seo.ogImageUrl }] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(slug, 2);
  const heroImage = post.coverImage
    ? { src: post.coverImage.url, alt: post.coverImage.alt }
    : getBlogImage(post.slug);
  const url = `https://growrixos.com/blog/${post.slug}`;
  const articleSections = post.body.flatMap((block, index) => {
    if (block.type !== "h2" && block.type !== "h3") {
      return [];
    }

    return [{
      id: getProseHeadingId(block.text, index),
      label: block.text,
      level: block.type,
    }];
  });

  return (
    <>
      {/* Hero */}
      <Section className="pb-0 pt-8 sm:pt-10">
        <Container width="reading">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs text-text-muted">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRightIcon className="size-3.5" />
            <Link href="/blog" className="hover:text-primary">Blog</Link>
            <ChevronRightIcon className="size-3.5" />
            <span className="text-text truncate">{post.title}</span>
          </nav>

          <div className="mt-8">
            <Badge tone="primary">{post.category}</Badge>
            <h1 className="mt-5 font-display text-3xl leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-[56px]">
              {post.title}
            </h1>
            <p className="mt-5 text-base leading-7 text-text-muted text-pretty sm:text-lg">
              {post.excerpt}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex size-10 items-center justify-center rounded-full bg-inset font-mono text-xs font-semibold">
                  {post.author.initials}
                </span>
                <div>
                  <div className="text-sm font-medium">{post.author.name}</div>
                  <div className="text-xs text-text-muted">{post.author.role}</div>
                </div>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
                {formatBlogDate(post.publishedAt)} · {post.readMinutes} min read
              </span>
            </div>
          </div>
        </Container>

        <Container width="content" className="mt-8 sm:mt-10">
          <div className={`relative aspect-4/3 overflow-hidden rounded-[24px] bg-linear-to-br sm:aspect-21/9 ${post.accent}`}>
            {heroImage ? (
              <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                priority
                sizes="(min-width: 1024px) 80vw, 100vw"
                className="object-cover"
              />
            ) : null}
            <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-transparent" aria-hidden />
          </div>
        </Container>
      </Section>

      {/* Body + share rail */}
      <Section className="pt-12 pb-8">
        <Container width="content">
          <div className="grid gap-6 xl:grid-cols-[72px_minmax(0,1fr)_280px] xl:items-start">
            <article className="order-1 min-w-0 max-w-180 xl:order-2 xl:max-w-none">
              <ProseArticle blocks={post.body} />

              <div className="mt-12 flex flex-wrap items-center gap-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-text-muted mr-1">
                  Tags
                </span>
                {post.tags.map((t) => (
                  <Link
                    key={t}
                    href={`/blog?tag=${encodeURIComponent(t)}`}
                    className="inline-flex items-center rounded-full border border-border bg-surface px-2.5 py-1 text-xs hover:border-primary hover:text-primary"
                  >
                    #{t}
                  </Link>
                ))}
              </div>

              {/* Author card */}
              <Card className="mt-12">
                <div className="flex items-start gap-4">
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-mono text-sm font-semibold">
                    {post.author.initials}
                  </span>
                  <div>
                    <div className="font-display text-lg tracking-tight">{post.author.name}</div>
                    <div className="text-xs font-mono uppercase tracking-wider text-text-muted">
                      {post.author.role}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-text">{post.author.bio}</p>
                  </div>
                </div>
              </Card>

              {/* Comments */}
              <Comments initial={post.comments} />
            </article>

            <div className="order-2 xl:order-1 xl:self-start">
              <div className="rounded-[18px] border border-border bg-surface p-4 shadow-(--shadow-1) xl:rounded-none xl:border-0 xl:bg-transparent xl:p-0 xl:shadow-none">
                <ShareRail url={url} title={post.title} />
              </div>
            </div>

            <aside className="order-3 xl:self-start">
              <div className="grid gap-4 xl:sticky xl:top-24">
                {articleSections.length > 0 && (
                  <Card variant="inset" className="p-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-text-muted">
                      On this page
                    </p>
                    <nav aria-label="On this page" className="mt-4">
                      <ul className="space-y-2.5">
                        {articleSections.map((section) => (
                          <li key={section.id}>
                            <a
                              href={`#${section.id}`}
                              className="block text-sm leading-6 text-text-muted transition-colors hover:text-primary"
                            >
                              {section.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </Card>
                )}

                <Card className="p-5">
                  <p className="font-display text-xl tracking-tight">Turn the article into a plan.</p>
                  <p className="mt-3 text-sm leading-6 text-text-muted">
                    If you already know the problem, route straight into a scoped conversation instead of keeping the decision in your head.
                  </p>
                  <div className="mt-5 grid gap-3">
                    <LinkButton href="/book-appointment" fullWidth>
                      Book appointment
                    </LinkButton>
                    <LinkButton href="/services" variant="outline" fullWidth>
                      Explore services
                    </LinkButton>
                  </div>
                </Card>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {/* Related */}
      {related.length > 0 && (
        <Section tone="inset" className="py-16">
          <Container>
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-3xl tracking-tight">Continue reading</h2>
              <Link href="/blog" className="text-sm font-medium text-primary">
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
