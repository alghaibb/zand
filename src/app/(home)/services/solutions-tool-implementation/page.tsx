import { Metadata } from "next";
import { ServiceDetailContent } from "../_components/service-detail-content";

export const metadata: Metadata = {
  title: "Solutions / Tool Implementation",
  description:
    "Expert solutions and tool implementation services. We help businesses integrate and optimize their digital tools for maximum efficiency.",
};

export default function SolutionsToolImplementationPage() {
  return (
    <ServiceDetailContent
      title="Solutions / Tool Implementation"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
      offerings={[
        "Lorem ipsum dolor sit amet consectetur",
        "Adipiscing elit sed do eiusmod tempor",
        "Incididunt ut labore et dolore magna",
        "Aliqua ut enim ad minim veniam quis",
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
