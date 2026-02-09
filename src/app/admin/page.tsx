import { getDashboardStats, getRecentArticles } from "@/lib/queries";
import { ArrowRight, FileText, Mail, Plus } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const [{ articleCount, contactCount, publishedCount }, recentArticles] =
    await Promise.all([getDashboardStats(), getRecentArticles()]);

  const draftCount = articleCount - publishedCount;

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold font-poppins tracking-tight">
            Dashboard
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Overview of your content and activity.
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

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-background rounded-xl border border-border p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Total Articles
            </span>
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="w-4 h-4 text-primary" />
            </div>
          </div>
          <p className="text-3xl font-bold tracking-tight">{articleCount}</p>
        </div>

        <div className="bg-background rounded-xl border border-border p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Published
            </span>
            <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center">
              <FileText className="w-4 h-4 text-green-500" />
            </div>
          </div>
          <p className="text-3xl font-bold tracking-tight">{publishedCount}</p>
        </div>

        <div className="bg-background rounded-xl border border-border p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Drafts
            </span>
            <div className="w-9 h-9 rounded-lg bg-yellow-500/10 flex items-center justify-center">
              <FileText className="w-4 h-4 text-yellow-500" />
            </div>
          </div>
          <p className="text-3xl font-bold tracking-tight">{draftCount}</p>
        </div>

        <div className="bg-background rounded-xl border border-border p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Messages
            </span>
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Mail className="w-4 h-4 text-primary" />
            </div>
          </div>
          <p className="text-3xl font-bold tracking-tight">{contactCount}</p>
        </div>
      </div>

      {/* Recent Articles */}
      <div className="bg-background rounded-xl border border-border shadow-sm">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold text-sm">Recent Articles</h2>
          <Link
            href="/admin/articles"
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            View all
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        {recentArticles.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm mb-3">
              No articles yet
            </p>
            <Link
              href="/admin/articles/new"
              className="text-sm font-medium text-primary hover:underline"
            >
              Create your first article
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {recentArticles.map((article) => (
              <Link
                key={article.id}
                href={`/admin/articles/${article.id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-muted/50 transition-colors group"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium group-hover:text-primary transition-colors truncate">
                    {article.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {article.createdAt.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ml-4 ${
                    article.published
                      ? "bg-green-500/10 text-green-600 dark:text-green-400"
                      : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
                  }`}
                >
                  {article.published ? "Published" : "Draft"}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
