import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { InvestmentView } from '@/components/views/InvestmentView';
import { buildPageMetadata } from '@/components/seo/metadata';
import { getContactForm, getPageContent } from '@/lib/content/repositories/site-content';
import { siteConfig } from '@/config/site.config';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent('investment');
  return buildPageMetadata(
    page?.seo?.title ?? page?.hero.eyebrow ?? siteConfig.name,
    page?.seo?.description ?? page?.hero.lede ?? siteConfig.metadata.defaultDescription,
    '/investment',
  );
}

export default async function InvestmentPage() {
  const [page, formContent] = await Promise.all([getPageContent('investment'), getContactForm()]);
  if (!page) notFound();

  return <InvestmentView page={page} formContent={formContent} />;
}
