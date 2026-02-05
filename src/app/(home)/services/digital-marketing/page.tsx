import { Metadata } from "next";
import { ServiceDetailContent } from "../_components/service-detail-content";

export const metadata: Metadata = {
  title: "Digital Marketing",
  description:
    "Results-driven digital marketing services. From SEO to social media, we help businesses grow their online presence.",
};

export default function DigitalMarketingPage() {
  return (
    <ServiceDetailContent
      title="Digital Marketing"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
      offerings={[
        "Search Engine Optimization (SEO)",
        "Social media marketing and management",
        "Pay-per-click advertising (PPC)",
        "Email marketing campaigns",
      ]}
      whyChooseUs={{
        paragraph1:
          "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
        paragraph2:
          "Sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      }}
    />
  );
}
