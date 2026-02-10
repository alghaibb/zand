"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/ui/button";
import { changePasswordSchema } from "@/lib/schemas/admin";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { changePasswordAction } from "../actions";

interface AdminUser {
  id: string;
  name: string;
}

interface ChangePasswordDialogProps {
  admin: AdminUser | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChangePasswordDialog({
  admin,
  open,
  onOpenChange,
}: ChangePasswordDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleOpenChange(isOpen: boolean) {
    if (!isOpen) {
      setPassword("");
      setConfirmPassword("");
      setErrors({});
    }
    onOpenChange(isOpen);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!admin) return;

    // Client-side validation
    const parsed = changePasswordSchema.safeParse({ password, confirmPassword });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const field = String(issue.path[0]);
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    startTransition(async () => {
      const result = await changePasswordAction(admin.id, {
        password: parsed.data.password,
        confirmPassword: parsed.data.confirmPassword,
      });
      if (result.success) {
        toast.success(result.message);
        handleOpenChange(false);
      } else {
        setErrors({ _form: result.message });
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Set a new password for {admin?.name ?? "this admin"}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input
              id="new-password"
              type="password"
              placeholder="Min 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isPending}
              required
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-new-password">Confirm Password</Label>
            <Input
              id="confirm-new-password"
              type="password"
              placeholder="Repeat password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isPending}
              required
            />
            {errors.confirmPassword && (
              <p className="text-sm text-destructive">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {errors._form && (
            <p className="text-sm text-destructive">{errors._form}</p>
          )}

          <DialogFooter>
            <button
              type="button"
              onClick={() => handleOpenChange(false)}
              className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
              disabled={isPending}
            >
              Cancel
            </button>
            <LoadingButton
              type="submit"
              isLoading={isPending}
              loadingText="Changing..."
            >
              Change Password
            </LoadingButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
