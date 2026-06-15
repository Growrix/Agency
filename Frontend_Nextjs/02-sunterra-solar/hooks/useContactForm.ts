'use client';

import { useCallback, useState } from 'react';
import { saveLead } from '@/lib/leads/store';
import type { FormsContent } from '@/lib/content/types';

export function useContactForm(forms: FormsContent['contact']) {
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState<'ok' | 'err' | ''>('');

  const submit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const data: Record<string, string> = {};
      form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
        'input, select, textarea',
      ).forEach((el) => {
        if (el.name) data[el.name] = el.value;
      });
      saveLead('contact', data);
      setStatus(forms.submitSuccess);
      setStatusType('ok');
      form.reset();
    },
    [forms],
  );

  return { status, statusType, submit };
}
