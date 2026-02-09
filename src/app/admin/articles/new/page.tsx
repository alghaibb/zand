import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ArticleForm } from "../_components/article-form";

export default function NewArticlePage() {
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
        <h1 className="text-2xl font-bold font-poppins tracking-tight mt-3">
          New Article
        </h1>
      </div>

      <div className="max-w-4xl">
        <ArticleForm />
      </div>
    </div>
  );
}
