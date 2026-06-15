'use client';

import { useCallback, useState } from 'react';
import { saveLead } from '@/lib/leads/store';

export function useNewsletter(successMessage: string) {
  const [message, setMessage] = useState('');

  const submit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const input = form.querySelector<HTMLInputElement>('input[type="email"]');
      if (input?.value) {
        saveLead('newsletter', { email: input.value });
        input.value = '';
        setMessage(successMessage);
      }
    },
    [successMessage],
  );

  return { message, submit };
}
