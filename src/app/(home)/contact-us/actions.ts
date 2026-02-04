"use server";

import { revalidatePath } from "next/cache";
import { contactSchema } from "@/lib/schemas/contact";
import { prisma } from "@/lib/db";

export async function submitContactForm(formData: FormData) {
  try {
    // Parse form data
    const rawData = {
      name: formData.get("name")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      phone: formData.get("phone")?.toString() || "",
      subject: formData.get("subject")?.toString() || "",
      message: formData.get("message")?.toString() || "",
    };

    // Validate the data
    const validatedData = contactSchema.parse(rawData);

    // Save to database
    await prisma.contact.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        subject: validatedData.subject || null,
        message: validatedData.message,
      },
    });

    // Revalidate the contact page
    revalidatePath("/contact-us");

    return { success: true, message: "Thank you for your message! We'll get back to you soon." };
  } catch (error) {
    if (error instanceof Error) {
      // Handle validation errors
      if (error.name === "ZodError") {
        const zodError = error as { issues?: Array<{ path: string[]; message: string }> };
        return {
          success: false,
          message: "Please check your input and try again.",
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