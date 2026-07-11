import type { Metadata } from "next";
import { NativeRoutePage, getNativeMetadata } from "@/components/site/native-route-page";

export function generateMetadata(): Metadata {
  return getNativeMetadata("homepage-4");
}

export default function Page() {
  return <NativeRoutePage slug="homepage-4" />;
}
