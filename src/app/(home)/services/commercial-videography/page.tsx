import { Metadata } from "next";
import { ServiceDetailContent } from "../_components/service-detail-content";

export const metadata: Metadata = {
  title: "Commercial Videography",
  description:
    "Professional commercial videography services. Compelling video content that engages your audience and tells your story.",
};

export default function CommercialVideographyPage() {
  return (
    <ServiceDetailContent
      title="Commercial Videography"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
      offerings={[
        "Brand and promotional videos",
        "Corporate communications and training",
        "Social media video content",
        "Event and conference filming",
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
