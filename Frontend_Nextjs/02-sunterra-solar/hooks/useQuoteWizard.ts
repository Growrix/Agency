'use client';

import { useCallback, useEffect, useState } from 'react';
import { saveLead } from '@/lib/leads/store';
import { useToast } from '@/hooks/useToast';
import type { FormsContent, StateData } from '@/lib/content/types';
import { calcSTC, formatAud } from '@/lib/solar/calculator';
import { STC_PRICE } from '@/lib/solar/calculator';

const DRAFT_KEY = 'sunterra_quote_draft';

export interface QuoteFormData {
  postcode?: string;
  state?: string;
  property?: string;
  roof?: string;
  bill?: string;
  retailer?: string;
  phase?: string;
  size?: string;
  battery?: string;
  ev?: string;
  name?: string;
  phone?: string;
  email?: string;
  consent?: boolean;
  _step?: number;
}

export function useQuoteWizard(forms: FormsContent['quote'], states: Record<string, StateData>) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QuoteFormData>({});
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState<'ok' | 'err' | ''>('');
  const [stcPreview, setStcPreview] = useState('');
  const { show } = useToast();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as QuoteFormData;
        setData(parsed);
        if (parsed._step) setStep(Math.min(parsed._step, forms.steps.length));
      }
    } catch {
      /* ignore */
    }
  }, [forms.steps.length]);

  const saveDraft = useCallback(
    (next: QuoteFormData, nextStep: number) => {
      const draft = { ...next, _step: nextStep };
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
      } catch {
        /* ignore */
      }
    },
    [],
  );

  const updateField = useCallback(
    (name: string, value: string | boolean) => {
      setData((prev) => {
        const next = { ...prev, [name]: value };
        saveDraft(next, step);
        return next;
      });
    },
    [step, saveDraft],
  );

  const next = useCallback(() => {
    const n = Math.min(step + 1, forms.steps.length);
    setStep(n);
    saveDraft(data, n);
  }, [step, forms.steps.length, data, saveDraft]);

  const prev = useCallback(() => {
    const n = Math.max(step - 1, 1);
    setStep(n);
  }, [step]);

  const submit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const st = states[data.state ?? 'NSW'];
      if (st && data.size) {
        const stcs = calcSTC(Number(data.size), st.zone);
        const stcAud = stcs * STC_PRICE;
        setStcPreview(`Estimated STC rebate: ${formatAud(stcAud)} (${stcs} STCs)`);
      }
      saveLead('quote', data as Record<string, unknown>);
      localStorage.removeItem(DRAFT_KEY);
      setStatus(forms.submitSuccess);
      setStatusType('ok');
      show(forms.submitToast);
      setData({});
      setStep(1);
      e.currentTarget.reset();
    },
    [data, states, forms, show],
  );

  return {
    step,
    steps: forms.steps,
    data,
    status,
    statusType,
    stcPreview,
    updateField,
    next,
    prev,
    submit,
    consentLabel: forms.consentLabel,
    privacyHref: forms.privacyHref,
    demoNote: forms.demoNote,
  };
}
