import Link from "next/link";
import { BlogCard } from "@/components/sections/BlogCard";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import type { BlogPost } from "@/lib/content";
import { BLOG_POST_RELATED } from "@/lib/blog-landing-content";

type BlogRelatedMobileProps = {
  posts: BlogPost[];
};

export function BlogRelatedMobile({ posts }: BlogRelatedMobileProps) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="home-mobile-marketing blog-related-mobile">
      <div className="blog-related-mobile__head">
        <MobileMarketingSectionHeader
          titleLead={BLOG_POST_RELATED.titleLead}
          titleAccent={BLOG_POST_RELATED.titleAccent}
          eyebrow="Related"
          align="left"
          className="home-mobile-marketing__header--left max-w-none"
        />
        <Link href={BLOG_POST_RELATED.viewAllHref} className="blog-related-mobile__view-all">
          {BLOG_POST_RELATED.viewAllLabel} →
        </Link>
      </div>

      <div className="blog-related-mobile__grid">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} compact />
        ))}
      </div>
    </div>
  );
}
