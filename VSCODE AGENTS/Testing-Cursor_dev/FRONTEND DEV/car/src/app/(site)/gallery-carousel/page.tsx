import { BaselineFilePage } from "@/components/site/baseline-file-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Gallery Carousel",
  pathname: "/gallery-carousel",
  description: "Baseline gallery-carousel page parity.",
});

export default function GalleryCarouselPage() {
  return <BaselineFilePage fileName="gallery-carousel.html" />;
}
