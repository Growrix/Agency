import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  as?: "div" | "section" | "main" | "article";
}

const sizeMap = {
  sm: "max-w-[640px]",
  md: "max-w-[768px]",
  lg: "max-w-[960px]",
  xl: "max-w-[1200px]",
  "2xl": "max-w-[1440px]",
};

export function Container({
  children,
  className,
  size = "xl",
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizeMap[size], className)}>
      {children}
    </Tag>
  );
}

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-12 sm:py-16 lg:py-24",
        className,
      )}
    >
      {children}
    </section>
  );
}

interface LinkButtonProps {
  href: string;
  variant?: "primary" | "secondary" | "ghost" | "outline" | "light";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
  external?: boolean;
}

const linkVariantStyles: Record<string, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-hover",
  secondary:
    "bg-secondary text-white hover:bg-secondary-hover",
  light:
    "bg-white text-foreground hover:bg-white/90",
  ghost:
    "bg-transparent text-foreground hover:bg-inset",
  outline:
    "border border-border bg-transparent text-foreground hover:bg-inset",
};

const linkSizeStyles: Record<string, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-13 px-8 text-lg",
};

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  children,
  className,
  external = false,
}: LinkButtonProps) {
  const styles = cn(
    "inline-flex items-center justify-center gap-2 font-semibold rounded-[var(--radius-md)] transition-colors",
    linkVariantStyles[variant],
    linkSizeStyles[size],
    className,
  );

  if (external) {
    return (
      <a
        href={href}
        className={styles}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={styles}>
      {children}
    </Link>
  );
}
