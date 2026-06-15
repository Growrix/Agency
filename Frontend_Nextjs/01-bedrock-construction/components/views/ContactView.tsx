'use client';

import Link from 'next/link';
import { siteConfig } from '@/config/site.config';
import type { ContactFormContent, ContactPageContent, FaqItem } from '@/lib/content/types';
import { useContactForm } from '@/hooks/useContactForm';
import { PageHero } from '@/components/sections/PageHero';
import { CtaBand } from '@/components/sections/CtaBand';
import { FaqList } from '@/components/sections/FaqList';
import { IconCheck, IconMail, IconMapPin, IconPhone, IconSend } from '@/components/icons';

interface ContactViewProps {
  page: ContactPageContent;
  forms: ContactFormContent;
  faq: FaqItem[];
  ctaBand: {
    title: string;
    lede: string;
    image: string;
    actions: { label: string; href: string; variant: string }[];
  };
}

export function ContactView({ page, forms, faq, ctaBand }: ContactViewProps) {
  const { submitted, submit } = useContactForm(forms);

  return (
    <>
      <PageHero hero={page.hero} />
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="grid2">
            <div className="reveal">
              <span className="eyebrow">{page.sidebar.eyebrow}</span>
              <h2 className="h-display">{page.sidebar.title}</h2>
              <p className="h-sub">{page.sidebar.lede}</p>
              <div style={{ display: 'grid', gap: 16, marginTop: 32 }}>
                <div style={{ display: 'flex', gap: 13, alignItems: 'center' }}>
                  <span className="c-icon-wrap">
                    <IconPhone size={20} />
                  </span>
                  <div>
                    <div style={{ fontFamily: 'var(--fm)', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 4 }}>Phone</div>
                    <a href={`tel:${siteConfig.phoneTel}`} style={{ fontSize: 15.5, color: 'var(--text)' }}>
                      {siteConfig.phoneDisplay}
                    </a>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 13, alignItems: 'center' }}>
                  <span className="c-icon-wrap">
                    <IconMail size={18} />
                  </span>
                  <div>
                    <div style={{ fontFamily: 'var(--fm)', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 4 }}>Email</div>
                    <a href={`mailto:${siteConfig.email}`} style={{ fontSize: 15.5, color: 'var(--text)' }}>
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 13, alignItems: 'center' }}>
                  <span className="c-icon-wrap">
                    <IconMapPin size={18} />
                  </span>
                  <div>
                    <div style={{ fontFamily: 'var(--fm)', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 4 }}>Headquarters</div>
                    <span style={{ fontSize: 15.5, color: 'var(--text)' }}>
                      {siteConfig.address.street}, {siteConfig.address.locality} {siteConfig.address.region} {siteConfig.address.postalCode}
                    </span>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 40, borderTop: '1px solid var(--border)', paddingTop: 32 }}>
                <div style={{ fontFamily: 'var(--fd)', fontWeight: 700, fontSize: 20, color: 'var(--text)', marginBottom: 16 }}>Regional offices</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {page.sidebar.regionalOffices.map((office) => (
                    <div key={office.city} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--rb)', padding: 16 }}>
                      <div style={{ fontWeight: 600, color: 'var(--text)', fontSize: 14 }}>{office.city}</div>
                      <div style={{ color: 'var(--muted)', fontSize: 13, marginTop: 4 }}>{office.address}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="reveal" data-d="100">
              <form
                id="contact-form"
                onSubmit={submit}
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--rc)', padding: 'clamp(22px,3vw,36px)', display: 'grid', gap: 16 }}
              >
                {submitted ? (
                  <p role="status" style={{ color: 'var(--accent-t)', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
                    <IconCheck size={18} /> {forms.submitSuccess}
                  </p>
                ) : (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div>
                        <label className="f-label" htmlFor="cf-name">Full name</label>
                        <input className="f-input" id="cf-name" name="name" required placeholder="Jane Cooper" autoComplete="name" />
                      </div>
                      <div>
                        <label className="f-label" htmlFor="cf-email">Work email</label>
                        <input className="f-input" id="cf-email" name="email" type="email" required placeholder="jane@company.com" autoComplete="email" />
                      </div>
                    </div>
                    <div>
                      <label className="f-label" htmlFor="cf-company">Company</label>
                      <input className="f-input" id="cf-company" name="company" placeholder="Acme Corp" autoComplete="organization" />
                    </div>
                    <div>
                      <label className="f-label" htmlFor="cf-phone">Phone number</label>
                      <input className="f-input" id="cf-phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" autoComplete="tel" />
                    </div>
                    <div>
                      <label className="f-label" htmlFor="cf-type">Project type</label>
                      <select className="f-input" id="cf-type" name="projectType" defaultValue={forms.projectTypes[0]}>
                        {forms.projectTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="f-label" htmlFor="cf-budget">Approximate budget</label>
                      <select className="f-input" id="cf-budget" name="budget" defaultValue={forms.budgetOptions[0]}>
                        {forms.budgetOptions.map((b) => (
                          <option key={b} value={b}>{b}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="f-label" htmlFor="cf-msg">Project details</label>
                      <textarea className="f-input" id="cf-msg" name="message" rows={4} style={{ resize: 'vertical' }} placeholder="Scope, location, target timeline and any key constraints." />
                    </div>
                    <button type="submit" className="btn btn-p btn-full btn-lg">
                      {forms.submitLabel} <IconSend size={16} />
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="section-sm" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center' }}>
            <span className="eyebrow">{page.faqSection.eyebrow}</span>
            <h2 className="h-display" style={{ textAlign: 'center', maxWidth: 'none' }}>{page.faqSection.title}</h2>
          </div>
          <div style={{ maxWidth: 760, margin: '40px auto 0' }}>
            <FaqList items={faq} />
          </div>
        </div>
      </section>
      <CtaBand {...ctaBand} />
    </>
  );
}
