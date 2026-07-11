import { BaselineFilePage } from "@/components/site/baseline-file-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Team",
  pathname: "/team",
  description: "Baseline team page parity.",
});

export default function TeamPage() {
  return <BaselineFilePage fileName="team.html" />;
}
