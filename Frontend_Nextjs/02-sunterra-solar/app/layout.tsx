import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { buildMetadata } from '@/components/seo/metadata';
import { siteConfig } from '@/config/site.config';
import './globals.css';

export const metadata: Metadata = {
  ...buildMetadata(),
  title: {
    default: siteConfig.metadata.defaultTitle,
    template: `%s${siteConfig.metadata.titleSuffix}`,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={siteConfig.locale} suppressHydrationWarning>
      <body className="min-h-screen bg-bg text-text antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
