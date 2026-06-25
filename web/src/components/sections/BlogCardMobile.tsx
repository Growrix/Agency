import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import type { BlogPost } from "@/lib/content";
import { formatBlogDate } from "@/lib/content";
import { getBlogImage } from "@/lib/site-images";
import { cn } from "@/lib/utils";

export function BlogCardMobile({ post, compact = false }: { post: BlogPost; compact?: boolean }) {
  const image = post.coverImage
    ? { src: post.coverImage.url, alt: post.coverImage.alt }
    : getBlogImage(post.slug);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn("home-mobile-marketing__blog-card", compact && "home-mobile-marketing__blog-card--compact")}
    >
      <div
        className={cn(
          "home-mobile-marketing__blog-card-media relative overflow-hidden bg-linear-to-br",
          post.accent,
          compact && "home-mobile-marketing__blog-card-media--compact",
        )}
      >
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            loading="lazy"
            sizes="100vw"
            className="object-cover"
          />
        ) : null}
        <span className="home-mobile-marketing__blog-card-category">{post.category}</span>
      </div>
      <div className="home-mobile-marketing__blog-card-body">
        <h3 className="home-mobile-marketing__blog-card-title">{post.title}</h3>
        <p className="home-mobile-marketing__blog-card-excerpt">{post.excerpt}</p>
        <div className="home-mobile-marketing__blog-card-meta">
          <span>{post.author.name}</span>
          <span>
            {formatBlogDate(post.publishedAt)} · {post.readMinutes} min
          </span>
        </div>
        <span className="home-mobile-marketing__blog-card-cta">
          Read article <ArrowUpRightIcon className="size-3.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
