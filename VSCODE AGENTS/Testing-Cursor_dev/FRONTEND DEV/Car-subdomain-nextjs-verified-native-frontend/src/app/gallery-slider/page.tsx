import type { Metadata } from "next";
import { NativeRoutePage, getNativeMetadata } from "@/components/site/native-route-page";

export function generateMetadata(): Metadata {
  return getNativeMetadata("gallery-slider");
}

export default function Page() {
  return <NativeRoutePage slug="gallery-slider" />;
}
