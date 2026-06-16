'use client';

import type { ReactNode } from 'react';
import { useReveal } from '@/hooks/use-reveal';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}

export function Reveal({ children, className, delayMs }: RevealProps) {
  const { ref, revealed } = useReveal();

  return (
    <div
      ref={ref}
      className={`reveal${revealed ? ' in' : ''}${className ? ` ${className}` : ''}`}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
