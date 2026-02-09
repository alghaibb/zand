"use cache";

import { prisma } from "@/lib/db";
import { cacheLife, cacheTag } from "next/cache";

// ─── Dashboard Stats ─────────────────────────────────────────────────────────

export async function getDashboardStats() {
  cacheTag("articles", "contacts");
  cacheLife("minutes");

  const [articleCount, contactCount, publishedCount] = await Promise.all([
    prisma.article.count(),
    prisma.contact.count(),
    prisma.article.count({ where: { published: true } }),
  ]);

  return { articleCount, contactCount, publishedCount };
}

export async function getRecentArticles() {
  cacheTag("articles");
  cacheLife("minutes");

  return prisma.article.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, published: true, createdAt: true },
  });
}

// ─── Admin Articles ──────────────────────────────────────────────────────────

export async function getAllArticles() {
  cacheTag("articles");
  cacheLife("minutes");

  return prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getArticleById(id: string) {
  cacheTag("articles");
  cacheLife("minutes");

  return prisma.article.findUnique({
    where: { id },
  });
}

// ─── Public Articles ─────────────────────────────────────────────────────────

export async function getPublishedArticles() {
  cacheTag("articles");
  cacheLife("hours");

  return prisma.article.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      category: true,
      publishedAt: true,
    },
  });
}

export async function getPublishedArticleBySlug(slug: string) {
  cacheTag("articles");
  cacheLife("hours");

  return prisma.article.findUnique({
    where: { slug, published: true },
  });
}

export async function getArticleMetaBySlug(slug: string) {
  cacheTag("articles");
  cacheLife("hours");

  return prisma.article.findUnique({
    where: { slug, published: true },
    select: { title: true, excerpt: true },
  });
}

// ─── Admin Users ─────────────────────────────────────────────────────────────

export async function getAdminUsers() {
  cacheTag("admin-users");
  cacheLife("minutes");

  return prisma.adminUser.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });
}
