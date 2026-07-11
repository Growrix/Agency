import type { Metadata } from "next";
import {
  lumoriaSnapshotBodyAttributesByRoute,
  lumoriaSnapshotHeadInlineStyles,
  lumoriaSnapshotHtmlAttributesByRoute,
  lumoriaSnapshotStylesheetHrefs,
} from "@/data/lumoria-snapshot-index";
import { SnapshotRouteDocumentAttributes } from "@/components/site/snapshot-route-document-attributes";
import { SnapshotRouteAnimationVisibility } from "@/components/site/snapshot-route-animation-visibility";
import { SnapshotRouteCounterValues } from "@/components/site/snapshot-route-counter-values";
import { SnapshotRouteAccessibilityFixes } from "@/components/site/snapshot-route-accessibility-fixes";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lumoria | Architecture And Interior Studio",
  description:
    "Lumoria is a native Next.js frontend for architecture, interior design, portfolio, blog, and contact experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const defaultHtmlLangCandidate =
    lumoriaSnapshotHtmlAttributesByRoute["/"]?.lang
    ?? lumoriaSnapshotHtmlAttributesByRoute["/about"]?.lang
    ?? "en";
  const defaultBodyClassNameCandidate =
    lumoriaSnapshotBodyAttributesByRoute["/"]?.className
    ?? "";
  const defaultHtmlLang =
    typeof defaultHtmlLangCandidate === "string" ? defaultHtmlLangCandidate : "en";
  const defaultBodyClassName =
    typeof defaultBodyClassNameCandidate === "string" ? defaultBodyClassNameCandidate : "";

  return (
    <html lang={defaultHtmlLang}>
      <head>
        {lumoriaSnapshotStylesheetHrefs.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
        {lumoriaSnapshotHeadInlineStyles.map((cssText, index) => (
          <style key={`lumoria-inline-style-${index}`}>{cssText}</style>
        ))}
      </head>
      <body className={defaultBodyClassName}>
        <SnapshotRouteDocumentAttributes />
        <SnapshotRouteAnimationVisibility />
        <SnapshotRouteCounterValues />
        <SnapshotRouteAccessibilityFixes />
        {children}
      </body>
    </html>
  );
}
