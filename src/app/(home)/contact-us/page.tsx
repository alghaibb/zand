import { ContactForm } from "./_components/contact-form";

export default function ContactUsPage() {
  return (
    <div className="container mx-auto px-4 py-12 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground text-lg">
            Get in touch with us. We&apos;d love to hear from you.
          </p>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
