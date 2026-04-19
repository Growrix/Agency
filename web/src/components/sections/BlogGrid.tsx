"use client";

import { useState } from "react";
import { Button } from "@/components/primitives/Button";
import { BlogCard } from "@/components/sections/BlogCard";
import type { BlogPost } from "@/lib/content";

const PAGE_SIZE = 9;

export function BlogGrid({ posts }: { posts: BlogPost[] }) {
  const [visible, setVisible] = useState(PAGE_SIZE);
  const shown = posts.slice(0, visible);
  const hasMore = posts.length > visible;

  return (
    <>
      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {shown.map((p) => (
          <BlogCard key={p.slug} post={p} />
        ))}
      </div>
      {hasMore && (
        <div className="mt-10 flex flex-col items-center gap-2">
          <Button variant="outline" onClick={() => setVisible((v) => v + PAGE_SIZE)}>
            Load more articles
          </Button>
          <p className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-text-muted)]">
            Showing {shown.length} of {posts.length}
          </p>
        </div>
      )}
    </>
  );
}
