import type { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Archivo, IBM_Plex_Mono, Space_Grotesk } from 'next/font/google';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { buildMetadata } from '@/components/seo/metadata';
import { siteConfig } from '@/config/site.config';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
  variable: '--font-display',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  ...buildMetadata(),
  title: {
    default: siteConfig.metadata.defaultTitle,
    template: `%s${siteConfig.metadata.titleSuffix}`,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={siteConfig.locale.split('-')[0]} suppressHydrationWarning>
      <body className={`${archivo.variable} ${spaceGrotesk.variable} ${ibmPlexMono.variable} min-h-screen antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
