"use client";

import { Article } from "@/generated/prisma";
import { motion } from "motion/react";
import Link from "next/link";

interface ArticleDetailContentProps {
  article: Article;
}

export function ArticleDetailContent({ article }: ArticleDetailContentProps) {
  return (
    <section className="py-32 lg:py-48 bg-background">
      <div className="max-w-4xl mx-auto px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Link
            href="/article"
            className="text-sm text-muted-foreground hover:text-primary transition-colors mb-8 inline-block"
          >
            ← Back to Articles
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              {article.category && (
                <span className="text-xs uppercase tracking-wider text-primary">
                  {article.category}
                </span>
              )}
              {article.publishedAt && (
                <span className="text-sm text-muted-foreground">
                  {new Date(article.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              )}
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold font-poppins tracking-tight mb-6">
              {article.title}
            </h1>
            {article.excerpt && (
              <p className="text-lg text-muted-foreground">{article.excerpt}</p>
            )}
          </div>

          {article.coverImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-12"
            >
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-full h-auto rounded-lg"
              />
            </motion.div>
          )}

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            {/* Simple rendering - you can add a markdown parser later */}
            <div className="whitespace-pre-wrap text-foreground leading-relaxed">
              {article.content}
            </div>
          </motion.article>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-16 pt-8 border-t border-border"
          >
            <Link
              href="/article"
              className="text-primary hover:underline inline-flex items-center gap-2"
            >
              ← Back to all articles
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
