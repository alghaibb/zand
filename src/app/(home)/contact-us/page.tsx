import { Metadata } from "next";
import { ContactPageContent } from "./_components/contact-page-content";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Zand. We'd love to hear from you and discuss how we can help with your project.",
};

export default function ContactUsPage() {
  return <ContactPageContent />;
}
