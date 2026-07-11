import type { Metadata } from "next";
import { NativeRoutePage, getNativeMetadata } from "@/components/site/native-route-page";

export function generateMetadata(): Metadata {
  return getNativeMetadata("about");
}

export default function Page() {
  return <NativeRoutePage slug="about" />;
}
