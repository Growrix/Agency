import type { Metadata } from 'next';
import { ContactView } from '@/components/views/ContactView';
import { buildPageMetadata } from '@/components/seo/metadata';
import { getContactForm, getContactPage } from '@/lib/content/repositories/site-content';
import { siteConfig } from '@/config/site.config';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getContactPage();
  return buildPageMetadata(
    page.seo?.title ?? page.hero.eyebrow ?? siteConfig.name,
    page.seo?.description ?? page.hero.lede ?? siteConfig.metadata.defaultDescription,
    '/contact',
  );
}

export default async function ContactPage() {
  const [page, formContent] = await Promise.all([getContactPage(), getContactForm()]);

  return <ContactView page={page} formContent={formContent} />;
}
