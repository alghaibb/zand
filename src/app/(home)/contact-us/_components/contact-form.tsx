"use client";

import { submitContactForm } from "@/app/(home)/contact-us/actions";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTransition } from "react";
import { toast } from "sonner";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        const result = await submitContactForm(formData);
        if (result.success) {
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    });
  }

  return (
    <div className="space-y-6">
      <form action={handleSubmit} className="space-y-6">
        <FieldSet>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field>
              <FieldLabel htmlFor="name">Name *</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your full name"
                required
              />
              <FieldDescription>
                This will help us address you properly.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email *</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                required
              />
              <FieldDescription>
                We&apos;ll use this to respond to your message.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
              />
              <FieldDescription>
                Optional: Include country code for international numbers.
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="subject">Subject</FieldLabel>
              <Input
                id="subject"
                name="subject"
                type="text"
                placeholder="How can we help you?"
              />
              <FieldDescription>
                Optional: Give us a brief idea of what this is about.
              </FieldDescription>
            </Field>
          </FieldGroup>

          <Field>
            <FieldLabel htmlFor="message">Message *</FieldLabel>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell us more about your inquiry..."
              rows={6}
              required
            />
            <FieldDescription>
              Please provide as much detail as you&apos;d like. We&apos;re here
              to help!
            </FieldDescription>
          </Field>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isPending} className="min-w-32">
              {isPending ? "Sending..." : "Send Message"}
            </Button>
          </div>
        </FieldSet>
      </form>
    </div>
  );
}
