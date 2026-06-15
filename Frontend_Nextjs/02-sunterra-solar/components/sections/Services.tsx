import Link from 'next/link';
import type { HomePageContent, ServiceItem } from '@/lib/content/types';
import { IconCheck, ServiceIcon } from '@/components/icons';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHead } from '@/components/ui/SectionHead';

export function Services({ head, items }: { head: HomePageContent['services']; items: ServiceItem[] }) {
  return (
    <section className="section-pad">
      <Container>
        <Reveal>
          <SectionHead {...head} row link={head.link} />
        </Reveal>
        <div className="card-grid card-grid--3">
          {items.map((s, i) => (
            <Reveal key={s.id} delay={(i % 3) as 1 | 2 | 3}>
              <article className="scard">
                <div className="scard__icon">
                  <ServiceIcon href={s.href} size={22} />
                </div>
                <h3 className="scard__title">
                  <Link href={s.href}>{s.title}</Link>
                </h3>
                <p className="scard__text">{s.description}</p>
                <Link href={s.href} className="scard__link">
                  Learn more →
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function WhySolar({ content }: { content: HomePageContent['whySolar'] }) {
  return (
    <section className="section-pad section-surface">
      <Container>
        <Reveal>
          <SectionHead eyebrow={content.eyebrow} title={content.title} center />
        </Reveal>
        <div className="card-grid card-grid--4">
          {content.pillars.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) as 1 | 2 | 3}>
              <div className="pillar">
                <div className="pillar__icon">
                  <IconCheck size={26} />
                </div>
                <h3 className="pillar__title">{p.title}</h3>
                <p className="pillar__text">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function RebatesBand({ content }: { content: HomePageContent['rebatesBand'] }) {
  return (
    <section className="rebates-band">
      <Container>
        <Reveal>
          <div className="rebates-band__inner">
            <div>
              <h2 className="rebates-band__title">{content.title}</h2>
              <p className="mt-3 opacity-90">{content.lede}</p>
            </div>
            <ul className="rebates-band__list">
              {content.items.map((item) => (
                <li key={item}>
                  <IconCheck size={18} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <a href={content.cta.href} className="btn btn--accent mt-6">
            {content.cta.label}
          </a>
        </Reveal>
      </Container>
    </section>
  );
}

export function WhyUs({ content }: { content: HomePageContent['whyUs'] }) {
  return (
    <section className="section-pad">
      <Container className="split">
        <Reveal>
          <SectionHead eyebrow={content.eyebrow} title={content.title} lede={content.lede} />
          <a href={content.cta.href} className="btn btn--primary">
            {content.cta.label}
          </a>
        </Reveal>
        <Reveal delay={1}>
          <ol className="why-us__list">
            {content.items.map((item) => (
              <li key={item.num} className="why-us__item">
                <span className="why-us__num">{item.num}</span>
                <div>
                  <p className="why-us__title">{item.title}</p>
                  <p className="why-us__text">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </Container>
    </section>
  );
}
