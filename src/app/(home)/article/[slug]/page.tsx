import { prisma } from "@/lib/db";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleDetailContent } from "./_components/article-detail-content";

interface ArticleDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ArticleDetailPageProps): Promise<Metadata> {
  const { slug } = await params;

  const article = await prisma.article.findUnique({
    where: { slug, published: true },
    select: { title: true, excerpt: true },
  });

  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: article.title,
    description: article.excerpt || `Read ${article.title} on Zand`,
  };
}

export default async function ArticleDetailPage({
  params,
}: ArticleDetailPageProps) {
  const { slug } = await params;

  const article = await prisma.article.findUnique({
    where: { slug, published: true },
  });

  if (!article) {
    notFound();
  }

  return <ArticleDetailContent article={article} />;
}
