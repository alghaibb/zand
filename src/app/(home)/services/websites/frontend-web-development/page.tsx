import { Metadata } from "next";
import { ServiceDetailContent } from "../../_components/service-detail-content";

export const metadata: Metadata = {
  title: "Frontend Web Development",
  description:
    "Expert frontend web development services. We create beautiful, responsive, and performant user interfaces using modern technologies.",
};

export default function FrontendWebDevelopmentPage() {
  return (
    <ServiceDetailContent
      label="Website Service"
      title="Frontend Web Development"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
      backLink="/services/websites"
      backLabel="Back to Websites"
      offerings={[
        "React, Next.js, and Vue.js development",
        "Responsive and mobile-first design",
        "Performance optimization and Core Web Vitals",
        "Accessibility (WCAG) compliance",
      ]}
      technologies={[
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Vue.js",
        "Nuxt",
        "SCSS",
        "Framer Motion",
      ]}
    />
  );
}
