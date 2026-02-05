import { Metadata } from "next";
import { ServiceDetailContent } from "../_components/service-detail-content";

export const metadata: Metadata = {
  title: "Microsoft Implementation",
  description:
    "Professional Microsoft implementation services. We help businesses leverage the full power of Microsoft 365, Azure, and enterprise solutions.",
};

export default function MicrosoftImplementationPage() {
  return (
    <ServiceDetailContent
      title="Microsoft Implementation"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
      offerings={[
        "Microsoft 365 deployment and configuration",
        "Azure cloud infrastructure setup",
        "SharePoint and Teams implementation",
        "Power Platform solutions",
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
