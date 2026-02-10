"use client";

import { KeyRound, Pencil, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { deleteAdminAction } from "../actions";
import { EditAdminDialog } from "./edit-admin-dialog";
import { ChangePasswordDialog } from "./change-password-dialog";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN";
  createdAt: Date;
}

interface AdminUsersListProps {
  admins: AdminUser[];
  currentUserId?: string;
}

export function AdminUsersList({ admins, currentUserId }: AdminUsersListProps) {
  const [isPending, startTransition] = useTransition();
  const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null);
  const [changingPasswordFor, setChangingPasswordFor] =
    useState<AdminUser | null>(null);

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
    <>
      <div className="space-y-3">
        {admins.map((admin) => {
          const initials = admin.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);

          const isSelf = admin.id === currentUserId;
          const isOtherSuperAdmin =
            !isSelf && admin.role === "SUPER_ADMIN";
          // Can manage self or regular admins, but not other super admins
          const canManage = !isOtherSuperAdmin;

          return (
            <div
              key={admin.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-xs font-semibold text-primary">
                    {initials}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium leading-tight truncate">
                      {admin.name}
                    </p>
                    {isSelf && (
                      <span className="text-[10px] font-medium text-primary bg-primary/10 px-1.5 py-0.5 rounded-full shrink-0">
                        you
                      </span>
                    )}
                    <span
                      className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full shrink-0 ${
                        admin.role === "SUPER_ADMIN"
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                      }`}
                    >
                      {admin.role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-tight mt-0.5 truncate">
                    {admin.email}
                  </p>
                </div>
              </div>

              {canManage && (
                <div className="flex items-center gap-1 shrink-0 ml-2">
                  <button
                    onClick={() => setEditingAdmin(admin)}
                    disabled={isPending}
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all disabled:opacity-50"
                    title="Edit admin"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setChangingPasswordFor(admin)}
                    disabled={isPending}
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all disabled:opacity-50"
                    title="Change password"
                  >
                    <KeyRound className="w-3.5 h-3.5" />
                  </button>
                  {!isSelf && (
                    <button
                      onClick={() => handleDelete(admin.id, admin.name)}
                      disabled={isPending}
                      className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all disabled:opacity-50"
                      title="Delete admin"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <EditAdminDialog
        admin={editingAdmin}
        open={!!editingAdmin}
        onOpenChange={(isOpen: boolean) => !isOpen && setEditingAdmin(null)}
      />

      <ChangePasswordDialog
        admin={changingPasswordFor}
        open={!!changingPasswordFor}
        onOpenChange={(isOpen: boolean) => !isOpen && setChangingPasswordFor(null)}
      />
    </>
  );
}
