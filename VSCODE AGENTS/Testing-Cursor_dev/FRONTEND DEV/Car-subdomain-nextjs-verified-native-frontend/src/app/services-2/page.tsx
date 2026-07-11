import type { Metadata } from "next";
import { NativeRoutePage, getNativeMetadata } from "@/components/site/native-route-page";

export function generateMetadata(): Metadata {
  return getNativeMetadata("services-2");
}

export default function Page() {
  return <NativeRoutePage slug="services-2" />;
}
