import type { Metadata } from "next";
import { NativeRoutePage, getNativeMetadata } from "@/components/site/native-route-page";

export function generateMetadata(): Metadata {
  return getNativeMetadata("shop-product-single");
}

export default function Page() {
  return <NativeRoutePage slug="shop-product-single" />;
}
