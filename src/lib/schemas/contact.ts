import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  phone: z
    .string()
    .optional()
    .refine((val) => !val || (val.length >= 8 && val.length <= 20 && /^[\+]?[\d\s\-\(\)\.]+$/.test(val)), "Please enter a valid phone number (8-20 characters)"),
  subject: z
    .string()
    .max(200, "Subject must be less than 200 characters")
    .optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;