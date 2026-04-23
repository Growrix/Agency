import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import type { BlogPost } from "@/lib/content";
import { formatBlogDate } from "@/lib/content";
import { getBlogImage } from "@/lib/site-images";

export function BlogCard({ post, compact = false }: { post: BlogPost; compact?: boolean }) {
  const image = getBlogImage(post.slug);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col h-full overflow-hidden rounded-[20px] border border-border bg-surface transition-[transform,box-shadow,border-color] duration-300 ease-signal hover:-translate-y-1 hover:shadow-(--shadow-2) hover:border-border-strong"
    >
      <div className={`relative ${compact ? "aspect-5/3" : "aspect-video"} overflow-hidden bg-linear-to-br ${post.accent}`}>
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={compact ? "(min-width: 640px) 40vw, 100vw" : "(min-width: 1024px) 35vw, 100vw"}
            className="object-cover transition-transform duration-500 ease-signal group-hover:scale-[1.03]"
          />
        ) : null}
        <div className="absolute inset-0 bg-linear-to-t from-black/72 via-black/18 to-transparent" aria-hidden />
        <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/30 backdrop-blur px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-white">
          {post.category}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl tracking-tight leading-snug group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-text-muted leading-6 text-pretty line-clamp-3">
          {post.excerpt}
        </p>
        <div className="mt-4 flex items-center justify-between text-xs text-text-muted">
          <div className="flex items-center gap-2">
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-inset font-mono text-[10px] font-semibold text-text">
              {post.author.initials}
            </span>
            <span>{post.author.name}</span>
          </div>
          <span className="font-mono">
            {formatBlogDate(post.publishedAt)} · {post.readMinutes} min
          </span>
        </div>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
          Read article <ArrowUpRightIcon className="size-4" />
        </span>
      </div>
    </Link>
  );
}
