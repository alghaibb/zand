import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title is too long"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .max(200, "Slug is too long")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase with hyphens only"
    ),
  excerpt: z.string().max(500, "Excerpt is too long").optional().or(z.literal("")),
  content: z.string().min(1, "Content is required"),
  coverImage: z.string().url("Invalid URL").optional().or(z.literal("")),
  category: z.string().max(50, "Category is too long").optional().or(z.literal("")),
  published: z.boolean().default(false),
});

export type ArticleInput = z.infer<typeof articleSchema>;

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .substring(0, 200);
}
