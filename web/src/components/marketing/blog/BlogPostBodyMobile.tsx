"use client";

import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Card } from "@/components/primitives/Card";
import { LinkButton } from "@/components/primitives/Button";
import { Comments } from "@/components/sections/Comments";
import { ProseArticle } from "@/components/sections/ProseArticle";
import { ShareRail } from "@/components/sections/ShareRail";
import { BLOG_POST_CTA } from "@/lib/blog-landing-content";
import type { BlogPost } from "@/lib/content";

type ArticleSection = {
  id: string;
  label: string;
  level: "h2" | "h3";
};

type BlogPostBodyMobileProps = {
  post: BlogPost;
  url: string;
  articleSections: ArticleSection[];
};

export function BlogPostBodyMobile({ post, url, articleSections }: BlogPostBodyMobileProps) {
  return (
    <div className="blog-post-mobile__body">
      <ShareRail url={url} title={post.title} className="blog-post-mobile__share" />

      {articleSections.length > 0 ? (
        <details className="blog-post-mobile__toc">
          <summary className="blog-post-mobile__toc-summary">
            On this page
            <ChevronDownIcon className="blog-post-mobile__toc-chevron" aria-hidden />
          </summary>
          <nav aria-label="On this page">
            <ul className="blog-post-mobile__toc-list">
              {articleSections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={section.level === "h3" ? "blog-post-mobile__toc-link blog-post-mobile__toc-link--nested" : "blog-post-mobile__toc-link"}
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      ) : null}

      <Card className="blog-post-mobile__plan-card">
        <p className="blog-post-mobile__plan-title">{BLOG_POST_CTA.sidebarTitle}</p>
        <p className="blog-post-mobile__plan-description">{BLOG_POST_CTA.sidebarDescription}</p>
        <div className="blog-post-mobile__plan-actions">
          <LinkButton href={BLOG_POST_CTA.primaryHref} fullWidth>
            Book appointment
          </LinkButton>
          <LinkButton href={BLOG_POST_CTA.secondaryHref} variant="outline" fullWidth>
            Explore services
          </LinkButton>
        </div>
      </Card>

      <article className="blog-post-mobile__article">
        <ProseArticle blocks={post.body} />

        <div className="blog-post-mobile__tags">
          <span className="blog-post-mobile__tags-label">Tags</span>
          {post.tags.map((tag) => (
            <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`} className="blog-post-mobile__tag">
              #{tag}
            </Link>
          ))}
        </div>

        <Card className="blog-post-mobile__author-card">
          <div className="blog-post-mobile__author-card-inner">
            <span className="blog-post-mobile__author-card-avatar">{post.author.initials}</span>
            <div>
              <div className="blog-post-mobile__author-card-name">{post.author.name}</div>
              <div className="blog-post-mobile__author-card-role">{post.author.role}</div>
              <p className="blog-post-mobile__author-card-bio">{post.author.bio}</p>
            </div>
          </div>
        </Card>

        <Comments initial={post.comments} />
      </article>
    </div>
  );
}
