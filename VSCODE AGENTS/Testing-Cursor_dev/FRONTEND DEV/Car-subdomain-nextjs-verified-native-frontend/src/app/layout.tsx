/* eslint-disable @next/next/no-css-tags */
import type { Metadata } from "next";
import { NativeNodeRenderer } from "@/components/site/native-node-renderer";
import { SiteBehaviors } from "@/components/site/site-behaviors";
import { nativeShell } from "@/data/native-content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Velocare Auto Studio",
    template: "%s",
  },
  description: "Premium detailing, paint protection, and auto care frontend experience.",
  icons: {
    icon: "/images/icon-velocare.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link href="/css/bootstrap.min.css" rel="stylesheet" id="bootstrap" />
        <link href="/css/plugins.css" rel="stylesheet" />
        <link href="/css/swiper.css" rel="stylesheet" />
        <link href="/css/style.css" rel="stylesheet" />
        <link href="/css/datepicker.css" rel="stylesheet" />
        <link href="/css/custom-swiper-1.css" rel="stylesheet" />
        <link id="colors" href="/css/colors/scheme-1.css" rel="stylesheet" />
      </head>
      <body className="dark-scheme">
        <div id="wrapper">
          <a href="#" id="back-to-top" aria-label="Back to top" />
          <div id="de-loader" />
          <NativeNodeRenderer nodes={nativeShell.header} />
          {children}
          <NativeNodeRenderer nodes={nativeShell.footer} />
        </div>
        <NativeNodeRenderer nodes={nativeShell.extraPanel} />
        <div id="buy-now" className="show-on-scroll" />
        <SiteBehaviors />
      </body>
    </html>
  );
}
