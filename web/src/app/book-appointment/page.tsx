import type { Metadata } from "next";
import { BookAppointmentExperience } from "./BookAppointmentExperience";

export const metadata: Metadata = {
  title: "Book a Discovery Call | GrowrixOS",
  description:
    "Schedule a 30-minute discovery call with GrowrixOS to clarify scope, timeline, and the right path for your website, SaaS, mobile, automation, or AI project.",
};

export default function BookPage() {
  return <BookAppointmentExperience />;
}
