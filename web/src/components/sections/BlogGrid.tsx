"use client";

import { useState } from "react";
import { Button } from "@/components/primitives/Button";
import { BlogCard } from "@/components/sections/BlogCard";
import { RevealGroup, RevealItem } from "@/components/motion/Motion";
import type { BlogPost } from "@/lib/content";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 9;

/**
 * Renders ALL blog post cards in the initial HTML so Google can crawl every
 * `/blog/{slug}` via internal links (not sitemap alone). Visual "Load more"
 * pagination only toggles the `hidden` class — anchors stay in the DOM.
 */
export function BlogGrid({
  posts,
  layout = "responsive",
  className,
}: {
  posts: BlogPost[];
  layout?: "responsive" | "single";
  className?: string;
}) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const hasMore = posts.length > visible;

  return (
    <>
      <RevealGroup
        className={cn(
          "mt-8 grid gap-5",
          layout === "single" ? "grid-cols-1" : "sm:grid-cols-2",
          className,
        )}
        stagger={0.07}
      >
        {posts.map((p, index) => (
          <RevealItem key={p.slug} className={index >= visible ? "hidden" : undefined}>
            <BlogCard post={p} />
          </RevealItem>
        ))}
      </RevealGroup>
      {hasMore && (
        <div className="mt-10 flex flex-col items-center gap-2">
          <Button variant="outline" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
            Load more articles
          </Button>
          <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted">
            Showing {Math.min(visible, posts.length)} of {posts.length}
          </p>
        </div>
      )}
    </>
  );
}
