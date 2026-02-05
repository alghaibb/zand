import { Metadata } from "next";
import { ServiceDetailContent } from "../../_components/service-detail-content";

export const metadata: Metadata = {
  title: "Backend Development",
  description:
    "Robust backend development services. Scalable APIs, database design, and server infrastructure that powers your applications.",
};

export default function BackendDevelopmentPage() {
  return (
    <ServiceDetailContent
      label="Website Service"
      title="Backend Development"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
      backLink="/services/websites"
      backLabel="Back to Websites"
      offerings={[
        "RESTful and GraphQL API development",
        "Database design and optimization",
        "Authentication and security",
        "Cloud infrastructure and DevOps",
      ]}
      technologies={[
        "Node.js",
        "Python",
        "PostgreSQL",
        "MongoDB",
        "Redis",
        "Docker",
        "AWS",
        "Prisma",
      ]}
    />
  );
}
