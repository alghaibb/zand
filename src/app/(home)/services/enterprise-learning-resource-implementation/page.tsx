import { Metadata } from "next";
import { ServiceDetailContent } from "../_components/service-detail-content";

export const metadata: Metadata = {
  title: "Enterprise Learning Resource Implementation (ERP)",
  description:
    "Enterprise resource planning and learning system implementation. Transform your organization with integrated business solutions.",
};

export default function ERPPage() {
  return (
    <ServiceDetailContent
      title="Enterprise Learning Resource Implementation (ERP)"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
      offerings={[
        "ERP system selection and implementation",
        "Business process optimization",
        "Data migration and integration",
        "Training and ongoing support",
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
