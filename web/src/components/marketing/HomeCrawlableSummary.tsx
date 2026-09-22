import Link from "next/link";
import { Container, Section } from "@/components/primitives/Container";
import { getOrderedHomeServices } from "@/lib/home-services";
import { getProductHref } from "@/lib/shop";
import type { BlogPost } from "@/lib/content";
import type { PublicServiceRecord, PublicShopProductRecord } from "@/server/domain/catalog";

/**
 * Server-rendered homepage content.
 *
 * Every below-the-fold homepage section is loaded client-side after `window.load`
 * (see HomeBelowFoldGate + `dynamic(..., { ssr: false })`). Without this block the
 * initial HTML contains only the hero and footer, so crawlers that do not wait for
 * the deferred bundles see almost no body copy or internal links.
 *
 * This is rendered as the gate's server/first-paint fallback and is swapped out for
 * the interactive sections once they load. Keep it lean: plain semantic HTML, no
 * client hooks, no images.
 */

const cardClass =
  "block rounded-md border border-border bg-surface p-5 transition-colors hover:border-border-strong focus-visible:outline-2 focus-visible:outline-offset-2";

const MAX_TEMPLATES = 6;
const MAX_POSTS = 3;

export type HomeCrawlableSummaryProps = {
  services: PublicServiceRecord[];
  featuredTemplates: PublicShopProductRecord[];
  latestBlogPosts: BlogPost[];
};

export function HomeCrawlableSummary({
  services,
  featuredTemplates,
  latestBlogPosts,
}: HomeCrawlableSummaryProps) {
  const orderedServices = getOrderedHomeServices(services);
  const templates = featuredTemplates.slice(0, MAX_TEMPLATES);
  const posts = latestBlogPosts.slice(0, MAX_POSTS);

  return (
    <div data-home-crawlable-summary>
      <Section size="compact" aria-labelledby="home-summary-services">
        <Container>
          <h2 id="home-summary-services" className="text-2xl font-semibold text-text sm:text-3xl">
            Custom websites, SaaS products and mobile apps
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-text-muted">
            Growrix OS is a founder-led studio. We design and build custom websites, SaaS applications and
            mobile apps, set up technical SEO and analytics, and offer ready-made website templates and
            HTML business profiles for teams that want to launch faster.
          </p>

          {orderedServices.length > 0 ? (
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {orderedServices.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services/${service.slug}`} className={cardClass}>
                    <span className="block text-lg font-semibold text-text">{service.title}</span>{" "}
                    <span className="mt-2 block text-sm leading-6 text-text-muted">
                      {service.short_description}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </Container>
      </Section>

      <Section size="compact" aria-labelledby="home-summary-products">
        <Container>
          <h2 id="home-summary-products" className="text-2xl font-semibold text-text sm:text-3xl">
            Website templates and HTML business profiles
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-text-muted">
            Browse production-ready website templates and single-file HTML business profiles for local
            services, corporate and creative businesses. Preview before you buy, or ask for Done-For-You
            setup.
          </p>

          {templates.length > 0 ? (
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {templates.map((product) => (
                <li key={product.slug}>
                  <Link href={getProductHref(product)} className={cardClass}>
                    <span className="block text-lg font-semibold text-text">{product.name}</span>{" "}
                    <span className="mt-1 block text-sm text-text-muted">
                      {product.type} · {product.price}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}

          <p className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
            <Link href="/digital-products/category/website-templates-html-preview" className="text-primary hover:underline">
              All website templates
            </Link>
            <Link href="/digital-products/category/html-business-profiles" className="text-primary hover:underline">
              All HTML business profiles
            </Link>
            <Link href="/digital-products/bundles" className="text-primary hover:underline">
              Bundles
            </Link>
            <Link href="/digital-products/free" className="text-primary hover:underline">
              Free starters
            </Link>
          </p>
        </Container>
      </Section>

      {posts.length > 0 ? (
        <Section size="compact" aria-labelledby="home-summary-blog">
          <Container>
            <h2 id="home-summary-blog" className="text-2xl font-semibold text-text sm:text-3xl">
              Latest field notes
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className={cardClass}>
                    <span className="block text-lg font-semibold text-text">{post.title}</span>{" "}
                    <span className="mt-2 block text-sm leading-6 text-text-muted">{post.excerpt}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      <Section size="compact" aria-label="Explore Growrix OS">
        <Container>
          <p className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
            <Link href="/portfolio" className="text-primary hover:underline">
              Portfolio
            </Link>
            <Link href="/pricing" className="text-primary hover:underline">
              Pricing
            </Link>
            <Link href="/about" className="text-primary hover:underline">
              About the studio
            </Link>
            <Link href="/book-appointment" className="text-primary hover:underline">
              Book a free consultation
            </Link>
          </p>
        </Container>
      </Section>
    </div>
  );
}
