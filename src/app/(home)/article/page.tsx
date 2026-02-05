import { Metadata } from "next";
import { ArticlePageContent } from "./_components/article-page-content";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Insights, tutorials, and news from the Zand team. Stay updated with the latest in web development and digital marketing.",
};

export default function ArticlePage() {
  return <ArticlePageContent />;
}
