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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { editAdminSchema } from "@/lib/schemas/admin";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { editAdminAction } from "../actions";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "SUPER_ADMIN" | "ADMIN";
}

interface EditAdminDialogProps {
  admin: AdminUser | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditAdminDialog({
  admin,
  open,
  onOpenChange,
}: EditAdminDialogProps) {
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"SUPER_ADMIN" | "ADMIN">("ADMIN");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [prevAdminId, setPrevAdminId] = useState<string | null>(null);

  // Sync form state when a different admin is selected (React recommended pattern)
  if (admin && admin.id !== prevAdminId) {
    setPrevAdminId(admin.id);
    setName(admin.name);
    setEmail(admin.email);
    setRole(admin.role);
    setErrors({});
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!admin) return;

    // Client-side validation
    const parsed = editAdminSchema.safeParse({ name, email, role });
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
      const result = await editAdminAction(admin.id, {
        name: parsed.data.name,
        email: parsed.data.email,
        role: parsed.data.role,
      });
      if (result.success) {
        toast.success(result.message);
        onOpenChange(false);
      } else if (result.errors) {
        setErrors(result.errors);
      } else {
        setErrors({ _form: result.message });
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Admin</DialogTitle>
          <DialogDescription>
            Update account details for this admin user.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Name</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isPending}
              required
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-email">Email</Label>
            <Input
              id="edit-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isPending}
              required
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Role</Label>
            <Select
              value={role}
              onValueChange={(v) =>
                setRole(v as "SUPER_ADMIN" | "ADMIN")
              }
              disabled={isPending}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-sm text-destructive">{errors.role}</p>
            )}
          </div>

          {errors._form && (
            <p className="text-sm text-destructive">{errors._form}</p>
          )}

          <DialogFooter>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-muted transition-colors"
              disabled={isPending}
            >
              Cancel
            </button>
            <LoadingButton
              type="submit"
              isLoading={isPending}
              loadingText="Saving..."
            >
              Save Changes
            </LoadingButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
