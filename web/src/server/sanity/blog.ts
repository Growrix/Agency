import "server-only";

import type { BlogBodyBlock, BlogComment, BlogPost } from "@/lib/content";
import { getSanityClient, isSanityConfigured } from "@/server/sanity/client";

type SanityPortableTextChild = { text?: string };

type SanityPortableTextBlock = {
  _type?: string;
  style?: string;
  listItem?: "bullet" | "number";
  children?: SanityPortableTextChild[];
  language?: string;
  code?: string;
  url?: string;
  alt?: string;
  caption?: string;
};

type SanityBlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  coverImage?: {
    url?: string;
    alt?: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    canonicalUrl?: string;
    noIndex?: boolean;
    ogImageUrl?: string;
  };
  author: {
    name: string;
    role: string;
    bio: string;
    initials: string;
  };
  publishedAt: string;
  readMinutes: number;
  accent: string;
  body?: SanityPortableTextBlock[];
  comments?: Array<{
    id?: string;
    author?: string;
    initials?: string;
    postedAt?: string;
    body?: string;
  }>;
};

const SANITY_BLOG_POSTS_QUERY = `*[
  _type == "blogPost" &&
  defined(slug.current) &&
  (!defined(scheduledPublishAt) || dateTime(scheduledPublishAt) <= now())
] | order(coalesce(publishedAt, scheduledPublishAt, _createdAt) desc) {
  "slug": slug.current,
  title,
  excerpt,
  "category": coalesce(categoryRef->title, category->title, category, "Field Notes"),
  "tags": coalesce(tags, []),
  "coverImage": {
    "url": mainImage.asset->url,
    "alt": coalesce(mainImageAlt, title)
  },
  "seo": {
    "metaTitle": seo.metaTitle,
    "metaDescription": seo.metaDescription,
    "canonicalUrl": seo.canonicalUrl,
    "noIndex": seo.noIndex,
    "ogImageUrl": seo.ogImage.asset->url
  },
  "author": {
    "name": coalesce(authorRef->name, author->name, author.name, "Growrix OS"),
    "role": coalesce(authorRef->role, author->role, author.role, "Editorial Team"),
    "bio": coalesce(authorRef->bio, author->bio, author.bio, ""),
    "initials": coalesce(authorRef->initials, author->initials, author.initials, "GO")
  },
  "publishedAt": string(coalesce(publishedAt, scheduledPublishAt, _createdAt))[0..9],
  "readMinutes": coalesce(readMinutes, 6),
  "accent": coalesce(accent, "from-indigo-500 to-violet-600"),
  "body": body[]{
    ...,
    _type == "image" => {
      "_type": "image",
      "url": asset->url,
      "alt": coalesce(alt, title),
      "caption": caption
    }
  },
  "comments": coalesce(comments, [])
}`;

function blockText(block: SanityPortableTextBlock): string {
  return (block.children ?? []).map((child) => child.text ?? "").join("").trim();
}

function toBlogBody(raw: SanityPortableTextBlock[] | undefined): BlogBodyBlock[] {
  if (!raw?.length) {
    return [{ type: "p", text: "" }];
  }

  const out: BlogBodyBlock[] = [];
  let activeListType: "ul" | "ol" | null = null;
  let activeItems: string[] = [];

  const flushList = () => {
    if (!activeListType || activeItems.length === 0) return;
    out.push({ type: activeListType, items: activeItems });
    activeListType = null;
    activeItems = [];
  };

  for (const block of raw) {
    const text = blockText(block);

    if (block._type === "code") {
      flushList();
      out.push({ type: "code", lang: block.language, code: block.code ?? "" });
      continue;
    }

    if (block._type === "codeBlock") {
      flushList();
      out.push({ type: "code", lang: block.language, code: block.code ?? "" });
      continue;
    }

    if (block._type === "image" && block.url) {
      flushList();
      out.push({
        type: "image",
        url: block.url,
        alt: block.alt ?? "Blog image",
        caption: block.caption,
      });
      continue;
    }

    if (block._type !== "block") {
      continue;
    }

    if (block.style === "normal" && text === "---") {
      flushList();
      out.push({ type: "hr" });
      continue;
    }

    if (block.listItem) {
      const nextType = block.listItem === "number" ? "ol" : "ul";
      if (activeListType !== nextType) {
        flushList();
        activeListType = nextType;
      }
      if (text) {
        activeItems.push(text);
      }
      continue;
    }

    flushList();

    if (!text && block.style !== "normal") {
      continue;
    }

    if (block.style === "h2") {
      out.push({ type: "h2", text });
      continue;
    }

    if (block.style === "h3") {
      out.push({ type: "h3", text });
      continue;
    }

    if (block.style === "blockquote") {
      out.push({ type: "quote", text });
      continue;
    }

    out.push({ type: "p", text });
  }

  flushList();

  return out.length > 0 ? out : [{ type: "p", text: "" }];
}

function toBlogComments(raw: SanityBlogPost["comments"]): BlogComment[] {
  return (raw ?? []).map((comment, index) => ({
    id: comment.id ?? `c${index + 1}`,
    author: comment.author ?? "Guest",
    initials: comment.initials ?? "GU",
    postedAt: comment.postedAt ?? new Date().toISOString().slice(0, 10),
    body: comment.body ?? "",
  }));
}

function normalizePost(post: SanityBlogPost): BlogPost {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    tags: post.tags,
    coverImage:
      post.coverImage?.url
        ? {
            url: post.coverImage.url,
            alt: post.coverImage.alt ?? post.title,
          }
        : undefined,
    author: {
      name: post.author.name,
      role: post.author.role,
      bio: post.author.bio,
      initials: post.author.initials,
    },
    seo: post.seo
      ? {
          metaTitle: post.seo.metaTitle,
          metaDescription: post.seo.metaDescription,
          canonicalUrl: post.seo.canonicalUrl,
          noIndex: post.seo.noIndex,
          ogImageUrl: post.seo.ogImageUrl,
        }
      : undefined,
    publishedAt: post.publishedAt,
    readMinutes: post.readMinutes,
    accent: post.accent,
    body: toBlogBody(post.body),
    comments: toBlogComments(post.comments),
  };
}

export async function listSanityBlogPosts(): Promise<BlogPost[]> {
  if (!isSanityConfigured()) {
     console.warn("[Sanity] Sanity is not configured (missing SANITY_PROJECT_ID or SANITY_DATASET). Blog posts will be empty.");
     return [];
  }

  const client = getSanityClient();
  try {
    const posts = await client.fetch<SanityBlogPost[]>(SANITY_BLOG_POSTS_QUERY);
    return (posts ?? []).map(normalizePost);
  } catch {
    // Log instead of silently swallowing — critical for diagnosing live publish failures.
    console.error("[Sanity] Failed to fetch blog posts from Sanity CMS. Check SANITY_PROJECT_ID, SANITY_DATASET, and network connectivity.");
    return [];
  }
}
