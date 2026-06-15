import type { ReactNode } from 'react';
import { AnnounceBar } from '@/components/layout/AnnounceBar';
import { BottomNav } from '@/components/layout/BottomNav';
import { Fab } from '@/components/layout/Fab';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { ScrollRevealInit } from '@/components/layout/ScrollRevealInit';
import { SkipLink } from '@/components/layout/SkipLink';
import { StickyCta } from '@/components/layout/StickyCta';
import { Toaster } from '@/components/layout/Toaster';
import {
  JsonLdFAQ,
  JsonLdLocalBusiness,
  JsonLdOrganization,
  JsonLdServices,
  JsonLdWebSite,
} from '@/components/seo/JsonLd';
import { getAnnouncements, getFaq, getForms, getNavigation, getServices } from '@/lib/content/repositories/site-content';

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
      <AnnounceBar items={announcements} />
      <Header nav={nav} />
      <ScrollRevealInit />
      {children}
      <Footer nav={nav} />
      <StickyCta />
      <BottomNav nav={nav} />
      <Fab forms={forms.fab} />
      <Toaster />
      <JsonLdOrganization />
      <JsonLdWebSite />
      <JsonLdLocalBusiness />
      <JsonLdServices services={services} />
      <JsonLdFAQ items={faq} />
    </>
  );
}
