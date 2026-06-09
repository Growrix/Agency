import type { Metadata, Viewport } from "next";
import { Manrope, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { MotionRoot } from "@/components/motion/Motion";
import { AppChrome } from "@/components/shell/AppChrome";

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
    default: "Growrix OS | Web Development Agency for Websites, HTML Profiles, SaaS, MCP & Automation",
    template: "%s | Growrix OS",
  },
  description:
    "Growrix OS is a product-minded web development studio building websites, HTML business profiles, SaaS applications, MCP servers, and automation systems for ambitious teams.",
  icons: {
    icon: "/Favicon.svg?v=20260504",
    shortcut: "/Favicon.svg?v=20260504",
    apple: "/Favicon.png?v=20260504",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

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
          <AppChrome>{children}</AppChrome>
        </MotionRoot>
      </body>
    </html>
  );
}
