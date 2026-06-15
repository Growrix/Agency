import type { ReactNode } from 'react';

interface ContainerProps {
  wide?: boolean;
  className?: string;
  children: ReactNode;
}

export function Container({ wide, className = '', children }: ContainerProps) {
  return <div className={`${wide ? 'container-wide' : 'container-site'} ${className}`}>{children}</div>;
}
