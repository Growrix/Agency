import { notFound } from "next/navigation";
import type { PageKey } from "@/data/site-content";
import { sitePages } from "@/data/site-content";
import { lumoriaSnapshotNodesByRoute } from "@/data/lumoria-snapshot-index";
import { RenderSnapshotNodes } from "@/components/snapshot/render-snapshot-nodes";

type SitePageViewProps = {
  pageKey: PageKey;
};

const routePathByPageKey = Object.fromEntries(
  Object.values(sitePages).map((page) => [page.key, page.path]),
) as Record<PageKey, string>;

export function SitePageView({ pageKey }: SitePageViewProps) {
  const routePath = routePathByPageKey[pageKey];
  const routeNodes = routePath ? lumoriaSnapshotNodesByRoute[routePath] : undefined;

  if (!routePath || !routeNodes) {
    notFound();
  }

  return <RenderSnapshotNodes nodes={routeNodes} />;
}
