import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BuyView } from '@/components/views/BuyView';
import { buildPageMetadata } from '@/components/seo/metadata';
import { getContactForm, getPageContent } from '@/lib/content/repositories/site-content';
import { siteConfig } from '@/config/site.config';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageContent('buy');
  return buildPageMetadata(
    page?.seo?.title ?? page?.hero.eyebrow ?? siteConfig.name,
    page?.seo?.description ?? page?.hero.lede ?? siteConfig.metadata.defaultDescription,
    '/buy',
  );
}

export default async function BuyPage() {
  const [page, formContent] = await Promise.all([getPageContent('buy'), getContactForm()]);
  if (!page) notFound();

  return <BuyView page={page} formContent={formContent} />;
}
