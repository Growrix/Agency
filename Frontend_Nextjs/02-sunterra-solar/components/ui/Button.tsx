import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'accent' | 'secondary' | 'sky' | 'inverse' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const variantClass: Record<Variant, string> = {
  primary: 'bg-primary text-on-primary shadow-sm hover:bg-primary-hover',
  accent: 'bg-accent text-on-accent shadow-[var(--shadow-gold)] hover:brightness-95',
  secondary: 'border border-border-strong bg-transparent text-text hover:bg-surface',
  sky: 'bg-secondary text-[#041018] hover:bg-secondary-hover',
  inverse: 'bg-bg text-text',
  ghost: 'bg-transparent text-primary hover:bg-primary-soft',
};

const sizeClass: Record<Size, string> = {
  sm: 'min-h-9 px-4 text-sm',
  md: 'min-h-11 px-6',
  lg: 'min-h-[3.25rem] px-8 text-lg',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  href?: string;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  block,
  href,
  className = '',
  type,
  children,
  ...props
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] font-semibold no-underline transition-colors ${variantClass[variant]} ${sizeClass[size]} ${block ? 'w-full' : ''} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type ?? 'button'} className={classes} {...props}>
      {children}
    </button>
  );
}
