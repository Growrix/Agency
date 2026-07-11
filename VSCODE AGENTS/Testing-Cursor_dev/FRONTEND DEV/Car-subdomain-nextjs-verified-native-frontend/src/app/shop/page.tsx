import type { Metadata } from "next";
import { NativeRoutePage, getNativeMetadata } from "@/components/site/native-route-page";

export function generateMetadata(): Metadata {
  return getNativeMetadata("shop");
}

export default function Page() {
  return <NativeRoutePage slug="shop" />;
}
