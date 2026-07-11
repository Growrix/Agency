import { sitePageByCanonicalPath, sitePageBySlug, sitePages } from "@/data/site-pages";

const NON_NAVIGABLE_PROTOCOLS = [
  "mailto:",
  "tel:",
  "javascript:",
  "data:",
  "http://",
  "https://",
  "//",
  "#",
];

const splitHash = (value: string) => {
  const [pathPart, hashPart] = value.split("#");
  return {
    pathPart,
    hashPart,
  };
};

const splitQuery = (value: string) => {
  const [pathname, query] = value.split("?");
  return {
    pathname,
    query,
  };
};

const isExternalOrSpecial = (value: string) => {
  const lower = value.trim().toLowerCase();
  return NON_NAVIGABLE_PROTOCOLS.some((prefix) => lower.startsWith(prefix));
};

export const htmlPathToCanonicalPath = (value: string) => {
  if (!value || isExternalOrSpecial(value)) {
    return value;
  }

  const { pathPart, hashPart } = splitHash(value);
  const { pathname, query } = splitQuery(pathPart);

  if (!pathname) {
    return value;
  }

  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;

  if (!normalizedPath.endsWith(".html")) {
    const rebuilt = normalizedPath;
    const withQuery = query ? `${rebuilt}?${query}` : rebuilt;
    return hashPart ? `${withQuery}#${hashPart}` : withQuery;
  }

  const slug = normalizedPath.replace(/^\//, "").replace(/\.html$/, "");
  const page = sitePageBySlug.get(slug);
  const canonicalPath = page?.canonicalPath ?? `/${slug}`;
  const withQuery = query ? `${canonicalPath}?${query}` : canonicalPath;

  return hashPart ? `${withQuery}#${hashPart}` : withQuery;
};

export const canonicalPathToHtmlPath = (value: string) => {
  const page = sitePageByCanonicalPath.get(value);
  return page?.htmlPath ?? null;
};

export const normalizeAssetPath = (value: string | undefined) => {
  if (!value) {
    return value;
  }

  if (isExternalOrSpecial(value)) {
    return value;
  }

  return value.startsWith("/") ? value : `/${value}`;
};

export const canonicalPaths = sitePages.map((page) => page.canonicalPath);