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

const SANITY_BLOG_POSTS_QUERY = `*[_type == "blogPost" && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc) {
  "slug": slug.current,
  title,
  excerpt,
  "category": coalesce(category->title, category, "Field Notes"),
  "tags": coalesce(tags, []),
  "coverImage": {
    "url": mainImage.asset->url,
    "alt": coalesce(mainImageAlt, title)
  },
  "author": {
    "name": coalesce(author->name, author.name, "Growrix OS"),
    "role": coalesce(author->role, author.role, "Editorial Team"),
    "bio": coalesce(author->bio, author.bio, ""),
    "initials": coalesce(author->initials, author.initials, "GO")
  },
  "publishedAt": string(coalesce(publishedAt, _createdAt))[0..9],
  "readMinutes": coalesce(readMinutes, 6),
  "accent": coalesce(accent, "from-indigo-500 to-violet-600"),
  body,
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
    publishedAt: post.publishedAt,
    readMinutes: post.readMinutes,
    accent: post.accent,
    body: toBlogBody(post.body),
    comments: toBlogComments(post.comments),
  };
}

export async function listSanityBlogPosts(): Promise<BlogPost[]> {
  if (!isSanityConfigured()) {
    return [];
  }

  const client = getSanityClient();
  const posts = await client.fetch<SanityBlogPost[]>(SANITY_BLOG_POSTS_QUERY);
  return posts.map(normalizePost);
}
