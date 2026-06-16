'use client';

import { useCountUp } from '@/hooks/use-countup';

interface CountUpProps {
  target: number;
  prefix?: string;
  suffix?: string;
}

export function CountUp({ target, prefix = '', suffix = '' }: CountUpProps) {
  const { ref, value } = useCountUp(target);

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
