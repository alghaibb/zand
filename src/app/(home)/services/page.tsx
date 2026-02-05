import { Metadata } from "next";
import { ServicesPageContent } from "./_components/services-page-content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore our comprehensive range of digital services including web development, digital marketing, graphic design, and enterprise solutions.",
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
