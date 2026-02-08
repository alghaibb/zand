import Link from "next/link";
import { ArticleForm } from "../_components/article-form";

export default function NewArticlePage() {
  return (
    <div>
      <div className="mb-8">
        <Link
          href="/admin/articles"
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          ← Back to Articles
        </Link>
        <h1 className="text-3xl font-bold font-poppins mt-4">New Article</h1>
      </div>

      <div className="max-w-4xl">
        <ArticleForm />
      </div>
    </div>
  );
}
