'use client';

import { useCallback, useEffect, useState } from 'react';
import type { StateData } from '@/lib/content/types';
import {
  calcGeneration,
  calcPaybackYears,
  calcSavings,
  calcSTC,
  calcStcRebate,
  formatAud,
  formatThousands,
  STC_PRICE,
} from '@/lib/solar/calculator';

export interface CalculatorInputs {
  stateCode: string;
  sizeKw: number;
  rate: number;
  selfPct: number;
  fit: number;
  cost: number;
}

export interface CalculatorResults {
  generation: number;
  savings: number;
  stcRebate: number;
  stcCount: number;
  netCost: number;
  payback: number;
  lifetime: number;
  zone: number;
}

export function useSolarCalculator(states: Record<string, StateData>, defaultCost = 9500) {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    stateCode: 'NSW',
    sizeKw: 6.6,
    rate: 32,
    selfPct: 65,
    fit: 5.5,
    cost: defaultCost,
  });
  const [results, setResults] = useState<CalculatorResults | null>(null);

  const compute = useCallback(
    (next?: Partial<CalculatorInputs>) => {
      const merged = { ...inputs, ...next };
      const st = states[merged.stateCode];
      if (!st) return null;
      const gen = calcGeneration(merged.sizeKw, st.psh);
      const savings = calcSavings(gen, merged.rate, merged.selfPct, merged.fit);
      const stcCount = calcSTC(merged.sizeKw, st.zone);
      const stcRebate = stcCount * STC_PRICE;
      const netCost = merged.cost - stcRebate;
      const payback = calcPaybackYears(merged.sizeKw, savings, st.zone, merged.cost);
      const computed: CalculatorResults = {
        generation: gen,
        savings,
        stcRebate,
        stcCount,
        netCost,
        payback,
        lifetime: savings * 25,
        zone: st.zone,
      };
      setResults(computed);
      return computed;
    },
    [inputs, states],
  );

  const update = useCallback((patch: Partial<CalculatorInputs>) => {
    setInputs((prev) => ({ ...prev, ...patch }));
  }, []);

  useEffect(() => {
    compute();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const formatted = results
    ? {
        generation: `${formatThousands(results.generation)} kWh/yr`,
        savings: `${formatAud(results.savings)}/yr`,
        stcRebate: formatAud(results.stcRebate),
        stcCount: formatThousands(results.stcCount),
        netCost: formatAud(results.netCost),
        payback: `${results.payback} yrs`,
        lifetime: formatAud(results.lifetime),
        zone: `Zone ${results.zone}`,
      }
    : null;

  return { inputs, results, formatted, update, compute };
}

export function useSolarCalculatorPreview(states: Record<string, StateData>) {
  return useSolarCalculator(states);
}
