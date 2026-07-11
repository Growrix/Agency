import type { NextConfig } from "next";
import fs from "node:fs";
import path from "node:path";

type NativeRouteEntry = {
  slug: string;
  fileName: string;
  htmlPath: string;
  canonicalPath: string;
};

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["localhost", "127.0.0.1"],
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    const routeManifestPath = path.join(process.cwd(), "src", "data", "native-route-list.json");
    const routes: NativeRouteEntry[] = fs.existsSync(routeManifestPath)
      ? JSON.parse(fs.readFileSync(routeManifestPath, "utf8"))
      : [];

    const mappedRedirects = routes
      .map((route) => {
        const source = route.htmlPath;
        const destination = route.canonicalPath;

        if (source === destination) {
          return null;
        }

        return {
          source,
          destination,
          permanent: true,
        };
      })
      .filter((redirect): redirect is { source: string; destination: string; permanent: true } => Boolean(redirect));

    return [
      ...mappedRedirects,
    ];
  },
};

export default nextConfig;
