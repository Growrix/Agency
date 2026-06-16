'use client';

import { useId } from 'react';
import type { ContactFormContent } from '@/lib/content/types';
import { useContactForm } from '@/hooks/use-contact-form';

interface ConsultationFormProps {
  formContent: ContactFormContent;
}

export function ConsultationForm({ formContent }: ConsultationFormProps) {
  const { onSubmit, submitted, submitLabel, errors, clearFieldError } = useContactForm(
    formContent.headings.successMessage,
    formContent.validation,
  );
  const requirementsId = useId();

  return (
    <form
      className="lead-form"
      noValidate
      onSubmit={onSubmit}
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--rc)',
        padding: 'clamp(22px,3vw,36px)',
        display: 'grid',
        gap: '14px',
      }}
    >
      <h3 style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '1.2rem' }}>{formContent.headings.title}</h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <FormInput
          name="full-name"
          label={formContent.fields.fullNameLabel}
          placeholder={formContent.placeholders.fullName}
          required
          error={errors['full-name']}
          onValueChange={clearFieldError}
        />
        <FormInput
          name="email"
          label={formContent.fields.emailLabel}
          type="email"
          placeholder={formContent.placeholders.email}
          required
          error={errors.email}
          onValueChange={clearFieldError}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <FormInput
          name="phone"
          label={formContent.fields.phoneLabel}
          type="tel"
          placeholder={formContent.placeholders.phone}
          onValueChange={clearFieldError}
        />
        <FormSelect
          name="budget-range"
          label={formContent.fields.budgetLabel}
          options={formContent.options.budget}
          onValueChange={clearFieldError}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <FormSelect
          name="enquiry-type"
          label={formContent.fields.enquiryTypeLabel}
          options={formContent.options.enquiryType}
          onValueChange={clearFieldError}
        />
        <FormSelect
          name="preferred-location"
          label={formContent.fields.locationLabel}
          options={formContent.options.preferredLocation}
          onValueChange={clearFieldError}
        />
      </div>

      <div>
        <label className="f-label" htmlFor={requirementsId}>
          {formContent.fields.requirementsLabel}
        </label>
        <textarea
          id={requirementsId}
          name="requirements"
          className="f-input"
          rows={4}
          style={{ resize: 'vertical' }}
          placeholder={formContent.placeholders.requirements}
          onInput={() => clearFieldError('requirements')}
        />
      </div>

      <button type="submit" className="btn btn-gold btn-full btn-lg" disabled={submitted}>
        {submitted ? submitLabel : formContent.submitLabel}
      </button>
      <div aria-live="polite" style={{ minHeight: '18px', fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--success-text)' }}>
        {submitted ? submitLabel : ''}
      </div>
      <div style={{ textAlign: 'center', fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--faint)' }}>{formContent.headings.privacyNote}</div>
    </form>
  );
}

function FormInput({
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  error,
  onValueChange,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  error?: string;
  onValueChange: (name: string) => void;
}) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div>
      <label className="f-label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={name}
        className="f-input"
        type={type}
        placeholder={placeholder}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        onInput={() => onValueChange(name)}
      />
      {error ? (
        <p id={errorId} role="alert" className="field-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function FormSelect({
  name,
  label,
  options,
  onValueChange,
}: {
  name: string;
  label: string;
  options: string[];
  onValueChange: (name: string) => void;
}) {
  const id = useId();

  return (
    <div>
      <label className="f-label" htmlFor={id}>
        {label}
      </label>
      <select id={id} name={name} className="f-input" defaultValue={options[0]} onInput={() => onValueChange(name)}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
