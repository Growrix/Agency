import fs from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

const HTML_FILE_PATTERN = /^[a-z0-9-]+\.html$/i;

function getHtmlCompatibilityRedirects() {
  const publicRoot = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicRoot)) {
    return [];
  }

  return fs
    .readdirSync(publicRoot, { withFileTypes: true })
    .filter((entry) => entry.isFile() && HTML_FILE_PATTERN.test(entry.name))
    .map((entry) => entry.name)
    .map((fileName) => {
      const destination = fileName.toLowerCase() === "index.html" ? "/" : `/${fileName.replace(/\.html$/i, "")}`;
      return {
        source: `/${fileName}`,
        destination,
        permanent: true,
      };
    });
}

const htmlCompatibilityRedirects = getHtmlCompatibilityRedirects();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return htmlCompatibilityRedirects;
  },
};

export default nextConfig;
