'use client';

import type { FormsContent, HeroContent } from '@/lib/content/types';
import { useHeroQuoteForm } from '@/hooks/useHeroQuoteForm';
import { IconCheck } from '@/components/icons';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';

export function Hero({ content, forms }: { content: HeroContent; forms: FormsContent }) {
  const { status, statusType, submit } = useHeroQuoteForm(forms.hero);

  return (
    <section className="hero">
      <Container>
        <div className="hero__inner">
          <Reveal>
            <p className="hero__eyebrow">
              <IconCheck size={16} />
              {content.eyebrow}
            </p>
            <h1 className="hero__title" id="home-title">
              {content.title} <em>{content.titleHighlight}</em>
            </h1>
            <p className="hero__lede">{content.lede}</p>
            <div className="hero__ctas">
              <Button href={content.ctas[0].href} variant="accent" size="lg">
                {content.ctas[0].label}
              </Button>
              <Button href={content.ctas[1].href} variant="inverse" size="lg">
                {content.ctas[1].label}
              </Button>
            </div>
            <ul className="hero__trust">
              {content.trustChips.map((chip) => (
                <li key={chip} className="chip">
                  <IconCheck size={16} className="chip__icon" />
                  {chip}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={1}>
            <form
              data-hero-quote
              onSubmit={submit}
              className="hero__form"
              aria-label="Quick quote request"
            >
              <h2 className="hero__form-title">{content.form.title}</h2>
              <p className="hero__form-sub">{content.form.subtitle}</p>
              <div className="form__field">
                <label className="form__label" htmlFor="hero-name">
                  Full name
                </label>
                <input className="form__input" id="hero-name" name="name" required autoComplete="name" />
              </div>
              <div className="form__field">
                <label className="form__label" htmlFor="hero-phone">
                  Phone
                </label>
                <input className="form__input" id="hero-phone" name="phone" type="tel" required autoComplete="tel" />
              </div>
              <div className="form__field">
                <label className="form__label" htmlFor="hero-postcode">
                  Postcode
                </label>
                <input
                  className="form__input"
                  id="hero-postcode"
                  name="postcode"
                  required
                  pattern="[0-9]{4}"
                  maxLength={4}
                />
              </div>
              <div className="form__field">
                <label className="form__label" htmlFor="hero-bill">
                  Quarterly electricity bill (AUD)
                </label>
                <select className="form__select" id="hero-bill" name="bill" required defaultValue="">
                  <option value="" disabled>
                    Select range
                  </option>
                  {content.form.billOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
              <button className="btn btn--primary btn--block" type="submit">
                {content.form.submitLabel}
              </button>
              <p
                className={`form__status ${statusType === 'ok' ? 'form__status--ok' : ''}`}
                role="status"
                data-hero-quote-status
              >
                {status}
              </p>
            </form>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

export function TrustBar({ items }: { items: string[] }) {
  return (
    <div className="trust-bar">
      <Container>
        <ul className="trust-bar__list">
          {items.map((item) => (
            <li key={item} className="trust-bar__item">
              <IconCheck size={24} />
              {item}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}
