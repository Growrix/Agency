import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "destructive";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-primary)] text-[var(--color-surface)] hover:bg-[var(--color-primary-hover)] shadow-[var(--shadow-1)]",
  secondary:
    "bg-[var(--color-secondary)] text-[var(--color-surface)] hover:bg-[var(--color-secondary-hover)] shadow-[var(--shadow-1)]",
  ghost:
    "bg-transparent text-[var(--color-text)] hover:bg-[var(--color-inset)]",
  outline:
    "border border-[var(--button-outline-border)] bg-[var(--button-outline-bg)] text-[var(--button-outline-text)] hover:border-[var(--button-outline-border-hover)] hover:bg-[var(--button-outline-bg-hover)]",
  destructive:
    "bg-[var(--color-destructive)] text-[var(--color-surface)] hover:opacity-90",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm gap-1.5",
  md: "h-11 px-5 text-[15px] gap-2",
  lg: "h-12 px-6 text-base gap-2",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  className?: string;
  children: ReactNode;
};

const base =
  "inline-flex items-center justify-center rounded-[12px] font-medium tracking-tight transition-[color,background-color,border-color,box-shadow,transform] duration-200 ease-[var(--ease-signal)] disabled:opacity-60 disabled:pointer-events-none whitespace-nowrap will-change-transform hover:-translate-y-px active:translate-y-0 active:scale-[0.97]";

export function Button({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
  children,
  ...rest
}: CommonProps & ComponentPropsWithoutRef<"button">) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], fullWidth && "w-full", className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export function LinkButton({
  href,
  variant = "primary",
  size = "md",
  fullWidth,
  className,
  children,
  ...rest
}: CommonProps & { href: string } & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], fullWidth && "w-full", className)}
      {...rest}
    >
      {children}
    </Link>
  );
}
