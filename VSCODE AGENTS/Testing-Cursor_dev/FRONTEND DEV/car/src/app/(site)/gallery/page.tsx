import { BaselineFilePage } from "@/components/site/baseline-file-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Gallery",
  pathname: "/gallery",
  description: "Baseline gallery page parity.",
});

export default function GalleryPage() {
  return <BaselineFilePage fileName="gallery.html" />;
}
