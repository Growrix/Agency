import { BaselineFilePage } from "@/components/site/baseline-file-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Product Detail",
  pathname: "/shop/[slug]",
  description: "Baseline shop product single page parity.",
});

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ShopSlugPage({ params }: PageProps) {
  await params;
  return <BaselineFilePage fileName="shop-product-single.html" />;
}
