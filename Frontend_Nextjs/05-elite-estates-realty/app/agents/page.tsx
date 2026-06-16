import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { IconArrowRight } from '@/components/icons';
import { PageHero } from '@/components/sections/PageHero';
import { Reveal } from '@/components/ui/Reveal';
import { buildPageMetadata } from '@/components/seo/metadata';
import { getAgents, getAgentsPage } from '@/lib/content/repositories/site-content';
import { siteConfig } from '@/config/site.config';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getAgentsPage();
  return buildPageMetadata(
    page.seo?.title ?? page.hero.eyebrow ?? siteConfig.name,
    page.seo?.description ?? page.hero.lede ?? siteConfig.metadata.defaultDescription,
    '/agents',
  );
}

export default async function AgentsPage() {
  const [agents, page] = await Promise.all([getAgents(), getAgentsPage()]);

  return (
    <>
      <PageHero hero={page.hero} />
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <Reveal className="center">
            <span className="eyebrow" style={{ justifyContent: 'center' }}>
              {page.section.eyebrow}
            </span>
            <h2 className="h-d center">{page.section.title}</h2>
            <p className="h-sub">{page.section.lede}</p>
          </Reveal>

          <div className="grid4 agents-grid">
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
                    <Link
                      href={page.section.cardCta.href}
                      className={`btn ${page.section.cardCta.accent ? 'btn-gold' : 'btn-outline'} btn-sm btn-full`}
                      style={{ marginTop: '16px' }}
                    >
                      {page.section.cardCta.label}
                      <IconArrowRight width={16} height={16} />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <Link href={page.section.primaryCta.href} className={`btn ${page.section.primaryCta.accent ? 'btn-gold' : 'btn-outline'}`}>
              {page.section.primaryCta.label}
              <IconArrowRight width={16} height={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
