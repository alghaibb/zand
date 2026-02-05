"use client";

import { motion } from "motion/react";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  category: string | null;
  publishedAt: Date | null;
}

interface ArticlePageContentProps {
  articles: Article[];
}

export function ArticlePageContent({ articles }: ArticlePageContentProps) {
  return (
    <section className="py-32 lg:py-48 bg-background">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 lg:mb-24"
        >
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
        </motion.div>

        {articles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center py-16 border border-border rounded-lg"
          >
            <p className="text-muted-foreground">
              No articles published yet. Check back soon!
            </p>
          </motion.div>
        ) : (
          <div className="space-y-0">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Link
                  href={`/article/${article.slug}`}
                  className="group block border-t border-border py-8 lg:py-12 hover:bg-muted/30 transition-colors -mx-8 px-8 lg:-mx-16 lg:px-16"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8">
                    <span className="text-5xl font-bold text-muted-foreground/30 font-poppins">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        {article.category && (
                          <span className="text-xs uppercase tracking-wider text-primary">
                            {article.category}
                          </span>
                        )}
                        {article.publishedAt && (
                          <span className="text-xs text-muted-foreground">
                            {new Date(article.publishedAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl lg:text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h2>
                      {article.excerpt && (
                        <p className="text-muted-foreground">
                          {article.excerpt}
                        </p>
                      )}
                    </div>
                    <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block">
                      →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
