import { getAllArticles } from "@/lib/queries";
import { FileText, Plus } from "lucide-react";
import Link from "next/link";

export default async function ArticlesPage() {
  const articles = await getAllArticles();

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold font-poppins tracking-tight">
            Articles
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage and create your blog articles.
          </p>
        </div>
        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          New Article
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="bg-background rounded-xl border border-border shadow-sm p-16 text-center">
          <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center mx-auto mb-4">
            <FileText className="w-7 h-7 text-muted-foreground" />
          </div>
          <h3 className="text-sm font-semibold mb-1">No articles yet</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get started by creating your first article.
          </p>
          <Link
            href="/admin/articles/new"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Article
          </Link>
        </div>
      ) : (
        <div className="bg-background rounded-xl border border-border shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-[1fr_120px_100px_100px] px-6 py-3 border-b border-border bg-muted/30">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Title
            </span>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Category
            </span>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Date
            </span>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider text-right">
              Status
            </span>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-border">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/admin/articles/${article.id}`}
                className="grid grid-cols-[1fr_120px_100px_100px] px-6 py-4 items-center hover:bg-muted/50 transition-colors group"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                    {article.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">
                    /{article.slug}
                  </p>
                </div>
                <div>
                  {article.category ? (
                    <span className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-medium">
                      {article.category}
                    </span>
                  ) : (
                    <span className="text-xs text-muted-foreground/50">--</span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {article.createdAt.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <div className="text-right">
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      article.published
                        ? "bg-green-500/10 text-green-600 dark:text-green-400"
                        : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                    }`}
                  >
                    {article.published ? "Published" : "Draft"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
