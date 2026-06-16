'use client';

import { useId, useMemo } from 'react';
import type { ContactFormContent, ContactPageContent } from '@/lib/content/types';
import { IconMail, IconPhone, IconPin } from '@/components/icons';
import { PageHero } from '@/components/sections/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { useContactForm } from '@/hooks/use-contact-form';

interface ContactViewProps {
  page: ContactPageContent;
  formContent: ContactFormContent;
}

export function ContactView({ page, formContent }: ContactViewProps) {
  const { onSubmit, submitted, submitLabel, errors, clearFieldError } = useContactForm(
    formContent.headings.successMessage,
    formContent.validation,
  );
  const rows = useMemo(() => page.section.contactRows, [page.section.contactRows]);
  const requirementsId = useId();

  return (
    <>
      <PageHero hero={page.hero} />

      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="grid2">
            <Reveal>
              <span className="eyebrow">{page.section.eyebrow}</span>
              <h2 className="h-d">{page.section.title}</h2>
              <p className="h-sub">{page.section.lede}</p>

              <div style={{ display: 'grid', gap: '16px', marginTop: '28px' }}>
                {rows.map((row) => (
                  <div key={row.label} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div className="btn-ico" style={{ color: 'var(--gold)' }}>
                      {row.type === 'phone' ? <IconPhone width={18} height={18} /> : null}
                      {row.type === 'email' ? <IconMail width={18} height={18} /> : null}
                      {row.type === 'location' ? <IconPin width={18} height={18} /> : null}
                    </div>
                    <div>
                      <div className="f-label">{row.label}</div>
                      <span style={{ fontSize: '15px' }}>{row.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '28px', padding: '18px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--rc)' }}>
                <div
                  style={{
                    fontFamily: 'var(--fm)',
                    fontSize: '11px',
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    color: 'var(--faint)',
                    marginBottom: '12px',
                  }}
                >
                  {page.section.regionalOfficesLabel}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  {page.section.regionalOffices.map((office) => (
                    <div key={office} style={{ fontSize: '13px', color: 'var(--muted)' }}>
                      {office}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={100}>
              <form
                className="lead-form"
                noValidate
                onSubmit={onSubmit}
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--rc)', padding: 'clamp(22px,3vw,36px)', display: 'grid', gap: '14px' }}
              >
                <h3 style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '1.2rem' }}>{formContent.headings.title}</h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <InputField
                    name="full-name"
                    label={formContent.fields.fullNameLabel}
                    placeholder={formContent.placeholders.fullName}
                    required
                    error={errors['full-name']}
                    onValueChange={clearFieldError}
                  />
                  <InputField
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
                  <InputField
                    name="phone"
                    label={formContent.fields.phoneLabel}
                    type="tel"
                    placeholder={formContent.placeholders.phone}
                    onValueChange={clearFieldError}
                  />
                  <SelectField name="budget-range" label={formContent.fields.budgetLabel} options={formContent.options.budget} onValueChange={clearFieldError} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <SelectField
                    name="enquiry-type"
                    label={formContent.fields.enquiryTypeLabel}
                    options={formContent.options.enquiryType}
                    onValueChange={clearFieldError}
                  />
                  <SelectField
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
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

function InputField({
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
        <p id={errorId} role="alert" style={{ marginTop: '6px', fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--destructive)' }}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SelectField({
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
