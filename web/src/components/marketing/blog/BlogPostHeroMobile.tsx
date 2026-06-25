import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { MarketingHeroTitle } from "@/components/marketing/MarketingHeroTitle";
import { Badge } from "@/components/primitives/Badge";
import type { BlogPost } from "@/lib/content";
import { formatBlogDate } from "@/lib/content";

type BlogPostHeroMobileProps = {
  post: BlogPost;
  heroImage?: { src: string; alt: string };
};

export function BlogPostHeroMobile({ post, heroImage }: BlogPostHeroMobileProps) {
  return (
    <div className="blog-post-mobile__hero">
      <nav aria-label="Breadcrumb" className="blog-post-mobile__breadcrumb">
        <Link href="/" className="blog-post-mobile__breadcrumb-link">
          Home
        </Link>
        <ChevronRightIcon className="size-3.5 shrink-0" aria-hidden />
        <Link href="/blog" className="blog-post-mobile__breadcrumb-link">
          Blog
        </Link>
        <ChevronRightIcon className="size-3.5 shrink-0" aria-hidden />
        <span className="blog-post-mobile__breadcrumb-current">{post.title}</span>
      </nav>

      <Badge tone="primary" className="blog-post-mobile__category">
        {post.category}
      </Badge>

      <MarketingHeroTitle title={post.title} layout="block" className="blog-post-mobile__title" />
      <p className="blog-post-mobile__excerpt">{post.excerpt}</p>

      <div className="blog-post-mobile__meta">
        <div className="blog-post-mobile__author">
          <span className="blog-post-mobile__author-avatar">{post.author.initials}</span>
          <span>
            <span className="blog-post-mobile__author-name">{post.author.name}</span>
            <span className="blog-post-mobile__author-role">{post.author.role}</span>
          </span>
        </div>
        <span className="blog-post-mobile__read-time">
          {formatBlogDate(post.publishedAt)} · {post.readMinutes} min read
        </span>
      </div>

      <div className={`blog-post-mobile__cover bg-linear-to-br ${post.accent}`}>
        {heroImage ? (
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : null}
        <div className="blog-post-mobile__cover-overlay" aria-hidden />
      </div>
    </div>
  );
}
