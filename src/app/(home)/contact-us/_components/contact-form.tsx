"use client";

import { submitContactForm } from "@/app/(home)/contact-us/actions";
import { LoadingButton } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema } from "@/lib/schemas/contact";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";

type FieldErrors = Record<string, string>;

export function ContactForm() {
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<FieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    setErrors({});

    const rawData = {
      name: formData.get("name")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
      subject: formData.get("subject")?.toString() || "",
      message: formData.get("message")?.toString() || "",
    };

    const result = contactSchema.safeParse(rawData);

    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      toast.error("Please fill in all required fields and try again.");
      return;
    }

    startTransition(async () => {
      try {
        const serverResult = await submitContactForm(formData);
        if (serverResult.success) {
          toast.success(serverResult.message);
          formRef.current?.reset();
        } else {
          if (serverResult.errors) {
            setErrors(serverResult.errors);
          }
          toast.error(serverResult.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("An unexpected error occurred. Please try again.");
      }
    });
  }

  return (
    <div className="space-y-6">
      <form ref={formRef} action={handleSubmit} className="space-y-6">
        <FieldSet>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field data-invalid={!!errors.name}>
              <FieldLabel htmlFor="name">Name *</FieldLabel>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your full name"
                aria-invalid={!!errors.name}
                disabled={isPending}
              />
              <FieldError>{errors.name}</FieldError>
            </Field>

            <Field data-invalid={!!errors.email}>
              <FieldLabel htmlFor="email">Email *</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                aria-invalid={!!errors.email}
                disabled={isPending}
              />
              <FieldError>{errors.email}</FieldError>
            </Field>

            <Field data-invalid={!!errors.phone}>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                aria-invalid={!!errors.phone}
                disabled={isPending}
              />
              <FieldError>{errors.phone}</FieldError>
              <FieldDescription>
                Optional: Include country code for international numbers.
              </FieldDescription>
            </Field>

            <Field data-invalid={!!errors.subject}>
              <FieldLabel htmlFor="subject">Subject</FieldLabel>
              <Input
                id="subject"
                name="subject"
                type="text"
                placeholder="How can we help you?"
                aria-invalid={!!errors.subject}
                disabled={isPending}
              />
              <FieldError>{errors.subject}</FieldError>
            </Field>
          </FieldGroup>

          <Field data-invalid={!!errors.message}>
            <FieldLabel htmlFor="message">Message *</FieldLabel>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell us more about your inquiry..."
              rows={6}
              aria-invalid={!!errors.message}
              disabled={isPending}
            />
            <FieldError>{errors.message}</FieldError>
            <FieldDescription>
              Please provide as much detail as you&apos;d like. We&apos;re here
              to help!
            </FieldDescription>
          </Field>

          <div className="flex pt-4 w-full">
            <LoadingButton
              type="submit"
              className="min-w-32"
              isLoading={isPending}
              loadingText="Sending..."
            >
              Send Message
            </LoadingButton>
          </div>
        </FieldSet>
      </form>
    </div>
  );
}
