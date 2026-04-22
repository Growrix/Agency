import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";
import { Card } from "@/components/primitives/Card";
import { cn } from "@/lib/utils";

export function FeatureCard({
  icon,
  title,
  description,
  href,
  meta,
  className,
}: {
  icon?: ReactNode;
  title: string;
  description: string;
  href?: string;
  meta?: string;
  className?: string;
}) {
  const inner = (
    <>
      {icon && (
        <div className="mb-5 inline-flex size-11 items-center justify-center rounded-sm bg-primary/10 text-primary">
          {icon}
        </div>
      )}
      <h3 className="font-display text-xl tracking-tight">{title}</h3>
      <p className="mt-2 text-text-muted leading-7 text-pretty">{description}</p>
      {meta && (
        <p className="mt-4 font-mono text-xs uppercase tracking-wider text-text-muted">
          {meta}
        </p>
      )}
      {href && (
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
          Explore <ArrowUpRightIcon className="size-4" />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn("group block", className)}>
        <Card hoverable className="h-full">
          {inner}
        </Card>
      </Link>
    );
  }
  return <Card hoverable={false} className={cn("h-full", className)}>{inner}</Card>;
}
