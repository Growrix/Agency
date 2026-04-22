import type { Metadata } from "next";
import { BookAppointmentExperience } from "./BookAppointmentExperience";

export const metadata: Metadata = {
  title: "Book Appointment",
  description: "Schedule a 30-minute discovery call with Growrix OS.",
};

export default function BookPage() {
  return <BookAppointmentExperience />;
}
