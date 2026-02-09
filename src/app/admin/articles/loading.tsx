import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ArticlesLoading() {
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

      {/* Table */}
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
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-[1fr_120px_100px_100px] px-6 py-4 items-center"
            >
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-52" />
                <Skeleton className="h-3 w-32" />
              </div>
              <Skeleton className="h-5 w-16 rounded-md" />
              <Skeleton className="h-3 w-14" />
              <Skeleton className="h-6 w-18 rounded-full ml-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
