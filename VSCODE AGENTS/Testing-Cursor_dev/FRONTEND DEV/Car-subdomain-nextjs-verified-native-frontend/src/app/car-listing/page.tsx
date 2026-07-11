import type { Metadata } from "next";
import { NativeRoutePage, getNativeMetadata } from "@/components/site/native-route-page";

export function generateMetadata(): Metadata {
  return getNativeMetadata("car-listing");
}

export default function Page() {
  return <NativeRoutePage slug="car-listing" />;
}
