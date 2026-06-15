import type { Metadata } from 'next';
import { siteConfig, absoluteUrl } from '@/config/site.config';

interface PageMetaInput {
  title?: string;
  description?: string;
  path?: string;
}

export function buildMetadata({ title, description, path = '' }: PageMetaInput = {}): Metadata {
  const pageTitle = title ? `${title}${siteConfig.metadata.titleSuffix}` : siteConfig.metadata.defaultTitle;
  const desc = description ?? siteConfig.metadata.defaultDescription;
  const url = absoluteUrl(path);

  return {
    title: pageTitle,
    description: desc,
    metadataBase: new URL(absoluteUrl()),
    alternates: { canonical: url },
    openGraph: {
      title: pageTitle,
      description: desc,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale.replace('-', '_'),
      type: 'website',
      images: [{ url: siteConfig.metadata.ogImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: desc,
    },
    robots: { index: true, follow: true },
  };
}
