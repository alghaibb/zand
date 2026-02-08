"use client";

import { LoadingButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateSlug } from "@/lib/schemas/article";
import { useActionState, useState } from "react";
import { createArticle, updateArticle } from "../actions";

interface ArticleData {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  category: string | null;
  published: boolean;
}

interface ArticleFormProps {
  article?: ArticleData;
}

export function ArticleForm({ article }: ArticleFormProps) {
  const isEditing = !!article;

  const boundUpdateArticle = article
    ? updateArticle.bind(null, article.id)
    : undefined;

  const [state, formAction, isPending] = useActionState(
    isEditing ? boundUpdateArticle! : createArticle,
    null
  );

  const [title, setTitle] = useState(article?.title || "");
  const [slug, setSlug] = useState(article?.slug || "");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!slugManuallyEdited) {
      setSlug(generateSlug(newTitle));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlug(e.target.value);
    setSlugManuallyEdited(true);
  };

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Article title"
            disabled={isPending}
          />
          {state?.errors?.title && (
            <p className="text-sm text-destructive">{state.errors.title}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">Slug *</Label>
          <Input
            id="slug"
            name="slug"
            value={slug}
            onChange={handleSlugChange}
            placeholder="article-slug"
            disabled={isPending}
          />
          {state?.errors?.slug && (
            <p className="text-sm text-destructive">{state.errors.slug}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            defaultValue={article?.category || ""}
            placeholder="e.g. Development, Marketing"
            disabled={isPending}
          />
          {state?.errors?.category && (
            <p className="text-sm text-destructive">{state.errors.category}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="coverImage">Cover Image URL</Label>
          <Input
            id="coverImage"
            name="coverImage"
            defaultValue={article?.coverImage || ""}
            placeholder="https://example.com/image.jpg"
            disabled={isPending}
          />
          {state?.errors?.coverImage && (
            <p className="text-sm text-destructive">
              {state.errors.coverImage}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          name="excerpt"
          defaultValue={article?.excerpt || ""}
          placeholder="Brief description of the article"
          rows={2}
          disabled={isPending}
        />
        {state?.errors?.excerpt && (
          <p className="text-sm text-destructive">{state.errors.excerpt}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content * (Markdown supported)</Label>
        <Textarea
          id="content"
          name="content"
          defaultValue={article?.content || ""}
          placeholder="Write your article content here..."
          rows={20}
          className="font-mono text-sm"
          disabled={isPending}
        />
        {state?.errors?.content && (
          <p className="text-sm text-destructive">{state.errors.content}</p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="published"
          name="published"
          defaultChecked={article?.published || false}
          disabled={isPending}
          className="w-4 h-4 rounded border-border"
        />
        <Label htmlFor="published" className="cursor-pointer">
          Published
        </Label>
      </div>

      {state?.message && !state.success && (
        <p className="text-sm text-destructive">{state.message}</p>
      )}

      <div className="flex items-center gap-4">
        <LoadingButton
          type="submit"
          isLoading={isPending}
          loadingText={isEditing ? "Saving..." : "Creating..."}
        >
          {isEditing ? "Save Changes" : "Create Article"}
        </LoadingButton>
      </div>
    </form>
  );
}
