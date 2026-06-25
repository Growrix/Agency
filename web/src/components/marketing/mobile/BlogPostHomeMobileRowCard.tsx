"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import type { BlogPost } from "@/lib/content";
import { formatBlogDate } from "@/lib/content";
import { getBlogImage } from "@/lib/site-images";
import { cn } from "@/lib/utils";

type BlogPostHomeMobileRowCardProps = {
  post: BlogPost;
  loadPriority?: boolean;
};

export function BlogPostHomeMobileRowCard({ post, loadPriority = false }: BlogPostHomeMobileRowCardProps) {
  const image = post.coverImage
    ? { src: post.coverImage.url, alt: post.coverImage.alt }
    : getBlogImage(post.slug);

  return (
    <article className="home-mobile-marketing__product-row home-mobile-marketing__product-row--split-desktop">
      <div
        className={cn(
          "home-mobile-marketing__product-row-preview relative overflow-hidden bg-linear-to-br",
          post.accent,
        )}
      >
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority={loadPriority}
            loading={loadPriority ? "eager" : "lazy"}
            sizes="50vw"
            className="object-cover"
          />
        ) : null}
        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-black/10 to-transparent" aria-hidden />
        <span className="home-mobile-marketing__product-row-badge">{post.category}</span>
      </div>

      <div className="home-mobile-marketing__product-row-body">
        <p className="home-mobile-marketing__product-row-label">Blog</p>
        <p className="home-mobile-marketing__product-row-label home-mobile-marketing__product-row-label--sub">
          {formatBlogDate(post.publishedAt)} · {post.readMinutes} min
        </p>
        <h3 className="home-mobile-marketing__product-row-title">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="line-clamp-2 text-xs leading-5 text-text-muted">{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`} className="home-mobile-marketing__product-row-details">
          Read article <ArrowUpRightIcon className="home-mobile-marketing__product-row-details-icon" aria-hidden />
        </Link>
      </div>
    </article>
  );
}
