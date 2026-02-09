"use server";

import { prisma } from "@/lib/db";
import { articleSchema } from "@/lib/schemas/article";
import { del } from "@vercel/blob";
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";

interface ActionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

export async function createArticle(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const rawData = {
    title: formData.get("title")?.toString() || "",
    slug: formData.get("slug")?.toString() || "",
    excerpt: formData.get("excerpt")?.toString() || "",
    content: formData.get("content")?.toString() || "",
    coverImage: formData.get("coverImage")?.toString() || "",
    category: formData.get("category")?.toString() || "",
    published: formData.get("published") === "on",
  };

  const result = articleSchema.safeParse(rawData);

  if (!result.success) {
    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string;
      if (!errors[field]) {
        errors[field] = issue.message;
      }
    }
    return { success: false, message: "Please fix the errors below", errors };
  }

  try {
    const existing = await prisma.article.findUnique({
      where: { slug: result.data.slug },
    });

    if (existing) {
      return {
        success: false,
        message: "An article with this slug already exists",
        errors: { slug: "This slug is already in use" },
      };
    }

    await prisma.article.create({
      data: {
        ...result.data,
        excerpt: result.data.excerpt || null,
        coverImage: result.data.coverImage || null,
        category: result.data.category || null,
        publishedAt: result.data.published ? new Date() : null,
      },
    });

    updateTag("articles");
  } catch (error) {
    console.error("Error creating article:", error);
    return { success: false, message: "Failed to create article" };
  }

  redirect("/admin/articles");
}

export async function updateArticle(
  id: string,
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const rawData = {
    title: formData.get("title")?.toString() || "",
    slug: formData.get("slug")?.toString() || "",
    excerpt: formData.get("excerpt")?.toString() || "",
    content: formData.get("content")?.toString() || "",
    coverImage: formData.get("coverImage")?.toString() || "",
    category: formData.get("category")?.toString() || "",
    published: formData.get("published") === "on",
  };

  const result = articleSchema.safeParse(rawData);

  if (!result.success) {
    const errors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string;
      if (!errors[field]) {
        errors[field] = issue.message;
      }
    }
    return { success: false, message: "Please fix the errors below", errors };
  }

  try {
    const existing = await prisma.article.findFirst({
      where: { slug: result.data.slug, NOT: { id } },
    });

    if (existing) {
      return {
        success: false,
        message: "An article with this slug already exists",
        errors: { slug: "This slug is already in use" },
      };
    }

    const current = await prisma.article.findUnique({
      where: { id },
      select: { published: true, publishedAt: true, coverImage: true },
    });

    // Delete old blob if cover image changed
    const newCoverImage = result.data.coverImage || null;
    if (current?.coverImage && current.coverImage !== newCoverImage) {
      try {
        await del(current.coverImage);
      } catch (error) {
        console.error("Error deleting old blob:", error);
      }
    }

    await prisma.article.update({
      where: { id },
      data: {
        ...result.data,
        excerpt: result.data.excerpt || null,
        coverImage: result.data.coverImage || null,
        category: result.data.category || null,
        publishedAt:
          result.data.published && !current?.publishedAt
            ? new Date()
            : current?.publishedAt,
      },
    });

    updateTag("articles");
  } catch (error) {
    console.error("Error updating article:", error);
    return { success: false, message: "Failed to update article" };
  }

  redirect("/admin/articles");
}

export async function deleteArticle(id: string): Promise<ActionResult> {
  try {
    const article = await prisma.article.findUnique({
      where: { id },
      select: { slug: true, coverImage: true },
    });

    // Delete cover image from Vercel Blob if it exists
    if (article?.coverImage) {
      try {
        await del(article.coverImage);
      } catch (error) {
        console.error("Error deleting blob:", error);
      }
    }

    await prisma.article.delete({ where: { id } });

    updateTag("articles");

    return { success: true, message: "Article deleted successfully" };
  } catch (error) {
    console.error("Error deleting article:", error);
    return { success: false, message: "Failed to delete article" };
  }
}
