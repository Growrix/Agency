'use client';

import { useCallback, useState } from 'react';
import type { FormsContent, StateData } from '@/lib/content/types';
import { calcSTC, formatAud } from '@/lib/solar/calculator';
import { STC_PRICE } from '@/lib/solar/calculator';

export interface RebateResult {
  stcAmount: string;
  stateMessage: string;
}

export function useRebateChecker(
  states: Record<string, StateData>,
  forms: FormsContent['rebates'],
) {
  const [result, setResult] = useState<RebateResult | null>(null);

  const check = useCallback(
    (stateCode: string, sizeKw: number, hasBattery: boolean) => {
      const st = states[stateCode];
      if (!st) return;
      const stcs = calcSTC(sizeKw, st.zone);
      const stcAud = stcs * STC_PRICE;
      let stateMsg = '';
      if (hasBattery) {
        const key = `${stateCode}_battery`;
        stateMsg =
          forms.stateMessages[key] ??
          forms.stateMessages.default_battery.replace('{state}', st.name);
      } else {
        stateMsg = forms.stateMessages.default.replace('{state}', st.name);
      }
      setResult({
        stcAmount: `${formatAud(stcAud)} (${stcs} STCs)`,
        stateMessage: stateMsg,
      });
    },
    [states, forms],
  );

  return { result, check };
}
