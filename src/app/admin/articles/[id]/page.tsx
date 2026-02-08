import { prisma } from "@/lib/db";
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
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          ← Back to Articles
        </Link>
        <div className="flex items-center justify-between mt-4">
          <h1 className="text-3xl font-bold font-poppins">Edit Article</h1>
          <div className="flex items-center gap-4">
            {article.published && (
              <Link
                href={`/article/${article.slug}`}
                className="text-sm text-primary hover:underline"
                target="_blank"
              >
                View Article →
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
