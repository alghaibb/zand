import { prisma } from "@/lib/db";
import { FileText, Mail } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const [articleCount, contactCount] = await Promise.all([
    prisma.article.count(),
    prisma.contact.count(),
  ]);

  const recentArticles = await prisma.article.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, published: true, createdAt: true },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold font-poppins mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div className="border border-border rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{articleCount}</p>
              <p className="text-muted-foreground text-sm">Articles</p>
            </div>
          </div>
        </div>

        <div className="border border-border rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{contactCount}</p>
              <p className="text-muted-foreground text-sm">Contact Messages</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border border-border rounded-lg">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold">Recent Articles</h2>
          <Link
            href="/admin/articles/new"
            className="text-sm text-primary hover:underline"
          >
            Create New →
          </Link>
        </div>
        {recentArticles.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            <p>No articles yet.</p>
            <Link
              href="/admin/articles/new"
              className="text-primary hover:underline"
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
                className="block p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{article.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {article.createdAt.toLocaleDateString()}
                    </p>
                  </div>
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
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
