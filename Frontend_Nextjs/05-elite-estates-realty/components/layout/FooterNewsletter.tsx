'use client';

import { FormEvent, useId, useState } from 'react';
import type { NavigationContent } from '@/lib/content/types';

interface FooterNewsletterProps {
  newsletter: NavigationContent['footerNewsletter'];
}

export function FooterNewsletter({ newsletter }: FooterNewsletterProps) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const emailId = useId();
  const errorId = `${emailId}-error`;

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const emailField = form.elements.namedItem('newsletter-email');

    if (!(emailField instanceof HTMLInputElement) || !emailField.validity.valid) {
      setSubmitted(false);
      setError(newsletter.invalidMessage);
      if (emailField instanceof HTMLElement) {
        emailField.focus();
      }
      return;
    }

    setError(null);
    setSubmitted(true);
    form.reset();
  };

  return (
    <>
      <div className="ft-col-h">{newsletter.title}</div>
      <form className="ft-nl" onSubmit={onSubmit} noValidate>
        <label htmlFor={emailId} style={{ position: 'absolute', width: '1px', height: '1px', margin: '-1px', padding: 0, overflow: 'hidden', clip: 'rect(0 0 0 0)', border: 0 }}>
          {newsletter.emailLabel}
        </label>
        <input
          id={emailId}
          name="newsletter-email"
          type="email"
          required
          placeholder={newsletter.placeholder}
          aria-label={newsletter.emailLabel}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          onInput={() => setError(null)}
        />
        <button type="submit" aria-label={newsletter.submitLabel}>
          {newsletter.submitLabel}
        </button>
      </form>
      {error ? (
        <p id={errorId} role="alert" className="field-error" style={{ marginTop: '8px' }}>
          {error}
        </p>
      ) : null}
      <p aria-live="polite" style={{ minHeight: '18px', marginTop: '8px', fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--gold-t)' }}>
        {submitted ? newsletter.successMessage : ''}
      </p>
    </>
  );
}
