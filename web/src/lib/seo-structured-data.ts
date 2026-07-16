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

export type BreadcrumbSchemaItem = {
  name: string;
  path: string;
};

export function buildBreadcrumbListSchema(items: BreadcrumbSchemaItem[]): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path.startsWith("/") ? item.path : `/${item.path}`),
    })),
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

export function buildWebPageSchema(input: {
  name: string;
  description: string;
  path: string;
}): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function buildContactPageSchema(input: {
  name: string;
  description: string;
  path: string;
}): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export type CollectionPageSchemaItem = {
  name: string;
  path: string;
};

export function buildCollectionPageSchema(input: {
  name: string;
  description: string;
  path: string;
  items?: CollectionPageSchemaItem[];
}): JsonLdData {
  const itemListElement = input.items?.map((item, index) => ({
    "@type": "ListItem" as const,
    position: index + 1,
    url: absoluteUrl(item.path.startsWith("/") ? item.path : `/${item.path}`),
    name: item.name,
  }));

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(itemListElement && itemListElement.length > 0
      ? {
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: itemListElement.length,
            itemListElement,
          },
        }
      : {}),
  };
}

export function buildBlogSchema(input: {
  name: string;
  description: string;
  path: string;
  posts?: CollectionPageSchemaItem[];
}): JsonLdData {
  const blogPost = input.posts?.map((post) => ({
    "@type": "BlogPosting" as const,
    headline: post.name,
    url: absoluteUrl(post.path.startsWith("/") ? post.path : `/${post.path}`),
  }));

  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(blogPost && blogPost.length > 0 ? { blogPost } : {}),
  };
}
