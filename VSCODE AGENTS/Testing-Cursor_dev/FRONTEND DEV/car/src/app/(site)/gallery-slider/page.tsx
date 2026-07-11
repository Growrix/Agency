import { BaselineFilePage } from "@/components/site/baseline-file-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Gallery Slider",
  pathname: "/gallery-slider",
  description: "Baseline gallery-slider page parity.",
});

export default function GallerySliderPage() {
  return <BaselineFilePage fileName="gallery-slider.html" />;
}
