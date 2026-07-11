import { RouteGrid } from "@/components/site/route-grid";
import { sitePages } from "@/data/site-pages";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Route Index",
  pathname: "/routes",
  description: "Canonical route inventory for the production Next.js template lane.",
});

export default function RoutesPage() {
  return (
    <RouteGrid
      heading="Velocare Route Index"
      description="Canonical Next.js routes replacing legacy HTML-slug ownership."
      items={sitePages.map((page) => ({
        title: page.title,
        href: page.href,
        summary: page.summary,
        badge: page.module.replace("_", " "),
      }))}
    />
  );
}
