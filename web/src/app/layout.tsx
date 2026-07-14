import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { MotionRoot } from "@/components/motion/Motion";
import { AppChrome } from "@/components/shell/AppChrome";
import { ClerkAppProvider } from "@/components/shell/ClerkAppProvider";
import { DeferredSpeedInsights } from "@/components/shell/DeferredSpeedInsights";
import { SITE_INDEXING_ENABLED, SITE_NAME, SITE_URL } from "@/lib/site";
import {
  DEFAULT_OG_IMAGE,
  HOME_SHARE_DESCRIPTION,
  HOME_SHARE_TITLE,
} from "@/lib/seo-metadata";

const SITE_DESCRIPTION = HOME_SHARE_DESCRIPTION;

const sans = localFont({
  src: [
    { path: "./fonts/manrope-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/manrope-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-manrope",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const display = localFont({
  src: [{ path: "./fonts/bricolage-grotesque-latin-600-normal.woff2", weight: "600", style: "normal" }],
  variable: "--font-bricolage",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const mono = localFont({
  src: [
    { path: "./fonts/jetbrains-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/jetbrains-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-jetbrains-mono",
  display: "swap",
  fallback: ["monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_SHARE_TITLE,
    template: "%s | Growrix OS",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: HOME_SHARE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_SHARE_TITLE,
    description: SITE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  robots: SITE_INDEXING_ENABLED
    ? {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, "max-image-preview": "large" },
      }
    : { index: false, follow: false },
  icons: {
    icon: "/Favicon.svg?v=20260504",
    apple: "/Favicon.png?v=20260504",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

function AppShell({ children }: { children: React.ReactNode }) {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return <AppChrome>{children}</AppChrome>;
  }

  return (
    <ClerkAppProvider>
      <AppChrome>{children}</AppChrome>
    </ClerkAppProvider>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${mono.variable} h-full`}
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        {/* Blocking theme bootstrap — must run before paint; async/defer would flash wrong theme */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/theme-init.js" suppressHydrationWarning />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:bg-primary focus:text-surface focus:px-3 focus:py-2 focus:rounded-md"
        >
          Skip to content
        </a>
        <MotionRoot>
          <AppShell>{children}</AppShell>
        </MotionRoot>
        <DeferredSpeedInsights />
      </body>
    </html>
  );
}
