import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from '@/config/site.config';

export function buildMetadata(): Metadata {
  return {
    metadataBase: new URL(absoluteUrl('/')),
    title: {
      default: siteConfig.metadata.defaultTitle,
      template: `%s${siteConfig.metadata.titleSuffix}`,
    },
    description: siteConfig.metadata.defaultDescription,
    openGraph: {
      type: 'website',
      url: absoluteUrl('/'),
      title: siteConfig.metadata.defaultTitle,
      description: siteConfig.metadata.defaultDescription,
      siteName: siteConfig.name,
      images: [{ url: siteConfig.metadata.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: siteConfig.metadata.defaultTitle,
      description: siteConfig.metadata.defaultDescription,
      images: [siteConfig.metadata.ogImage],
    },
  };
}

export function buildPageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(path),
    },
    openGraph: {
      title: `${title}${siteConfig.metadata.titleSuffix}`,
      description,
      url: absoluteUrl(path),
      type: 'website',
      siteName: siteConfig.name,
      images: [{ url: siteConfig.metadata.ogImage, width: 1200, height: 630, alt: title }],
    },
  };
}
