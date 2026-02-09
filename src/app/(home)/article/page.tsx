import { getPublishedArticles } from "@/lib/queries";
import { Metadata } from "next";
import { ArticlePageContent } from "./_components/article-page-content";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Insights, tutorials, and news from the Zand team. Stay updated with the latest in web development and digital marketing.",
};

export default async function ArticlePage() {
  const articles = await getPublishedArticles();

  return <ArticlePageContent articles={articles} />;
}
