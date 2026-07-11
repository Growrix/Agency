import { BaselineFilePage } from "@/components/site/baseline-file-page";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Appointment",
  pathname: "/appointment",
  description: "Baseline appointment page parity.",
});

export default function AppointmentPage() {
  return <BaselineFilePage fileName="appointment.html" />;
}
