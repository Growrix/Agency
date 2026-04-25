import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Manrope, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { MotionRoot } from "@/components/motion/Motion";
import { AppChrome } from "@/components/shell/AppChrome";
import { Analytics } from "@vercel/analytics/next";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Growrix OS | Web Development Agency for SaaS, Websites, MCP & Automation",
    template: "%s | Growrix OS",
  },
  description:
    "Growrix OS is a product-minded web development studio building SaaS applications, websites, MCP servers, and automation systems for ambitious teams.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

// Inline pre-hydration script: applies the saved theme before first paint
// to prevent a light/dark flash. Falls back to `prefers-color-scheme` when
// the user hasn't expressed a preference.
const themeInitScript = `
(function(){
  try {
    var stored = localStorage.getItem('growrix-os-theme') || localStorage.getItem('growrix-theme') || localStorage.getItem('signal-theme');
    if (stored === 'light' || stored === 'dark') {
      document.documentElement.setAttribute('data-theme', stored);
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${mono.variable} h-full`}
      suppressHydrationWarning
    >
      <head />
      <body className="min-h-full flex flex-col antialiased">
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:bg-primary focus:text-surface focus:px-3 focus:py-2 focus:rounded-md"
        >
          Skip to content
        </a>
        <MotionRoot>
          <AppChrome>{children}</AppChrome>
        </MotionRoot>
        <Analytics />
      </body>
    </html>
  );
}
