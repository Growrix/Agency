'use client';

import { useCounter } from '@/hooks/useCounters';

export function StatCounter({ counter, suffix }: { counter?: number; suffix?: string }) {
  const ref = useCounter(counter);
  if (counter === undefined) return null;
  return (
    <>
      <span ref={ref}>0</span>
      {suffix ? <span className="stat-suf">{suffix}</span> : null}
    </>
  );
}
