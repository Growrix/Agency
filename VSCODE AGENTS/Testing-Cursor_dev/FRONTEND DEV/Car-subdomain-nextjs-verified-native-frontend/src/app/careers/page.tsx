import type { Metadata } from "next";
import { NativeRoutePage, getNativeMetadata } from "@/components/site/native-route-page";

export function generateMetadata(): Metadata {
  return getNativeMetadata("careers");
}

export default function Page() {
  return <NativeRoutePage slug="careers" />;
}
