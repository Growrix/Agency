import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SiteMotion from "@/components/layout/SiteMotion";
import { brandConfig } from "@/data/brand";
import { getServerPreferences } from "@/lib/serverPreferences";
import AppProviders from "@/state/AppProviders";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${brandConfig.siteName} | ${brandConfig.siteTagline}`,
  description: `${brandConfig.siteName} offers premium automotive parts with complete shop, cart, checkout, and account flows.`,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const preferences = await getServerPreferences();

  return (
    <html lang={preferences.language} className={inter.variable} data-scroll-behavior="smooth">
      <body className="min-h-screen bg-white text-[#1b1b1b] antialiased">
        <AppProviders initialLanguage={preferences.language} initialCurrency={preferences.currency}>
          <SiteMotion />
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
