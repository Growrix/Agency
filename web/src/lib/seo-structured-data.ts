import type { JsonLdData } from "@/components/seo/JsonLd";
import { SITE_NAME, SITE_SOCIAL_LINKS, SITE_URL, absoluteUrl } from "@/lib/site";

export function buildOrganizationSchema(): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/Favicon.svg"),
    sameAs: SITE_SOCIAL_LINKS.map((link) => link.href),
  };
}

export function buildWebSiteSchema(): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function buildServiceSchema(input: {
  name: string;
  description: string;
  path: string;
}): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function buildFaqPageSchema(
  faq: { question: string; answer: string }[],
): JsonLdData | null {
  if (faq.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildBlogPostingSchema(input: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  authorName: string;
  imageUrl?: string;
}): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    url: absoluteUrl(`/blog/${input.slug}`),
    datePublished: input.publishedAt,
    author: {
      "@type": "Person",
      name: input.authorName,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/Favicon.svg"),
      },
    },
    ...(input.imageUrl ? { image: input.imageUrl } : {}),
  };
}

export function buildCreativeWorkSchema(input: {
  name: string;
  description: string;
  slug: string;
  imageUrl?: string;
}): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: input.name,
    description: input.description,
    url: absoluteUrl(`/portfolio/${input.slug}`),
    creator: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(input.imageUrl ? { image: input.imageUrl } : {}),
  };
}
