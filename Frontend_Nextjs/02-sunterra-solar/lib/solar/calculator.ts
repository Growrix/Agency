import zoneFactors from '@/content/zone-factors.json';

const DEEMING = 8;
const STC_PRICE = 38.5;
const DEFAULT_SELF_PCT = 65;
const DEFAULT_FIT = 5.5;

export const zoneFactorsMap = zoneFactors as Record<string, number>;

export function calcSTC(kw: number, zone: number): number {
  const factor = zoneFactorsMap[String(zone)] ?? 1.382;
  return Math.floor(kw * DEEMING * factor);
}

export function calcGeneration(kw: number, psh: number): number {
  return Math.round(kw * psh * 365 * 0.85);
}

export function calcSavings(
  gen: number,
  rate: number,
  selfPct = DEFAULT_SELF_PCT,
  fit = DEFAULT_FIT,
): number {
  const selfUse = gen * (selfPct / 100);
  const exportKwh = gen - selfUse;
  return selfUse * (rate / 100) + exportKwh * (fit / 100);
}

export function calcStcRebate(kw: number, zone: number): number {
  return calcSTC(kw, zone) * STC_PRICE;
}

export function calcPaybackYears(
  kw: number,
  annualSavings: number,
  zone: number,
  systemCost?: number,
  costPerKw = 1200,
): number {
  const gross = systemCost ?? kw * costPerKw;
  const net = gross - calcStcRebate(kw, zone);
  if (annualSavings <= 0) return 0;
  return Math.round((net / annualSavings) * 10) / 10;
}

export function formatAud(n: number): string {
  return `$${Math.round(n).toLocaleString('en-AU')}`;
}

export function formatThousands(n: number): string {
  return Math.round(n).toLocaleString('en-AU');
}

export { DEEMING, STC_PRICE, DEFAULT_SELF_PCT, DEFAULT_FIT };
