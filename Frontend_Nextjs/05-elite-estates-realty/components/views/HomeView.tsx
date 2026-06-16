import Link from 'next/link';
import Image from 'next/image';
import { useId } from 'react';
import type { AgentProfile, HomeContent } from '@/lib/content/types';
import { IconArrowRight, IconCheck } from '@/components/icons';
import { PropertyCard } from '@/components/sections/PropertyCard';
import { CountUp } from '@/components/ui/CountUp';
import { FaqAccordion } from '@/components/ui/FaqAccordion';
import { Reveal } from '@/components/ui/Reveal';

interface HomeViewProps {
  home: HomeContent;
  agents: AgentProfile[];
}

export function HomeView({ home, agents }: HomeViewProps) {
  return (
    <>
      <section className="hero" style={{ background: 'var(--hero-bg-solid)' }}>
        <Image
          src={home.hero.backgroundImage}
          alt=""
          fill
          priority
          quality={70}
          sizes="100vw"
          style={{ objectFit: 'cover', opacity: 0.55 }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'var(--hero-gradient-overlay)',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'var(--hero-radial-overlay)' }} />

        <div className="container" style={{ paddingBlock: 'clamp(80px,13vw,160px)', position: 'relative', zIndex: 2 }}>
          <div className="hero-grid">
            <div>
              <Reveal>
                <span className="eyebrow" style={{ color: 'var(--gold-t)' }}>
                  {home.hero.eyebrow}
                </span>
              </Reveal>

              <Reveal delayMs={80}>
                <h1 className="hero-h1" style={{ color: 'var(--hero-fg)' }}>
                  {home.hero.title}
                </h1>
              </Reveal>

              <Reveal delayMs={160}>
                <p className="hero-sub" style={{ color: 'var(--hero-fg-80)' }}>
                  {home.hero.lede}
                </p>
              </Reveal>

              <Reveal delayMs={240}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '30px' }}>
                  {home.hero.ctas.map((cta) => (
                    <Link key={cta.href} href={cta.href} className={`btn ${cta.accent ? 'btn-gold' : 'btn-ghost'} btn-lg`}>
                      {cta.label}
                      {cta.accent ? <IconArrowRight width={16} height={16} /> : null}
                    </Link>
                  ))}
                </div>
              </Reveal>

              <Reveal delayMs={320}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '28px', marginTop: '36px' }}>
                  {home.hero.counters.map((item) => (
                    <div key={item.label}>
                      <div style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '28px', color: 'var(--hero-fg)' }}>
                        <CountUp target={item.counter ?? 0} prefix={item.prefix} suffix={item.suffix} />
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--fm)',
                          fontSize: '11px',
                          letterSpacing: '.1em',
                          textTransform: 'uppercase',
                          color: 'var(--hero-fg-60)',
                          marginTop: '4px',
                        }}
                      >
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delayMs={100}>
              <div className="search-box">
                <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '14px', marginBottom: '4px' }}>
                  {home.hero.searchTabs.map((tab) => (
                    <Link
                      key={tab.href}
                      href={tab.href}
                      className={`btn ${tab.active ? 'btn-dark' : 'btn-outline'} btn-sm`}
                      aria-current={tab.active ? 'page' : undefined}
                    >
                      {tab.label}
                    </Link>
                  ))}
                </div>
                <div className="search-box-inner">
                  <SelectField label={home.hero.searchLabels.location} options={home.hero.searchFields.location} />
                  <SelectField label={home.hero.searchLabels.propertyType} options={home.hero.searchFields.propertyType} />
                  <SelectField label={home.hero.searchLabels.budget} options={home.hero.searchFields.budget} />
                  <SelectField label={home.hero.searchLabels.bedrooms} options={home.hero.searchFields.bedrooms} />
                  <SelectField label={home.hero.searchLabels.bathrooms} options={home.hero.searchFields.bathrooms} />
                  <div style={{ alignSelf: 'flex-end' }}>
                    <Link href={home.hero.searchSubmitHref} className="btn btn-gold btn-full" style={{ height: '46px' }}>
                      {home.hero.searchLabels.submit}
                      <IconArrowRight width={16} height={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <Reveal>
              <div>
                <span className="eyebrow">{home.featured.eyebrow}</span>
                <h2 className="h-d">{home.featured.title}</h2>
              </div>
            </Reveal>
            <Reveal delayMs={60}>
              <Link href={home.featured.cta.href} className="btn btn-outline">
                {home.featured.cta.label}
                <IconArrowRight width={16} height={16} />
              </Link>
            </Reveal>
          </div>
          <div className="grid3" style={{ marginTop: '44px' }}>
            {home.featured.properties.map((item, index) => (
              <Reveal key={item.id} delayMs={index * 80}>
                <PropertyCard property={item} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm" style={{ background: 'var(--surface)', borderBlock: '1px solid var(--border)' }}>
        <div className="container">
          <Reveal className="center">
            <span className="eyebrow" style={{ justifyContent: 'center' }}>
              {home.categories.eyebrow}
            </span>
            <h2 className="h-d center">{home.categories.title}</h2>
          </Reveal>
          <div className="grid4" style={{ marginTop: '36px' }}>
            {home.categories.items.map((category, index) => (
              <Reveal key={category.id} delayMs={(index % 4) * 70}>
                <Link href={category.href ?? '/properties'} className="cat-card">
                  <div className="cat-ico">{category.title.charAt(0)}</div>
                  <div style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '15px', color: 'var(--text)' }}>{category.title}</div>
                  <div style={{ fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--faint)' }}>{category.subtitle}</div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <Reveal className="center">
            <span className="eyebrow" style={{ justifyContent: 'center' }}>
              {home.whyUs.eyebrow}
            </span>
            <h2 className="h-d center">{home.whyUs.title}</h2>
          </Reveal>
          <div className="grid4" style={{ marginTop: '44px' }}>
            {home.whyUs.items.map((item, index) => (
              <Reveal key={item.title} delayMs={(index % 4) * 80}>
                <div className="why-card">
                  <div className="why-ico">
                    <IconCheck width={20} height={20} />
                  </div>
                  <div>
                    <div style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '17px', color: 'var(--text)' }}>{item.title}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.55, marginTop: '6px' }}>{item.text}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section markets-section">
        <div className="container" style={{ position: 'relative' }}>
          <div className="grid2 markets-layout">
            <Reveal className="markets-lead">
              <span className="eyebrow" style={{ color: 'var(--gold-t)' }}>
                {home.markets.eyebrow}
              </span>
              <h2 style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: 'clamp(2rem,4vw,3rem)', letterSpacing: '-.025em', lineHeight: 1.04, marginTop: '16px' }}>
                {home.markets.title}
              </h2>
              <p style={{ fontSize: '17px', lineHeight: 1.65, marginTop: '16px', maxWidth: '500px' }}>{home.markets.lede}</p>
              <Link href={home.markets.cta.href} className="btn btn-gold btn-lg" style={{ marginTop: '24px' }}>
                {home.markets.cta.label}
                <IconArrowRight width={16} height={16} />
              </Link>
            </Reveal>
            <div className="invest-cards">
              {home.markets.items.map((market, index) => (
                <Reveal key={market.name} delayMs={index * 70}>
                  <div className="investment-card">
                    <div style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '17px', marginBottom: '4px' }}>{market.name}</div>
                    <div style={{ fontFamily: 'var(--fd)', fontWeight: 800, fontSize: '38px', color: 'var(--gold-t)' }}>{market.yield}</div>
                    <div style={{ opacity: 0.6, fontSize: '13px', marginTop: '4px' }}>{market.note}</div>
                    <Link
                      href={home.markets.cardCtaHref}
                      className="tap-target-inline"
                      style={{ gap: '6px', color: 'var(--gold-t)', fontWeight: 600, fontSize: '13px', marginTop: '14px' }}
                    >
                      {home.markets.cardCtaLabel}
                      <IconArrowRight width={16} height={16} />
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <Reveal>
            <span className="eyebrow">{home.developments.eyebrow}</span>
            <h2 className="h-d">{home.developments.title}</h2>
          </Reveal>
          <div className="grid3" style={{ marginTop: '44px' }}>
            {home.developments.items.map((item, index) => (
              <Reveal key={item.id} delayMs={index * 90}>
                <div className="dev-card">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={700}
                    height={360}
                    sizes="(max-width: 560px) 100vw, (max-width: 960px) 50vw, 33vw"
                    style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                  />
                  <div style={{ padding: '22px' }}>
                    <div style={{ fontFamily: 'var(--fm)', fontSize: '10px', letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold)' }}>{item.phase}</div>
                    <div style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '19px', color: 'var(--text)', marginTop: '6px' }}>{item.title}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '13px', marginTop: '4px' }}>{item.location}</div>
                    <div style={{ marginTop: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--fm)', fontSize: '11px', color: 'var(--muted)' }}>
                        <span>{home.developments.completionLabel}</span>
                        <span>{item.completion}</span>
                      </div>
                      <div className="progress-bar">
                        <div className="progress-fill" style={{ width: item.completion }} />
                      </div>
                    </div>
                    <Link
                      href={home.developments.cardCta.href}
                      className={`btn ${home.developments.cardCta.accent ? 'btn-gold' : 'btn-outline'} btn-sm btn-full`}
                      style={{ marginTop: '16px' }}
                    >
                      {home.developments.cardCta.label}
                      <IconArrowRight width={16} height={16} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <Reveal className="center">
            <span className="eyebrow" style={{ justifyContent: 'center' }}>
              {home.process.eyebrow}
            </span>
            <h2 className="h-d center">{home.process.title}</h2>
          </Reveal>
          <div className="process-wrap">
            <div className="process-line" aria-hidden="true" />
            <div className="process-grid">
              {home.process.steps.map((step, index) => (
                <Reveal key={step.step} delayMs={index * 60}>
                  <div>
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'var(--gold)',
                        color: 'var(--hero-fg)',
                        display: 'grid',
                        placeItems: 'center',
                        fontFamily: 'var(--fm)',
                        fontSize: '12px',
                        fontWeight: 700,
                        position: 'relative',
                        zIndex: 2,
                      }}
                    >
                      {step.step}
                    </div>
                    <div style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: '14px', color: 'var(--text)', marginTop: '14px' }}>{step.title}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '12px', lineHeight: 1.5, marginTop: '6px' }}>{step.text}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="stats-s" style={{ background: 'var(--hero-bg-solid)', color: 'var(--hero-fg)' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'var(--stats-radial-overlay)' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div className="stats-grid">
            {home.statsBand.map((item, index) => (
              <Reveal key={item.label} className="stat" delayMs={index * 80}>
                <div className="stat-n" style={{ color: 'var(--hero-fg)' }}>
                  <CountUp target={item.counter ?? 0} prefix={item.prefix} suffix={item.suffix} />
                </div>
                <div className="stat-l" style={{ color: 'var(--hero-fg-55)' }}>
                  {item.label}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <Reveal className="center">
            <span className="eyebrow" style={{ justifyContent: 'center' }}>
              {home.agents.eyebrow}
            </span>
            <h2 className="h-d center">{home.agents.title}</h2>
          </Reveal>
          <div className="grid4 agents-grid" style={{ marginTop: '44px' }}>
            {agents.map((agent, index) => (
              <Reveal key={agent.id} delayMs={index * 80}>
                <div className="agent-card">
                  <div className="agent-av">
                    <Image
                      src={agent.image}
                      alt={agent.name}
                      width={700}
                      height={900}
                      sizes="(max-width: 560px) 100vw, (max-width: 960px) 50vw, 25vw"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="agent-body">
                    <div className="agent-name">{agent.name}</div>
                    <div className="agent-role">{agent.role}</div>
                    <div className="agent-langs">{agent.languages}</div>
                    <Link href={home.agents.cardCtaHref} className="btn btn-gold btn-sm btn-full">
                      {home.agents.cardCtaLabel}
                      <IconArrowRight width={16} height={16} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <Reveal className="center">
            <span className="eyebrow" style={{ justifyContent: 'center' }}>
              {home.testimonials.eyebrow}
            </span>
            <h2 className="h-d center">{home.testimonials.title}</h2>
          </Reveal>
          <div className="grid4" style={{ marginTop: '44px' }}>
            {home.testimonials.items.map((item, index) => (
              <Reveal key={item.id} delayMs={index * 80}>
                <div className="testi-card">
                  <div className="testi-stars">{Array.from({ length: 5 }).map((_, i) => <IconCheck key={i} width={12} height={12} />)}</div>
                  <div className="testi-q">{item.quote}</div>
                  <div className="testi-author">
                    <div className="testi-avatar">{item.name.split(' ').map((v) => v[0]).join('').slice(0, 2)}</div>
                    <div>
                      <div className="testi-name">{item.name}</div>
                      <div className="testi-role">{item.role}</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm" style={{ background: 'var(--bg)', borderBlock: '1px solid var(--border)' }}>
        <div className="container">
          <Reveal className="center">
            <span className="eyebrow" style={{ justifyContent: 'center' }}>
              {home.awards.eyebrow}
            </span>
          </Reveal>
          <div className="grid4" style={{ marginTop: '28px' }}>
            {home.awards.items.map((item, index) => (
              <Reveal key={item.id} delayMs={index * 80}>
                <div className="award-item">
                  <div className="award-ico">
                    <IconCheck width={20} height={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px', color: 'var(--text)' }}>{item.title}</div>
                    <div style={{ fontSize: '12px', color: 'var(--faint)', marginTop: '3px' }}>{item.subtitle}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <Reveal>
            <span className="eyebrow">{home.insights.eyebrow}</span>
            <h2 className="h-d">{home.insights.title}</h2>
          </Reveal>
          <div className="grid3 insights-grid" style={{ marginTop: '44px' }}>
            {home.insights.items.map((item, index) => (
              <Reveal key={item.id} delayMs={index * 100}>
                <article className="blog-card">
                  <Image className="blog-img" src={item.image} alt={item.title} width={700} height={420} sizes="(max-width: 560px) 100vw, (max-width: 960px) 50vw, 33vw" />
                  <div className="blog-body">
                    <div className="blog-cat">{item.category}</div>
                    <h3 className="blog-title">{item.title}</h3>
                    <p className="blog-exc">{item.excerpt}</p>
                    <div className="blog-meta">
                      <span>{item.date}</span>
                      <span>{item.readTime}</span>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="grid2">
            <Reveal>
              <span className="eyebrow">{home.faq.eyebrow}</span>
              <h2 className="h-d">{home.faq.title}</h2>
              <p className="h-sub">{home.faq.lede}</p>
              <Link href={home.faq.cta.href} className="btn btn-outline" style={{ marginTop: '24px' }}>
                {home.faq.cta.label}
                <IconArrowRight width={16} height={16} />
              </Link>
            </Reveal>
            <Reveal delayMs={100}>
              <FaqAccordion items={home.faq.items} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="home-cta">
        <div className="container" style={{ position: 'relative' }}>
          <Reveal>
            <h2>{home.ctaBand.title}</h2>
            <p>{home.ctaBand.lede}</p>
            <div className="cta-actions">
              {home.ctaBand.actions.map((action) => (
                <Link key={action.href} href={action.href} className={`btn ${action.accent ? 'btn-gold' : 'btn-ghost'} btn-lg`}>
                  {action.label}
                  {action.accent ? <IconArrowRight width={16} height={16} /> : null}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function SelectField({ label, options }: { label: string; options: string[] }) {
  const id = useId();
  return (
    <div>
      <label className="f-label" htmlFor={id}>
        {label}
      </label>
      <select id={id} name={label.toLowerCase().replace(/\s+/g, '-')} className="f-input" defaultValue={options[0]}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
