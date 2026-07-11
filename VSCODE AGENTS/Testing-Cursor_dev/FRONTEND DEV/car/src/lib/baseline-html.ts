import "server-only";

import { readFileSync } from "node:fs";
import path from "node:path";
import { cache } from "react";

const BASELINE_PUBLIC_ROOT = path.join(process.cwd(), "Car-subdomain", "public");
const CONTENT_OPEN_MARKER = '<div class="no-bottom no-top" id="content">';
const CONTENT_END_MARKER = "<!-- content end -->";
const EXTERNAL_SCHEME_PATTERN = /^[a-zA-Z][a-zA-Z\d+.-]*:/;

function ensureSafeFileName(fileName: string) {
  if (!/^[a-z0-9-]+\.html$/i.test(fileName)) {
    throw new Error(`Unsupported baseline file name: ${fileName}`);
  }
}

function toAbsoluteUrl(value: string) {
  const trimmed = value.trim();

  if (!trimmed) return trimmed;
  if (trimmed.startsWith("/") || trimmed.startsWith("#")) return trimmed;
  if (trimmed.startsWith("mailto:") || trimmed.startsWith("tel:") || trimmed.startsWith("javascript:")) {
    return trimmed;
  }
  if (trimmed.startsWith("//") || EXTERNAL_SCHEME_PATTERN.test(trimmed)) {
    return trimmed;
  }
  if (trimmed.startsWith("./")) {
    return `/${trimmed.slice(2)}`;
  }
  if (trimmed.startsWith("../")) {
    return `/${trimmed.replace(/^(\.\.\/)+/, "")}`;
  }

  return `/${trimmed}`;
}

function absolutizeAttributeUrls(html: string) {
  return html.replace(/\b(href|src|action)=("([^"]*)"|'([^']*)')/gi, (match, attr, quoted, doubleValue, singleValue) => {
    const quote = quoted[0];
    const rawValue = typeof doubleValue === "string" ? doubleValue : singleValue;

    if (typeof rawValue !== "string") {
      return match;
    }

    const absoluteValue = toAbsoluteUrl(rawValue);
    return `${attr}=${quote}${absoluteValue}${quote}`;
  });
}

function absolutizeCssUrls(html: string) {
  return html.replace(/url\((['"]?)(?!https?:|data:|\/|#)([^'")]+)\1\)/gi, (_match, quote, value) => {
    const cleanValue = value.trim();
    const normalized = cleanValue.startsWith("./")
      ? cleanValue.slice(2)
      : cleanValue.replace(/^(\.\.\/)+/, "");
    return `url(${quote}/${normalized}${quote})`;
  });
}

function absolutizeKnownPathFragments(html: string) {
  return html
    .replace(/(["'])images\//g, "$1/images/")
    .replace(/(["'])css\//g, "$1/css/")
    .replace(/(["'])js\//g, "$1/js/")
    .replace(/(["'])fonts\//g, "$1/fonts/")
    .replace(/(["'])demo\//g, "$1/demo/")
    .replace(/\((['"]?)images\//g, "($1/images/")
    .replace(/\((['"]?)css\//g, "($1/css/")
    .replace(/\((['"]?)js\//g, "($1/js/")
    .replace(/\((['"]?)fonts\//g, "($1/fonts/")
    .replace(/\((['"]?)demo\//g, "($1/demo/");
}

function extractContentInnerHtml(documentHtml: string, fileName: string) {
  const contentStart = documentHtml.indexOf(CONTENT_OPEN_MARKER);

  if (contentStart === -1) {
    throw new Error(`Unable to find content container in baseline file: ${fileName}`);
  }

  const afterStart = documentHtml.slice(contentStart + CONTENT_OPEN_MARKER.length);
  const contentEnd = afterStart.indexOf(CONTENT_END_MARKER);
  const footerStart = afterStart.indexOf("<footer");
  const endIndex = contentEnd >= 0 ? contentEnd : footerStart;

  if (endIndex === -1) {
    throw new Error(`Unable to find content end marker in baseline file: ${fileName}`);
  }

  const sectionHtml = afterStart.slice(0, endIndex);
  return sectionHtml.replace(/\s*<\/div>\s*$/, "").trim();
}

export const getBaselineContentHtml = cache((fileName: string) => {
  ensureSafeFileName(fileName);

  const baselinePath = path.join(BASELINE_PUBLIC_ROOT, fileName);
  const documentHtml = readFileSync(baselinePath, "utf-8");

  const extracted = extractContentInnerHtml(documentHtml, fileName);
  const normalized = absolutizeKnownPathFragments(absolutizeCssUrls(absolutizeAttributeUrls(extracted)));

  return normalized;
});
