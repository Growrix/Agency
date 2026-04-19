import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LinkButton } from "@/components/ui/container";
import { formatBlogDate, type BlogPost } from "@/lib/blog";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

interface BlogPostCardProps {
  post: BlogPost;
  variant?: "default" | "featured" | "compact";
}

export function BlogPostCard({
  post,
  variant = "default",
}: BlogPostCardProps) {
  const compact = variant === "compact";
  const featured = variant === "featured";

  return (
    <Card
      hover
      as="article"
      padding={featured ? "lg" : "md"}
      className={featured ? "lg:grid lg:grid-cols-[1.2fr_minmax(0,1fr)] lg:gap-8" : "h-full"}
    >
      <div
        className={
          featured
            ? "aspect-[4/3] rounded-[var(--radius-lg)] bg-inset border border-border p-6 flex items-end"
            : compact
              ? "aspect-[16/10] rounded-[var(--radius-md)] bg-inset border border-border p-4 flex items-end"
              : "aspect-[16/10] rounded-[var(--radius-md)] bg-inset border border-border p-5 flex items-end"
        }
      >
        <div>
          <span className="inline-flex rounded-full bg-background/80 px-3 py-1 text-xs font-semibold text-foreground border border-border">
            {post.coverLabel}
          </span>
        </div>
      </div>

      <div className={featured ? "mt-6 lg:mt-0" : "mt-5"}>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
          <Badge variant="primary">{post.category}</Badge>
          <span>{formatBlogDate(post.publishedAt)}</span>
          <span>{post.readingTime}</span>
        </div>
        <h3
          className={featured ? "mt-4 text-2xl font-bold tracking-tight" : compact ? "mt-3 text-lg font-bold" : "mt-3 text-xl font-bold"}
          style={{ fontFamily: "var(--font-display)" }}
        >
          {post.title}
        </h3>
        <p className={compact ? "mt-2 text-sm text-muted leading-relaxed" : "mt-3 text-sm text-muted leading-relaxed"}>
          {compact ? post.summary : post.excerpt}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.slice(0, compact ? 2 : 3).map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <div className="mt-5">
          <LinkButton
            href={`/blog/${post.slug}`}
            variant="ghost"
            size="sm"
            className="!h-auto !px-0 text-primary hover:!bg-transparent hover:underline"
          >
            Read article
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </LinkButton>
        </div>
      </div>
    </Card>
  );
}