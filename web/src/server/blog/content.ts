import "server-only";

import type { BlogPost } from "@/lib/content";
import { listSanityBlogPosts } from "@/server/sanity/blog";

async function listCmsPosts(): Promise<BlogPost[]> {
  try {
    return await listSanityBlogPosts();
  } catch {
    return [];
  }
}

export async function listBlogPosts(): Promise<BlogPost[]> {
  const posts = await listCmsPosts();
  return [...posts].sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt));
}

export async function listBlogSlugs(): Promise<string[]> {
  const posts = await listBlogPosts();
  return posts.map((post) => post.slug);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await listCmsPosts();
  return posts.find((post) => post.slug === slug);
}

export async function getRelatedPosts(slug: string, limit = 2): Promise<BlogPost[]> {
  const posts = await listBlogPosts();
  const current = posts.find((post) => post.slug === slug);
  if (!current) return [];

  const tags = new Set(current.tags);
  return posts
    .filter((post) => post.slug !== slug)
    .map((post) => ({ post, score: post.tags.filter((tag) => tags.has(tag)).length }))
    .filter((entry) => entry.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score || +new Date(b.post.publishedAt) - +new Date(a.post.publishedAt)
    )
    .slice(0, limit)
    .map((entry) => entry.post);
}

export function getBlogCategoryCounts(posts: BlogPost[]): { category: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of posts) {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
  }

  return Array.from(counts.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count || a.category.localeCompare(b.category));
}

export function getBlogTagCounts(posts: BlogPost[]): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
