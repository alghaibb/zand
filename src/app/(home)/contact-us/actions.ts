"use server";

import { prisma } from "@/lib/db";
import { contactSchema } from "@/lib/schemas/contact";
import { updateTag } from "next/cache";

export async function submitContactForm(formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
      subject: formData.get("subject")?.toString() || "",
      message: formData.get("message")?.toString() || "",
    };

    const validatedData = contactSchema.parse(rawData);

    await prisma.contact.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        subject: validatedData.subject || null,
        message: validatedData.message,
      },
    });

    updateTag("contacts");

    return { success: true, message: "Thank you for your message! We'll get back to you soon." };
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "ZodError") {
        const zodError = error as { issues?: Array<{ path: string[]; message: string }> };
        return {
          success: false,
          message: "Please fill in all required fields and try again.",
          errors: zodError.issues?.reduce((acc: Record<string, string>, issue) => {
            acc[issue.path[0]] = issue.message;
            return acc;
          }, {}) || {},
        };
      }
      return { success: false, message: "Something went wrong. Please try again." };
    }
    return { success: false, message: "An unexpected error occurred." };
  }
}