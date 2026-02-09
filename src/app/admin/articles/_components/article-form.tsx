"use client";

import { LoadingButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateSlug } from "@/lib/schemas/article";
import { useActionState, useState } from "react";
import { createArticle, updateArticle } from "../actions";
import { ImageUpload } from "./image-upload";

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
  const [coverImage, setCoverImage] = useState(article?.coverImage || "");

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
      {/* Details Card */}
      <div className="bg-background rounded-xl border border-border shadow-sm p-6">
        <h2 className="text-sm font-semibold mb-4">Details</h2>
        <div className="space-y-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
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
                <p className="text-sm text-destructive">
                  {state.errors.title}
                </p>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
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
                <p className="text-sm text-destructive">
                  {state.errors.category}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Input
                id="excerpt"
                name="excerpt"
                defaultValue={article?.excerpt || ""}
                placeholder="Brief description of the article"
                disabled={isPending}
              />
              {state?.errors?.excerpt && (
                <p className="text-sm text-destructive">
                  {state.errors.excerpt}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cover Image Card */}
      <div className="bg-background rounded-xl border border-border shadow-sm p-6">
        <h2 className="text-sm font-semibold mb-4">Cover Image</h2>
        <ImageUpload
          value={coverImage}
          onChange={setCoverImage}
          disabled={isPending}
        />
        <input type="hidden" name="coverImage" value={coverImage} />
        {state?.errors?.coverImage && (
          <p className="text-sm text-destructive mt-2">
            {state.errors.coverImage}
          </p>
        )}
      </div>

      {/* Content Card */}
      <div className="bg-background rounded-xl border border-border shadow-sm p-6">
        <h2 className="text-sm font-semibold mb-4">
          Content{" "}
          <span className="text-xs font-normal text-muted-foreground">
            (Markdown supported)
          </span>
        </h2>
        <Textarea
          id="content"
          name="content"
          defaultValue={article?.content || ""}
          placeholder="Write your article content here..."
          rows={24}
          className="font-mono text-sm resize-y"
          disabled={isPending}
        />
        {state?.errors?.content && (
          <p className="text-sm text-destructive mt-2">
            {state.errors.content}
          </p>
        )}
      </div>

      {/* Publish + Submit */}
      <div className="bg-background rounded-xl border border-border shadow-sm p-6 flex items-center justify-between">
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            id="published"
            name="published"
            defaultChecked={article?.published || false}
            disabled={isPending}
            className="w-4 h-4 rounded border-border accent-primary"
          />
          <span className="text-sm font-medium">Publish this article</span>
        </label>

        <div className="flex items-center gap-3">
          {state?.message && !state.success && (
            <p className="text-sm text-destructive">{state.message}</p>
          )}
          <LoadingButton
            type="submit"
            isLoading={isPending}
            loadingText={isEditing ? "Saving..." : "Creating..."}
          >
            {isEditing ? "Save Changes" : "Create Article"}
          </LoadingButton>
        </div>
      </div>
    </form>
  );
}
