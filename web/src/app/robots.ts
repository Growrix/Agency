import type { MetadataRoute } from "next";
import { DISALLOWED_CRAWL_PATHS, SITE_INDEXING_ENABLED, absoluteUrl } from "@/lib/site";

/**
 * AI answer engines and LLM training crawlers.
 *
 * These are listed explicitly rather than relying on the `*` group: several of
 * them (notably Google-Extended and Applebot-Extended) are opt-out by policy,
 * so a site that never names them is treated as undecided. Naming them with an
 * explicit Allow is the first-party signal that Growrix OS content may be used
 * to answer questions about the brand.
 */
const AI_CRAWLER_USER_AGENTS = [
  // OpenAI: training, search index, and live user-triggered fetches.
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic.
  "ClaudeBot",
  "Claude-User",
  "Claude-SearchBot",
  // Perplexity.
  "PerplexityBot",
  "Perplexity-User",
  // Google Gemini / AI Overviews grounding.
  "Google-Extended",
  // Apple Intelligence.
  "Applebot-Extended",
  // Common Crawl — the corpus many smaller models train on.
  "CCBot",
] as const;

/**
 * Crawl policy for search engines and AI answer engines.
 *
 * When indexing is disabled (preview/dev or SITE_INDEXING_ENABLED=false),
 * disallow the entire site for everyone. When enabled (production default),
 * allow public routes and only block private/utility prefixes — never emit
 * Host: (unsupported by Google).
 */
export default function robots(): MetadataRoute.Robots {
  if (!SITE_INDEXING_ENABLED) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  const disallow = [...DISALLOWED_CRAWL_PATHS];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      // Same crawl surface as everyone else, stated explicitly so opt-out
      // crawlers treat public pages as permitted rather than undecided.
      ...AI_CRAWLER_USER_AGENTS.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow,
      })),
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
