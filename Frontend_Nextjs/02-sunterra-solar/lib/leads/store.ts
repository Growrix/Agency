const STORAGE_KEY = 'sunterra_leads';

export interface LeadRecord {
  type: string;
  data: Record<string, unknown>;
  at: string;
}

export function saveLead(type: string, data: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getLeads();
    existing.push({ type, data, at: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    /* ignore quota errors */
  }
}

export function getLeads(): LeadRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as LeadRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
