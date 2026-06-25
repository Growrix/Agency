"use client";

import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { BlogGrid } from "@/components/sections/BlogGrid";
import { BlogFeaturedMobile } from "@/components/marketing/blog/BlogFeaturedMobile";
import { BlogSidebarMobile } from "@/components/marketing/blog/BlogSidebarMobile";
import { MobileMarketingSectionHeader } from "@/components/marketing/mobile/MobileMarketingSectionHeader";
import type { BlogPost } from "@/lib/content";
import { BLOG_LANDING_LISTING } from "@/lib/blog-landing-content";

type ActiveChip = {
  label: string;
  key: "category" | "tag" | "q";
  value: string;
  href: string;
};

type BlogIndexListingMobileProps = {
  grid: BlogPost[];
  featured?: BlogPost;
  featuredImage?: { src: string; alt: string };
  categories: { category: string; count: number }[];
  tags: { tag: string; count: number }[];
  initialSearch?: string;
  isFiltering: boolean;
  filteredCount: number;
  activeChips: ActiveChip[];
};

export function BlogIndexListingMobile({
  grid,
  featured,
  featuredImage,
  categories,
  tags,
  initialSearch = "",
  isFiltering,
  filteredCount,
  activeChips,
}: BlogIndexListingMobileProps) {
  return (
    <div className="home-mobile-marketing blog-index-mobile">
      <BlogSidebarMobile categories={categories} tags={tags} initialSearch={initialSearch} />

      {!isFiltering && featured ? (
        <BlogFeaturedMobile post={featured} image={featuredImage} />
      ) : null}

      <MobileMarketingSectionHeader
        eyebrow={isFiltering ? BLOG_LANDING_LISTING.eyebrowFiltered : BLOG_LANDING_LISTING.eyebrowLatest}
        title={isFiltering ? `${filteredCount} article${filteredCount === 1 ? "" : "s"}` : BLOG_LANDING_LISTING.titleLatest}
        align="left"
        className="home-mobile-marketing__header--left max-w-none blog-index-mobile__listing-header"
      />

      {activeChips.length > 0 ? (
        <div className="blog-index-mobile__chips">
          {activeChips.map((chip) => (
            <Link key={chip.key} href={chip.href} className="blog-index-mobile__chip">
              {chip.label}
              <XMarkIcon className="size-3.5" aria-hidden />
            </Link>
          ))}
          <Link href="/blog" className="blog-index-mobile__chip blog-index-mobile__chip--muted">
            Clear all
          </Link>
        </div>
      ) : null}

      {grid.length === 0 ? (
        <div className="blog-index-mobile__empty">
          <p className="blog-index-mobile__empty-title">{BLOG_LANDING_LISTING.emptyTitle}</p>
          <p className="blog-index-mobile__empty-description">{BLOG_LANDING_LISTING.emptyDescription}</p>
          <Link href="/blog" className="blog-index-mobile__empty-link">
            {BLOG_LANDING_LISTING.emptyCta} →
          </Link>
        </div>
      ) : (
        <BlogGrid posts={grid} layout="single" className="blog-index-mobile__grid" />
      )}
    </div>
  );
}
