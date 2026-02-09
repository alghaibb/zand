import { Skeleton } from "@/components/ui/skeleton";

export default function ArticleListLoading() {
  return (
    <section className="py-32 lg:py-48 bg-background">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        {/* Header - static */}
        <div className="mb-16 lg:mb-24">
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
            Articles
          </p>
          <h1 className="text-4xl lg:text-6xl font-bold font-poppins tracking-tight mb-6">
            Insights & Updates
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Explore our latest articles on web development, digital marketing,
            design, and business insights.
          </p>
        </div>

        {/* Article rows - skeleton */}
        <div className="space-y-0">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="border-t border-border py-8 lg:py-12 -mx-8 px-8 lg:-mx-16 lg:px-16"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                <Skeleton className="h-12 w-14" />
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                  <Skeleton className="h-6 w-72 lg:w-96" />
                  <Skeleton className="h-4 w-full max-w-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
