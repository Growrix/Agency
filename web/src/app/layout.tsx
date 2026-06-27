import type { Metadata, Viewport } from "next";
import { Manrope, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { MotionRoot } from "@/components/motion/Motion";
import { AppChrome } from "@/components/shell/AppChrome";
import { ClerkAppProvider } from "@/components/shell/ClerkAppProvider";
import { DeferredSpeedInsights } from "@/components/shell/DeferredSpeedInsights";
import { SITE_INDEXING_ENABLED, SITE_NAME, SITE_URL } from "@/lib/site";

const SITE_DESCRIPTION =
  "Growrix OS is a product-minded web development studio building websites, HTML business profiles, SaaS applications, MCP servers, and automation systems for ambitious teams.";
const DEFAULT_OG_IMAGE = "/images/home/studio-hero.jpg";

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-bricolage",
  display: "swap",
  preload: false,
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Growrix OS | Web Development Agency for Websites, HTML Profiles, SaaS, MCP & Automation",
    template: "%s | Growrix OS",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: "Growrix OS | Web Development Agency for Websites, HTML Profiles, SaaS, MCP & Automation",
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Growrix OS | Web Development Agency for Websites, HTML Profiles, SaaS, MCP & Automation",
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
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
      suppressHydrationWarning
    >
      <head />
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
