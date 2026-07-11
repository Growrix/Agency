import { BaselineFilePage } from "@/components/site/baseline-file-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Privacy",
  pathname: "/privacy",
  description: "Baseline privacy page parity.",
});

export default function PrivacyPage() {
  return <BaselineFilePage fileName="privacy.html" />;
}
