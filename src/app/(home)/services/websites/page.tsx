import { Metadata } from "next";
import { WebsitesPageContent } from "./_components/websites-page-content";

export const metadata: Metadata = {
  title: "Websites",
  description:
    "Comprehensive website development services. From frontend to fullstack, we build websites that perform.",
};

export default function WebsitesPage() {
  return <WebsitesPageContent />;
}
