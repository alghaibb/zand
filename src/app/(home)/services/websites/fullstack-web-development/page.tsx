import { Metadata } from "next";
import { ServiceDetailContent } from "../../_components/service-detail-content";

export const metadata: Metadata = {
  title: "Fullstack Web Development",
  description:
    "End-to-end fullstack web development services. Complete solutions from database to UI, built with modern technologies.",
};

export default function FullstackWebDevelopmentPage() {
  return (
    <ServiceDetailContent
      label="Website Service"
      title="Fullstack Web Development"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
      backLink="/services/websites"
      backLabel="Back to Websites"
      offerings={[
        "Complete web application development",
        "Custom CMS and admin dashboards",
        "E-commerce platforms",
        "SaaS application development",
      ]}
      technologies={[
        "Next.js",
        "Node.js",
        "TypeScript",
        "PostgreSQL",
        "Prisma",
        "tRPC",
        "Tailwind CSS",
        "Vercel",
      ]}
    />
  );
}
