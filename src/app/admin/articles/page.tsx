import { prisma } from "@/lib/db";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function ArticlesPage() {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-poppins">Articles</h1>
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Article
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="border border-border rounded-lg p-12 text-center">
          <p className="text-muted-foreground mb-4">No articles yet.</p>
          <Link
            href="/admin/articles/new"
            className="text-primary hover:underline"
          >
            Create your first article
          </Link>
        </div>
      ) : (
        <div className="border border-border rounded-lg divide-y divide-border">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/admin/articles/${article.id}`}
              className="block p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{article.title}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-muted-foreground">
                      /{article.slug}
                    </span>
                    {article.category && (
                      <span className="text-xs px-2 py-0.5 bg-muted rounded-full">
                        {article.category}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    {article.createdAt.toLocaleDateString()}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      article.published
                        ? "bg-green-500/10 text-green-500"
                        : "bg-yellow-500/10 text-yellow-500"
                    }`}
                  >
                    {article.published ? "Published" : "Draft"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
