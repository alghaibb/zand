import { Skeleton } from "@/components/ui/skeleton";

export default function ArticleDetailLoading() {
  return (
    <section className="py-32 lg:py-48 bg-background">
      <div className="max-w-4xl mx-auto px-8 lg:px-16">
        {/* Back link - static */}
        <span className="text-sm text-muted-foreground mb-8 inline-block">
          ← Back to Articles
        </span>

        {/* Article meta */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-3 w-32" />
          </div>
          <Skeleton className="h-10 lg:h-14 w-full max-w-2xl mb-3" />
          <Skeleton className="h-10 lg:h-14 w-2/3 mb-6" />
          <Skeleton className="h-5 w-full max-w-xl" />
        </div>

        {/* Cover image */}
        <Skeleton className="w-full aspect-video rounded-lg mb-12" />

        {/* Content lines */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <div className="py-2" />
          <Skeleton className="h-7 w-64" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </section>
  );
}
