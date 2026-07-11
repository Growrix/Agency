import type { Metadata } from "next";
import { NativeRoutePage, getNativeMetadata } from "@/components/site/native-route-page";

export function generateMetadata(): Metadata {
  return getNativeMetadata("index");
}

export default function HomePage() {
  return <NativeRoutePage slug="index" />;
}
