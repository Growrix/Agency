import type { Metadata } from "next";
import { Manrope, Bricolage_Grotesque, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shell/Header";
import { Footer } from "@/components/shell/Footer";
import { MobileBottomNav } from "@/components/shell/MobileBottomNav";
import { UtilityRibbon } from "@/components/shell/UtilityRibbon";
import { ChatLauncher } from "@/components/shell/ChatLauncher";

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
    default: "Signal Atelier | Web Development Agency for SaaS, Websites, MCP & Automation",
    template: "%s | Signal Atelier",
  },
  description:
    "A product-minded web development studio building SaaS applications, websites, MCP servers, and automation systems for ambitious teams.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} ${mono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-[var(--color-primary)] focus:text-[var(--color-surface)] focus:px-3 focus:py-2 focus:rounded-md"
        >
          Skip to content
        </a>
        <UtilityRibbon />
        <Header />
        <main id="main" className="flex-1 pb-20 lg:pb-0">
          {children}
        </main>
        <Footer />
        <MobileBottomNav />
        <ChatLauncher />
      </body>
    </html>
  );
}
