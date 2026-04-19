import { Card } from "@/components/primitives/Card";
import { cn } from "@/lib/utils";

export type TestimonialData = {
  quote: string;
  author: string;
  role: string;
  metric?: string;
};

export function Testimonial({ data, className }: { data: TestimonialData; className?: string }) {
  return (
    <Card className={cn("h-full flex flex-col", className)}>
      <svg
        viewBox="0 0 24 24"
        className="size-7 text-[var(--color-secondary)] mb-3"
        fill="currentColor"
        aria-hidden
      >
        <path d="M7.17 6C4.87 6 3 7.87 3 10.17c0 2.3 1.87 4.17 4.17 4.17.27 0 .53-.03.78-.08-.6 1.96-2.32 3.4-4.45 3.62l.43 1.99c3.95-.6 7.04-4 7.04-8.13C10.97 8.04 9.27 6 7.17 6Zm10.66 0c-2.3 0-4.17 1.87-4.17 4.17 0 2.3 1.87 4.17 4.17 4.17.27 0 .53-.03.78-.08-.6 1.96-2.32 3.4-4.45 3.62l.43 1.99c3.95-.6 7.04-4 7.04-8.13 0-3.7-1.7-5.74-3.8-5.74Z" />
      </svg>
      <p className="font-display text-lg leading-7 tracking-tight text-balance flex-1">
        {data.quote}
      </p>
      <div className="mt-6 flex items-center gap-4">
        <div className="size-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)]" aria-hidden />
        <div>
          <p className="font-medium leading-tight">{data.author}</p>
          <p className="text-sm text-[var(--color-text-muted)] leading-tight">{data.role}</p>
        </div>
        {data.metric && (
          <span className="ml-auto font-mono text-xs uppercase tracking-wider text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-2.5 py-1 rounded-full">
            {data.metric}
          </span>
        )}
      </div>
    </Card>
  );
}
