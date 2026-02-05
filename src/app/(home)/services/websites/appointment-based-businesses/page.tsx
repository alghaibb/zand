import { Metadata } from "next";
import { ServiceDetailContent } from "../../_components/service-detail-content";

export const metadata: Metadata = {
  title: "Appointment Based Businesses",
  description:
    "Specialized websites for appointment-based businesses. Online booking, scheduling, and client management solutions.",
};

export default function AppointmentBasedBusinessesPage() {
  return (
    <ServiceDetailContent
      label="Website Service"
      title="Appointment Based Businesses"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
      backLink="/services/websites"
      backLabel="Back to Websites"
      offerings={[
        "Online booking and scheduling systems",
        "Client management and CRM integration",
        "Automated reminders and notifications",
        "Payment processing integration",
      ]}
      industries={[
        "Salons & Spas",
        "Medical Practices",
        "Consultants",
        "Fitness Studios",
        "Photographers",
        "Therapists",
        "Tutors",
        "Coaches",
      ]}
    />
  );
}
