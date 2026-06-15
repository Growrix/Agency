'use client';

import type { FormsContent, PageContent } from '@/lib/content/types';
import { siteConfig } from '@/config/site.config';
import { useContactForm } from '@/hooks/useContactForm';
import { Container } from '@/components/ui/Container';
import { PageHero } from '@/components/views/PageHero';

interface ContactViewProps {
  page: PageContent;
  forms: FormsContent;
}

export function ContactView({ page, forms }: ContactViewProps) {
  const { status, statusType, submit } = useContactForm(forms.contact);
  const hero = page.hero ?? { title: page.title, lede: page.description };

  return (
    <>
      <PageHero title={hero.title} lede={hero.lede} breadcrumb={hero.breadcrumb ?? 'Contact'} />
      <section className="content">
        <Container className="split">
          <div>
            <h2 className="section-head__title" style={{ fontSize: '1.25rem' }}>
              Get in touch
            </h2>
            <p className="mt-4 text-text-muted">
              <strong>Phone:</strong>{' '}
              <a href={`tel:${siteConfig.phoneTel}`}>{siteConfig.phoneDisplay}</a>
              <br />
              <strong>Email:</strong> {siteConfig.email}
              <br />
              <strong>Head office:</strong> {siteConfig.address.street}, {siteConfig.address.locality}{' '}
              {siteConfig.address.region} {siteConfig.address.postalCode}
            </p>
            <form data-contact-form aria-label="Contact form" onSubmit={submit}>
              <div className="form__row form__row--2">
                <div className="form__field">
                  <label className="form__label" htmlFor="c-name">
                    Name
                  </label>
                  <input className="form__input" id="c-name" name="name" required autoComplete="name" />
                </div>
                <div className="form__field">
                  <label className="form__label" htmlFor="c-email">
                    Email
                  </label>
                  <input
                    className="form__input"
                    id="c-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>
              <div className="form__field">
                <label className="form__label" htmlFor="c-subject">
                  Subject
                </label>
                <select className="form__select" id="c-subject" name="subject" required defaultValue="">
                  <option value="" disabled>
                    Select
                  </option>
                  {forms.contact.subjects.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form__field">
                <label className="form__label" htmlFor="c-msg">
                  Message
                </label>
                <textarea className="form__textarea" id="c-msg" name="message" required />
              </div>
              <button className="btn btn--primary" type="submit">
                Send message
              </button>
              <p
                className={`form__status ${statusType === 'ok' ? 'form__status--ok' : statusType === 'err' ? 'form__status--err' : ''}`}
                role="status"
                aria-live="polite"
              >
                {status}
              </p>
            </form>
          </div>
          {page.prose && page.prose.length > 0 && (
            <div dangerouslySetInnerHTML={{ __html: page.prose.join('') }} />
          )}
        </Container>
      </section>
    </>
  );
}
