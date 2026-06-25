import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import type { BlogPost } from "@/lib/content";
import { formatBlogDate } from "@/lib/content";

type BlogFeaturedMobileProps = {
  post: BlogPost;
  image?: { src: string; alt: string };
};

export function BlogFeaturedMobile({ post, image }: BlogFeaturedMobileProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="blog-featured-mobile">
      <div className={`blog-featured-mobile__media bg-linear-to-br ${post.accent}`}>
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : null}
        <div className="blog-featured-mobile__media-overlay" aria-hidden />
        <span className="blog-featured-mobile__badge">Featured · {post.category}</span>
      </div>

      <div className="blog-featured-mobile__body">
        <p className="blog-featured-mobile__meta">
          {formatBlogDate(post.publishedAt)} · {post.readMinutes} min read
        </p>
        <h2 className="blog-featured-mobile__title">{post.title}</h2>
        <p className="blog-featured-mobile__excerpt">{post.excerpt}</p>

        <div className="blog-featured-mobile__footer">
          <div className="blog-featured-mobile__author">
            <span className="blog-featured-mobile__author-avatar">{post.author.initials}</span>
            <span>
              <span className="blog-featured-mobile__author-name">{post.author.name}</span>
              <span className="blog-featured-mobile__author-role">{post.author.role}</span>
            </span>
          </div>
          <span className="blog-featured-mobile__read">
            Read <ArrowUpRightIcon className="size-4" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}
