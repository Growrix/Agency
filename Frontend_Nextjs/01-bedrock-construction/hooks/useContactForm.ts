'use client';

import { useCallback, useState } from 'react';
import { saveLead } from '@/lib/leads/store';
import type { ContactFormContent } from '@/lib/content/types';

export function useContactForm(forms: ContactFormContent) {
  const [submitted, setSubmitted] = useState(false);

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
      setSubmitted(true);
    },
    [],
  );

  return { submitted, submit, forms };
}
