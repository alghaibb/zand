import { prisma } from "@/lib/db";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleForm } from "../_components/article-form";
import { DeleteArticleButton } from "./_components/delete-article-button";

interface EditArticlePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditArticlePage({
  params,
}: EditArticlePageProps) {
  const { id } = await params;

  const article = await prisma.article.findUnique({
    where: { id },
  });

  if (!article) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/articles"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Articles
        </Link>
        <div className="flex items-center justify-between mt-3">
          <h1 className="text-2xl font-bold font-poppins tracking-tight">
            Edit Article
          </h1>
          <div className="flex items-center gap-3">
            {article.published && (
              <Link
                href={`/article/${article.slug}`}
                target="_blank"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                View live
              </Link>
            )}
            <DeleteArticleButton id={article.id} />
          </div>
        </div>
      </div>

      <div className="max-w-4xl">
        <ArticleForm article={article} />
      </div>
    </div>
  );
}
