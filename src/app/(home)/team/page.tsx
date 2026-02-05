import { Metadata } from "next";
import { TeamPageContent } from "./_components/team-page-content";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the talented team behind Zand. We're passionate about delivering exceptional digital solutions.",
};

export default function TeamPage() {
  return <TeamPageContent />;
}
