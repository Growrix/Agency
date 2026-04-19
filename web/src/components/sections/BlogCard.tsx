import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import type { BlogPost } from "@/lib/content";
import { formatBlogDate } from "@/lib/content";

export function BlogCard({ post, compact = false }: { post: BlogPost; compact?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-[20px] border border-[var(--color-border)] bg-[var(--color-surface)] hover:shadow-[var(--shadow-2)] hover:border-[var(--color-border-strong)] transition-all duration-200"
    >
      <div className={`relative ${compact ? "aspect-[5/3]" : "aspect-[16/9]"} bg-gradient-to-br ${post.accent}`}>
        <div className="absolute inset-0 bg-grid-strong opacity-20" aria-hidden />
        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/30 backdrop-blur px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-white">
          {post.category}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl tracking-tight leading-snug group-hover:text-[var(--color-primary)] transition-colors">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-6 text-pretty line-clamp-3">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between text-xs text-[var(--color-text-muted)]">
          <div className="flex items-center gap-2">
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-[var(--color-inset)] font-mono text-[10px] font-semibold text-[var(--color-text)]">
              {post.author.initials}
            </span>
            <span>{post.author.name}</span>
          </div>
          <span className="font-mono">
            {formatBlogDate(post.publishedAt)} · {post.readMinutes} min
          </span>
        </div>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-primary)] group-hover:gap-2 transition-all">
          Read article <ArrowUpRightIcon className="size-4" />
        </span>
      </div>
    </Link>
  );
}
