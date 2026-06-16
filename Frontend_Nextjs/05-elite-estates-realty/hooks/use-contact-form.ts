'use client';

import { FormEvent, useCallback, useState } from 'react';

interface ContactFormValidationMessages {
  required: string;
  invalidEmail: string;
}

type ContactFormState = 'idle' | 'success';

export function useContactForm(successMessage: string, validationMessages: ContactFormValidationMessages) {
  const [status, setStatus] = useState<ContactFormState>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.currentTarget;
      const formData = new FormData(form);
      const nextErrors: Record<string, string> = {};
      const fullName = String(formData.get('full-name') ?? '').trim();
      const email = String(formData.get('email') ?? '').trim();

      if (!fullName) {
        nextErrors['full-name'] = validationMessages.required;
      }

      if (!email) {
        nextErrors.email = validationMessages.required;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        nextErrors.email = validationMessages.invalidEmail;
      }

      if (Object.keys(nextErrors).length > 0) {
        setErrors(nextErrors);
        setStatus('idle');

        const firstInvalidName = Object.keys(nextErrors)[0];
        const firstInvalidElement = form.elements.namedItem(firstInvalidName);
        if (firstInvalidElement instanceof HTMLElement) {
          firstInvalidElement.focus();
        }
        return;
      }

      setErrors({});
      setStatus('success');
      form.reset();
    },
    [validationMessages],
  );

  const clearFieldError = useCallback((fieldName: string) => {
    setStatus('idle');
    setErrors((current) => {
      if (!(fieldName in current)) return current;
      const next = { ...current };
      delete next[fieldName];
      return next;
    });
  }, []);

  const submitted = status === 'success';
  const submitLabel = submitted ? successMessage : null;

  return { submitted, submitLabel, errors, clearFieldError, onSubmit };
}
