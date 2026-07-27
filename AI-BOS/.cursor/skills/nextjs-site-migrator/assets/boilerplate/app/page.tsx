import type { Metadata } from 'next';
import { siteConfig } from '@/config/site.config';

export const metadata: Metadata = {
  title: siteConfig.metadata.defaultTitle,
  description: siteConfig.metadata.defaultDescription,
};

export default function HomePage() {
  return (
    <main id="main">
      <p>Migrated from HTML preview — replace with homepage sections.</p>
    </main>
  );
}
