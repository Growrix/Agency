"use client";

import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import { BlogPostHomeMobileRowCard } from "@/components/marketing/mobile/BlogPostHomeMobileRowCard";
import type { BlogPost } from "@/lib/content";

type FeaturedBlogPostsMobileProps = {
  posts: BlogPost[];
};

export function FeaturedBlogPostsMobile({ posts }: FeaturedBlogPostsMobileProps) {
  return (
    <RevealGroup className="home-mobile-marketing__stack">
      {posts.map((post, index) => (
        <RevealItem key={post.slug}>
          <BlogPostHomeMobileRowCard post={post} loadPriority={index === 0} />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
