import { prisma } from "@/lib/db";
import { Metadata } from "next";
import { ArticlePageContent } from "./_components/article-page-content";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Insights, tutorials, and news from the Zand team. Stay updated with the latest in web development and digital marketing.",
};

export default async function ArticlePage() {
  const articles = await prisma.article.findMany({
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

  return <ArticlePageContent articles={articles} />;
}
