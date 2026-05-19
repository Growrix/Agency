import { StarIcon } from "@heroicons/react/24/solid";
import { Card } from "@/components/primitives/Card";
import { cn } from "@/lib/utils";

export type TestimonialData = {
  authorUrl?: string;
  quote: string;
  author: string;
  publishedLabel?: string;
  rating?: number;
  role: string;
  metric?: string;
  source?: string;
};

function getInitials(author: string) {
  return author
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function Testimonial({ data, className }: { data: TestimonialData; className?: string }) {
  const roundedRating = typeof data.rating === "number" ? Math.round(data.rating) : 0;

  return (
    <Card className={cn("h-full flex flex-col", className)}>
      <svg
        viewBox="0 0 24 24"
        className="mb-3 size-7 text-secondary"
        fill="currentColor"
        aria-hidden
      >
        <path d="M7.17 6C4.87 6 3 7.87 3 10.17c0 2.3 1.87 4.17 4.17 4.17.27 0 .53-.03.78-.08-.6 1.96-2.32 3.4-4.45 3.62l.43 1.99c3.95-.6 7.04-4 7.04-8.13C10.97 8.04 9.27 6 7.17 6Zm10.66 0c-2.3 0-4.17 1.87-4.17 4.17 0 2.3 1.87 4.17 4.17 4.17.27 0 .53-.03.78-.08-.6 1.96-2.32 3.4-4.45 3.62l.43 1.99c3.95-.6 7.04-4 7.04-8.13 0-3.7-1.7-5.74-3.8-5.74Z" />
      </svg>
      {(data.rating || data.source || data.publishedLabel) && (
        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-text-muted">
          {typeof data.rating === "number" && (
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-flex items-center gap-0.5">
                {Array.from({ length: 5 }, (_, index) => (
                  <StarIcon
                    key={`${data.author}-star-${index}`}
                    className={cn(
                      "size-4",
                      index < roundedRating
                        ? "text-secondary"
                        : "text-border-strong/45"
                    )}
                  />
                ))}
              </span>
              <span className="font-medium text-text">{data.rating.toFixed(1)}</span>
            </span>
          )}
          {data.source && (
            <span className="rounded-full bg-primary/8 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
              {data.source}
            </span>
          )}
          {data.publishedLabel && <span>{data.publishedLabel}</span>}
        </div>
      )}
      <p className="font-display text-lg leading-7 tracking-tight text-balance flex-1">
        {data.quote}
      </p>
      <div className="mt-6 flex items-center gap-4">
        <div
          className="flex size-10 items-center justify-center rounded-full bg-linear-to-br from-primary to-secondary text-xs font-semibold tracking-[0.14em] text-white"
          aria-hidden
        >
          {getInitials(data.author)}
        </div>
        <div>
          {data.authorUrl ? (
            <a
              href={data.authorUrl}
              target="_blank"
              rel="noreferrer"
              className="font-medium leading-tight transition-colors hover:text-primary"
            >
              {data.author}
            </a>
          ) : (
            <p className="font-medium leading-tight">{data.author}</p>
          )}
          <p className="text-sm leading-tight text-text-muted">{data.role}</p>
        </div>
        {data.metric && (
          <span className="ml-auto rounded-full bg-primary/10 px-2.5 py-1 font-mono text-xs uppercase tracking-wider text-primary">
            {data.metric}
          </span>
        )}
      </div>
    </Card>
  );
}
