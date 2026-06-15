'use client';

interface RevealProps {
  children: React.ReactNode;
  delay?: 1 | 2 | 3;
  className?: string;
}

export function Reveal({ children, delay, className = '' }: RevealProps) {
  return (
    <div data-reveal={true} data-reveal-delay={delay} className={className}>
      {children}
    </div>
  );
}
