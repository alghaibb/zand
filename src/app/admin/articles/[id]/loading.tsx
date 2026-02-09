import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function EditArticleLoading() {
  return (
    <div>
      {/* Back link */}
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
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl space-y-6">
        {/* Details Card */}
        <div className="bg-background rounded-xl border border-border shadow-sm p-6">
          <h2 className="text-sm font-semibold mb-4">Details</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-14" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>
        </div>

        {/* Cover Image Card */}
        <div className="bg-background rounded-xl border border-border shadow-sm p-6">
          <h2 className="text-sm font-semibold mb-4">Cover Image</h2>
          <Skeleton className="h-48 w-full rounded-lg" />
        </div>

        {/* Content Card */}
        <div className="bg-background rounded-xl border border-border shadow-sm p-6">
          <h2 className="text-sm font-semibold mb-4">Content</h2>
          <Skeleton className="h-64 w-full rounded-md" />
        </div>

        {/* Publish + Submit */}
        <div className="bg-background rounded-xl border border-border shadow-sm p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-4 rounded" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-10 w-28 rounded-md" />
        </div>
      </div>
    </div>
  );
}
