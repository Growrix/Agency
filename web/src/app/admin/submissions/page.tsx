import type { Metadata } from "next";
import { SubmissionsInboxClient } from "./SubmissionsInboxClient";

export const metadata: Metadata = {
  title: "Submissions Inbox · Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function SubmissionsInboxPage() {
  return <SubmissionsInboxClient />;
}
