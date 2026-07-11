import type { Metadata } from "next";
import { Manrope, Oxanium } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const oxanium = Oxanium({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Velocare Auto Studio",
  description: "Premium detailing, paint protection, and auto care frontend experience.",
  icons: {
    icon: "/images/icon-velocare.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`dark-scheme ${manrope.variable} ${oxanium.variable}`}>{children}</body>
    </html>
  );
}
