import type { ReactNode } from 'react';
import { SkipLink } from '@/components/layout/SkipLink';
import { Ticker } from '@/components/layout/Ticker';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { Fab } from '@/components/layout/Fab';
import { ScrollRevealInit } from '@/components/layout/ScrollRevealInit';
import { JsonLdFAQ, JsonLdOrganization, JsonLdServices, JsonLdWebSite } from '@/components/seo/JsonLd';
import {
  getAnnouncements,
  getFaq,
  getForms,
  getNavigation,
  getServices,
} from '@/lib/content/repositories/site-content';

export default async function MarketingLayout({ children }: { children: ReactNode }) {
  const [nav, announcements, forms, services, faq] = await Promise.all([
    getNavigation(),
    getAnnouncements(),
    getForms(),
    getServices(),
    getFaq(),
  ]);

  return (
    <>
      <SkipLink />
      <Ticker items={announcements} />
      <Header nav={nav} />
      <ScrollRevealInit />
      <main id="main">{children}</main>
      <Footer nav={nav} forms={forms} />
      <BottomNav nav={nav} />
      <Fab forms={forms.fab} />
      <JsonLdOrganization />
      <JsonLdWebSite />
      <JsonLdServices services={services} />
      <JsonLdFAQ items={faq} />
    </>
  );
}
