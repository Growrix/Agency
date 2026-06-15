'use client';

import Link from 'next/link';
import type { FormsContent, StateData } from '@/lib/content/types';
import { useQuoteWizard } from '@/hooks/useQuoteWizard';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/views/PageHero';

interface QuoteViewProps {
  forms: FormsContent;
  states: Record<string, StateData>;
}

export function QuoteView({ forms, states }: QuoteViewProps) {
  const wizard = useQuoteWizard(forms.quote, states);
  const { step, steps, data, status, statusType, stcPreview, updateField, next, prev, submit, consentLabel, privacyHref, demoNote } =
    wizard;

  return (
    <>
      <PageHero
        title="Get Your Free Solar Quote"
        lede="Multi-step quote with STC estimate. Draft saved automatically."
        breadcrumb="Quote"
      />
      <section className="content">
        <Container className="max-w-[40rem]">
          <div className="form__steps" role="list" aria-label="Quote progress">
            {steps.map((label, i) => {
              const n = i + 1;
              return (
                <div
                  key={label}
                  className={`form__step ${n === step ? 'is-active' : ''} ${n < step ? 'is-done' : ''}`}
                  role="listitem"
                >
                  {n}. {label}
                </div>
              );
            })}
          </div>
          <form data-quote-form aria-label="Multi-step quote form" onSubmit={submit}>
            <div className="form__panel" hidden={step !== 1}>
              <div className="form__field">
                <label className="form__label" htmlFor="q-postcode">
                  Postcode
                </label>
                <input
                  className="form__input"
                  id="q-postcode"
                  name="postcode"
                  required
                  pattern="[0-9]{4}"
                  maxLength={4}
                  inputMode="numeric"
                  value={data.postcode ?? ''}
                  onChange={(e) => updateField('postcode', e.target.value)}
                />
              </div>
              <div className="form__field">
                <label className="form__label" htmlFor="q-state">
                  State
                </label>
                <select
                  className="form__select"
                  id="q-state"
                  name="state"
                  required
                  value={data.state ?? 'NSW'}
                  onChange={(e) => updateField('state', e.target.value)}
                >
                  {Object.entries(states).map(([code, st]) => (
                    <option key={code} value={code}>
                      {st.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form__field">
                <label className="form__label" htmlFor="q-property">
                  Property type
                </label>
                <select
                  className="form__select"
                  id="q-property"
                  name="property"
                  required
                  value={data.property ?? ''}
                  onChange={(e) => updateField('property', e.target.value)}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {forms.quote.propertyTypes.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form__field">
                <label className="form__label" htmlFor="q-roof">
                  Roof type
                </label>
                <select
                  className="form__select"
                  id="q-roof"
                  name="roof"
                  required
                  value={data.roof ?? ''}
                  onChange={(e) => updateField('roof', e.target.value)}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {forms.quote.roofTypes.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form__panel" hidden={step !== 2}>
              <div className="form__field">
                <label className="form__label" htmlFor="q-bill">
                  Quarterly bill (AUD)
                </label>
                <select
                  className="form__select"
                  id="q-bill"
                  name="bill"
                  required
                  value={data.bill ?? ''}
                  onChange={(e) => updateField('bill', e.target.value)}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {forms.quote.billOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form__field">
                <label className="form__label" htmlFor="q-retailer">
                  Electricity retailer
                </label>
                <input
                  className="form__input"
                  id="q-retailer"
                  name="retailer"
                  placeholder="e.g. AGL, Origin, EnergyAustralia"
                  value={data.retailer ?? ''}
                  onChange={(e) => updateField('retailer', e.target.value)}
                />
              </div>
              <div className="form__field">
                <label className="form__label" htmlFor="q-phase">
                  Supply
                </label>
                <select
                  className="form__select"
                  id="q-phase"
                  name="phase"
                  value={data.phase ?? forms.quote.phaseOptions[0]}
                  onChange={(e) => updateField('phase', e.target.value)}
                >
                  {forms.quote.phaseOptions.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form__panel" hidden={step !== 3}>
              <div className="form__field">
                <label className="form__label" htmlFor="q-size">
                  Preferred system size (kW)
                </label>
                <input
                  className="form__input"
                  id="q-size"
                  name="size"
                  type="number"
                  min={3}
                  max={100}
                  step={0.1}
                  value={data.size ?? '6.6'}
                  onChange={(e) => updateField('size', e.target.value)}
                />
              </div>
              <div className="form__field">
                <label className="form__label" htmlFor="q-battery">
                  Battery interest
                </label>
                <select
                  className="form__select"
                  id="q-battery"
                  name="battery"
                  value={data.battery ?? forms.quote.batteryOptions[0]}
                  onChange={(e) => updateField('battery', e.target.value)}
                >
                  {forms.quote.batteryOptions.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form__field">
                <label className="form__label" htmlFor="q-ev">
                  EV charger
                </label>
                <select
                  className="form__select"
                  id="q-ev"
                  name="ev"
                  value={data.ev ?? forms.quote.evOptions[0]}
                  onChange={(e) => updateField('ev', e.target.value)}
                >
                  {forms.quote.evOptions.map((ev) => (
                    <option key={ev} value={ev}>
                      {ev}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form__panel" hidden={step !== 4}>
              <div className="form__row form__row--2">
                <div className="form__field">
                  <label className="form__label" htmlFor="q-name">
                    Full name
                  </label>
                  <input
                    className="form__input"
                    id="q-name"
                    name="name"
                    required
                    autoComplete="name"
                    value={data.name ?? ''}
                    onChange={(e) => updateField('name', e.target.value)}
                  />
                </div>
                <div className="form__field">
                  <label className="form__label" htmlFor="q-phone">
                    Phone
                  </label>
                  <input
                    className="form__input"
                    id="q-phone"
                    name="phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    value={data.phone ?? ''}
                    onChange={(e) => updateField('phone', e.target.value)}
                  />
                </div>
              </div>
              <div className="form__field">
                <label className="form__label" htmlFor="q-email">
                  Email
                </label>
                <input
                  className="form__input"
                  id="q-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={data.email ?? ''}
                  onChange={(e) => updateField('email', e.target.value)}
                />
              </div>
              <label className="form__check">
                <input
                  type="checkbox"
                  name="consent"
                  required
                  checked={!!data.consent}
                  onChange={(e) => updateField('consent', e.target.checked)}
                />
                {consentLabel}{' '}
                <Link href={privacyHref} className="text-link">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>
            <div className="mt-4 flex flex-wrap gap-4">
              {step > 1 && (
                <button className="btn btn--secondary" type="button" onClick={prev}>
                  Back
                </button>
              )}
              {step < steps.length ? (
                <button className="btn btn--primary" type="button" onClick={next}>
                  Continue
                </button>
              ) : (
                <button className="btn btn--accent" type="submit">
                  Submit quote
                </button>
              )}
            </div>
            <p
              className={`form__status ${statusType === 'ok' ? 'form__status--ok' : statusType === 'err' ? 'form__status--err' : ''}`}
              role="status"
              aria-live="polite"
            >
              {status}
            </p>
            {stcPreview && <p className="form__hint mt-2">{stcPreview}</p>}
            <p className="form__hint mt-4 rounded-md border-l-[3px] border-accent bg-surface p-3">{demoNote}</p>
          </form>
        </Container>
      </section>
    </>
  );
}
