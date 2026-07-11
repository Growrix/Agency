import type { Metadata } from "next";
import { NativeRoutePage, getNativeMetadata } from "@/components/site/native-route-page";

export function generateMetadata(): Metadata {
  return getNativeMetadata("contact");
}

export default function Page() {
  return <NativeRoutePage slug="contact" />;
}
