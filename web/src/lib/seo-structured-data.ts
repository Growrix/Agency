import type { JsonLdData } from "@/components/seo/JsonLd";
import { DEFAULT_OG_IMAGE } from "@/lib/seo-metadata";
import { SITE_NAME, SITE_SOCIAL_LINKS, SITE_URL, absoluteUrl } from "@/lib/site";

/**
 * Clear, unambiguous entity description for Growrix OS. Google's AI Overview has
 * misattributed "Growrix OS" as "a digital copyright and system identifier" belonging
 * to an unrelated Dhaka agency (communicatorsbd.com). Stating explicitly what Growrix OS
 * is — a digital product marketplace and product studio — in Organization/WebSite schema
 * gives Google's Knowledge Graph a first-party signal to disambiguate the entity.
 */
export const ORGANIZATION_DESCRIPTION =
  "Growrix OS is a founder-led product studio and digital marketplace selling production-ready website templates, HTML business profiles, SaaS starters, and AI toolkits, alongside custom website, SaaS, mobile app, automation, technical SEO, and AI business system services.";

export const ORGANIZATION_KNOWS_ABOUT = [
  "Website templates",
  "HTML business profiles",
  "SaaS application development",
  "Mobile app development",
  "Automation systems",
  "Technical SEO",
  "AI business systems",
];

export function buildOrganizationSchema(): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/Favicon.svg"),
    description: ORGANIZATION_DESCRIPTION,
    knowsAbout: ORGANIZATION_KNOWS_ABOUT,
    sameAs: SITE_SOCIAL_LINKS.map((link) => link.href),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: absoluteUrl("/contact"),
      availableLanguage: ["English"],
    },
  };
}

export function buildWebSiteSchema(): JsonLdData {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: ORGANIZATION_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
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

/**
 * Builds a Product schema for digital products sold through the Growrix OS marketplace.
 *
 * Google Search Console flagged the merchant listing for growrixos.com with:
 *   - CRITICAL: Missing field "image"
 *   - Non-critical: Missing field "hasMerchantReturnPolicy" (in "offers")
 *   - Non-critical: Missing field "shippingDetails" (in "offers")
 *
 * Remediation:
 *   - `image` is ALWAYS emitted, falling back to the default OG share image when a product
 *     has no dedicated image (fixes the CRITICAL error).
 *   - `hasMerchantReturnPolicy` declares digital products non-returnable
 *     (`MerchantReturnNotPermitted`, `merchantReturnDays: 0`), which is the accurate policy
 *     for downloadable templates/starters and satisfies the merchant listing requirement.
 *   - `shippingDetails` uses a zero-rate digital delivery profile so merchant listings
 *     validate while `availableDeliveryMethod: DigitalDelivery` keeps the offer digital.
 */
export function buildDigitalProductSchema(input: {
  name: string;
  description?: string;
  url: string;
  category?: string;
  image?: string;
  sku?: string;
  brandName?: string;
  price?: string;
  priceCurrency?: string;
  availability?: string;
}): JsonLdData {
  const image = input.image ?? absoluteUrl(DEFAULT_OG_IMAGE);
  const priceCurrency = input.priceCurrency ?? "USD";

  const schema: JsonLdData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: input.name,
    description: input.description,
    url: input.url,
    image,
    brand: { "@type": "Brand", name: input.brandName ?? SITE_NAME },
  };

  if (input.category) {
    schema.category = input.category;
  }

  if (input.sku) {
    schema.sku = input.sku;
  }

  if (input.price) {
    schema.offers = {
      "@type": "Offer",
      price: input.price,
      priceCurrency,
      availability: input.availability ?? "https://schema.org/InStock",
      url: input.url,
      itemCondition: "https://schema.org/NewCondition",
      availableDeliveryMethod: ["https://schema.org/DigitalDelivery"],
      deliveryLeadTime: {
        "@type": "QuantitativeValue",
        minValue: 0,
        maxValue: 1,
        unitCode: "DAY",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: priceCurrency,
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 1,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 0,
            maxValue: 0,
            unitCode: "DAY",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "US",
        returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
        merchantReturnDays: 0,
        returnFees: "https://schema.org/FreeReturn",
      },
    };
  }

  return schema;
}
