"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteArticle } from "../../actions";

interface DeleteArticleButtonProps {
  id: string;
}

export function DeleteArticleButton({ id }: DeleteArticleButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteArticle(id);
      if (result.success) {
        toast.success("Article deleted");
        router.push("/admin/articles");
      } else {
        toast.error(result.message);
      }
    });
  };

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2 bg-destructive/10 px-3 py-1.5 rounded-lg">
        <span className="text-xs font-medium text-destructive">Delete?</span>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          className="text-xs font-semibold text-destructive hover:underline disabled:opacity-50"
        >
          {isPending ? "Deleting..." : "Yes"}
        </button>
        <button
          type="button"
          onClick={() => setShowConfirm(false)}
          disabled={isPending}
          className="text-xs font-medium text-muted-foreground hover:underline disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setShowConfirm(true)}
      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-destructive transition-colors"
    >
      <Trash2 className="w-3.5 h-3.5" />
      Delete
    </button>
  );
}
