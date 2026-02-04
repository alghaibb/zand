"use server";

import { revalidatePath } from "next/cache";
import { contactSchema } from "@/lib/schemas/contact";
import { prisma } from "@/lib/db";

export async function submitContactForm(formData: FormData) {
  try {
    // Parse form data
    const getFieldValue = (key: string) => {
      const value = formData.get(key)?.toString().trim();
      return value === "" ? undefined : value;
    };

    const rawData = {
      name: getFieldValue("name") || "",
      email: getFieldValue("email") || "",
      phone: getFieldValue("phone"),
      subject: getFieldValue("subject"),
      message: getFieldValue("message") || "",
    };

    // Validate the data
    const validatedData = contactSchema.parse(rawData);

    // Save to database
    await prisma.contact.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone,
        subject: validatedData.subject,
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