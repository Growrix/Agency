import type { Metadata } from "next";
import { NativeRoutePage, getNativeMetadata } from "@/components/site/native-route-page";

export function generateMetadata(): Metadata {
  return getNativeMetadata("car-single");
}

export default function Page() {
  return <NativeRoutePage slug="car-single" />;
}
