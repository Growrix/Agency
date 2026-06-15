'use client';

import type { FormsContent, PageContent, StateData } from '@/lib/content/types';
import { useInspectionForm } from '@/hooks/useInspectionForm';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/views/PageHero';

interface InspectionViewProps {
  page: PageContent;
  forms: FormsContent;
  states: Record<string, StateData>;
}

export function InspectionView({ page, forms, states }: InspectionViewProps) {
  const { status, statusType, submit } = useInspectionForm(forms.inspection);
  const hero = page.hero ?? { title: page.title, lede: page.description };

  return (
    <>
      <PageHero title={hero.title} lede={hero.lede} breadcrumb={hero.breadcrumb ?? 'Inspection'} />
      <section className="content">
        <Container className="max-w-xl">
          <form data-inspection-form aria-label="Inspection booking" onSubmit={submit}>
            <div className="form__row form__row--2">
              <div className="form__field">
                <label className="form__label" htmlFor="i-name">
                  Full name
                </label>
                <input className="form__input" id="i-name" name="name" required autoComplete="name" />
              </div>
              <div className="form__field">
                <label className="form__label" htmlFor="i-phone">
                  Phone
                </label>
                <input className="form__input" id="i-phone" name="phone" type="tel" required autoComplete="tel" />
              </div>
            </div>
            <div className="form__field">
              <label className="form__label" htmlFor="i-email">
                Email
              </label>
              <input className="form__input" id="i-email" name="email" type="email" required autoComplete="email" />
            </div>
            <div className="form__field">
              <label className="form__label" htmlFor="i-address">
                Street address
              </label>
              <input className="form__input" id="i-address" name="address" required autoComplete="street-address" />
            </div>
            <div className="form__row form__row--2">
              <div className="form__field">
                <label className="form__label" htmlFor="i-postcode">
                  Postcode
                </label>
                <input
                  className="form__input"
                  id="i-postcode"
                  name="postcode"
                  required
                  pattern="[0-9]{4}"
                  maxLength={4}
                />
              </div>
              <div className="form__field">
                <label className="form__label" htmlFor="i-state">
                  State
                </label>
                <select className="form__select" id="i-state" name="state" required defaultValue="NSW">
                  {Object.entries(states).map(([code, st]) => (
                    <option key={code} value={code}>
                      {st.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form__field">
              <label className="form__label" htmlFor="i-date">
                Preferred date
              </label>
              <input className="form__input" id="i-date" name="date" type="date" required />
            </div>
            <div className="form__field">
              <label className="form__label" htmlFor="i-time">
                Preferred time
              </label>
              <select className="form__select" id="i-time" name="time" required>
                {forms.inspection.timeSlots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
            <div className="form__field">
              <label className="form__label" htmlFor="i-notes">
                Notes <span className="form__hint">(optional)</span>
              </label>
              <textarea
                className="form__textarea"
                id="i-notes"
                name="notes"
                rows={3}
                placeholder={forms.inspection.notesPlaceholder}
              />
            </div>
            <button className="btn btn--accent btn--block" type="submit">
              Book inspection
            </button>
            <p
              className={`form__status ${statusType === 'ok' ? 'form__status--ok' : statusType === 'err' ? 'form__status--err' : ''}`}
              role="status"
              aria-live="polite"
            >
              {status}
            </p>
          </form>
        </Container>
      </section>
    </>
  );
}
