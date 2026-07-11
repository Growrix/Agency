import "server-only";

import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { cache } from "react";

const PUBLIC_ROOT = path.join(process.cwd(), "public");
const SAFE_HTML_FILE_PATTERN = /^[a-z0-9-]+\.html$/i;
const EXTERNAL_SCHEME_PATTERN = /^[a-zA-Z][a-zA-Z\d+.-]*:/;

export type ParsedStylesheet = {
  href: string;
  id?: string;
  type?: string;
};

export type ParsedScript = {
  key: string;
  src?: string;
  inline?: string;
};

export type ParsedHtmlPage = {
  fileName: string;
  canonicalPath: string;
  title: string;
  description?: string;
  bodyClass: string;
  bodyHtml: string;
  stylesheets: ParsedStylesheet[];
  scripts: ParsedScript[];
};

function ensureSafeFileName(fileName: string) {
  if (!SAFE_HTML_FILE_PATTERN.test(fileName)) {
    throw new Error(`Unsupported source html file: ${fileName}`);
  }
}

function parseAttribute(tag: string, attributeName: string) {
  const attributePattern = new RegExp(
    `\\b${attributeName}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`,
    "i",
  );
  const match = tag.match(attributePattern);

  if (!match) {
    return undefined;
  }

  return (match[2] ?? match[3] ?? match[4] ?? "").trim();
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

function toCanonicalHref(value: string) {
  const trimmed = value.trim();

  if (!trimmed) return trimmed;
  if (trimmed.startsWith("#")) return trimmed;
  if (trimmed.startsWith("//") || EXTERNAL_SCHEME_PATTERN.test(trimmed)) return trimmed;

  const hashIndex = trimmed.indexOf("#");
  const hashPart = hashIndex >= 0 ? trimmed.slice(hashIndex) : "";
  const beforeHash = hashIndex >= 0 ? trimmed.slice(0, hashIndex) : trimmed;

  const queryIndex = beforeHash.indexOf("?");
  const queryPart = queryIndex >= 0 ? beforeHash.slice(queryIndex) : "";
  const beforeQuery = queryIndex >= 0 ? beforeHash.slice(0, queryIndex) : beforeHash;

  const relativeNormalized = beforeQuery
    .replace(/^\.\//, "")
    .replace(/^(\.\.\/)+/, "")
    .replace(/^\//, "");

  if (!relativeNormalized.toLowerCase().endsWith(".html")) {
    return toAbsoluteUrl(trimmed);
  }

  const basePath = relativeNormalized.replace(/\.html$/i, "");
  const canonical = basePath.toLowerCase() === "index" ? "/" : `/${basePath}`;

  return `${canonical}${queryPart}${hashPart}`;
}

function rewriteInternalHtmlLinks(html: string) {
  return html.replace(/\bhref=("([^"]*)"|'([^']*)')/gi, (match, quoted, doubleValue, singleValue) => {
    const quote = quoted[0];
    const rawValue = typeof doubleValue === "string" ? doubleValue : singleValue;

    if (typeof rawValue !== "string") {
      return match;
    }

    return `href=${quote}${toCanonicalHref(rawValue)}${quote}`;
  });
}

function toCanonicalPath(fileName: string) {
  const slug = fileName.replace(/\.html$/i, "");
  if (slug.toLowerCase() === "index") {
    return "/";
  }
  return `/${slug}`;
}

function extractStylesheets(headHtml: string) {
  const stylesheets: ParsedStylesheet[] = [];
  const linkTags = headHtml.match(/<link\b[^>]*>/gi) ?? [];

  for (const linkTag of linkTags) {
    const rel = parseAttribute(linkTag, "rel")?.toLowerCase();
    const href = parseAttribute(linkTag, "href");

    if (!rel?.includes("stylesheet") || !href) {
      continue;
    }

    stylesheets.push({
      href: toAbsoluteUrl(href),
      id: parseAttribute(linkTag, "id"),
      type: parseAttribute(linkTag, "type"),
    });
  }

  return stylesheets;
}

function extractScripts(documentHtml: string) {
  const scripts: ParsedScript[] = [];
  const scriptMatches = documentHtml.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi);

  let index = 0;
  for (const match of scriptMatches) {
    const attrs = match[1] ?? "";
    const inlineCode = (match[2] ?? "").trim();
    const src = parseAttribute(attrs, "src");

    if (src) {
      scripts.push({
        key: `src-${index}-${src}`,
        src: toAbsoluteUrl(src),
      });
    } else if (inlineCode) {
      scripts.push({
        key: `inline-${index}`,
        inline: inlineCode,
      });
    }

    index += 1;
  }

  return scripts;
}

function extractDescription(headHtml: string) {
  const direct = headHtml.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
  if (direct?.[1]) {
    return direct[1].trim();
  }

  const reverse = headHtml.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i);
  if (reverse?.[1]) {
    return reverse[1].trim();
  }

  return undefined;
}

export const getSourceHtmlFiles = cache(() => {
  return readdirSync(PUBLIC_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isFile() && SAFE_HTML_FILE_PATTERN.test(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
});

export function isKnownHtmlFile(fileName: string) {
  return getSourceHtmlFiles().includes(fileName);
}

export function fileNameFromSlug(slug: string) {
  return `${slug}.html`;
}

export function slugFromFileName(fileName: string) {
  ensureSafeFileName(fileName);
  return fileName.replace(/\.html$/i, "");
}

export const getParsedHtmlPage = cache((fileName: string): ParsedHtmlPage => {
  ensureSafeFileName(fileName);

  const filePath = path.join(PUBLIC_ROOT, fileName);
  const documentHtml = readFileSync(filePath, "utf-8");

  const headHtml = documentHtml.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? "";
  const bodyMatch = documentHtml.match(/<body([^>]*)>([\s\S]*?)<\/body>/i);

  let bodyAttributes = "";
  let bodyContent = "";

  if (bodyMatch) {
    bodyAttributes = bodyMatch[1] ?? "";
    bodyContent = bodyMatch[2] ?? "";
  } else {
    const bodyOpenMatch = documentHtml.match(/<body([^>]*)>/i);

    if (!bodyOpenMatch || typeof bodyOpenMatch.index !== "number") {
      throw new Error(`Unable to parse body from source html: ${fileName}`);
    }

    bodyAttributes = bodyOpenMatch[1] ?? "";
    const bodyStartIndex = bodyOpenMatch.index + bodyOpenMatch[0].length;
    const bodyCloseMatch = documentHtml.match(/<\/body>/i);
    const htmlCloseMatch = documentHtml.match(/<\/html>/i);
    const bodyEndIndex = bodyCloseMatch?.index ?? htmlCloseMatch?.index ?? documentHtml.length;
    bodyContent = documentHtml.slice(bodyStartIndex, bodyEndIndex);
  }

  const bodyClass = parseAttribute(bodyAttributes, "class") ?? "";
  const title = (headHtml.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "Velocare Auto Studio").trim();
  const description = extractDescription(headHtml);

  const bodyWithoutScripts = bodyContent.replace(/<script\b[\s\S]*?<\/script>/gi, "");
  const normalizedBody = rewriteInternalHtmlLinks(
    absolutizeKnownPathFragments(absolutizeCssUrls(absolutizeAttributeUrls(bodyWithoutScripts))),
  ).trim();

  return {
    fileName,
    canonicalPath: toCanonicalPath(fileName),
    title,
    description,
    bodyClass,
    bodyHtml: normalizedBody,
    stylesheets: extractStylesheets(headHtml),
    scripts: extractScripts(documentHtml),
  };
});