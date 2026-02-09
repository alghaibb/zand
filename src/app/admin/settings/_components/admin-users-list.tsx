"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteAdminAction } from "../actions";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

interface AdminUsersListProps {
  admins: AdminUser[];
  currentUserId?: string;
}

export function AdminUsersList({ admins, currentUserId }: AdminUsersListProps) {
  const [isPending, startTransition] = useTransition();

  function handleDelete(adminId: string, adminName: string) {
    if (
      !confirm(
        `Are you sure you want to remove "${adminName}" as an admin? This cannot be undone.`
      )
    ) {
      return;
    }

    startTransition(async () => {
      const result = await deleteAdminAction(adminId);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <div className="space-y-3">
      {admins.map((admin) => {
        const initials = admin.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2);

        return (
          <div
            key={admin.id}
            className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <span className="text-xs font-semibold text-primary">
                  {initials}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium leading-tight">
                  {admin.name}
                  {admin.id === currentUserId && (
                    <span className="ml-2 text-[10px] font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                      you
                    </span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground leading-tight mt-0.5">
                  {admin.email}
                </p>
              </div>
            </div>

            {admin.id !== currentUserId && (
              <button
                onClick={() => handleDelete(admin.id, admin.name)}
                disabled={isPending}
                className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all disabled:opacity-50"
                title="Remove admin"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
