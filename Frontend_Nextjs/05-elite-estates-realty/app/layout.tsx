import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Archivo, IBM_Plex_Mono, Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { SiteShell } from '@/components/layout/SiteShell';
import { buildMetadata } from '@/components/seo/metadata';
import { JsonLd } from '@/components/seo/JsonLd';
import { siteConfig } from '@/config/site.config';
import './globals.css';

const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo', display: 'swap' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', display: 'swap' });
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-ibm-plex-mono',
  weight: ['400', '500', '600'],
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = buildMetadata();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={siteConfig.locale} data-theme="light" suppressHydrationWarning>
      <body className={`${archivo.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable} min-h-screen bg-bg text-text antialiased`}>
        <JsonLd />
        <ThemeProvider>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
