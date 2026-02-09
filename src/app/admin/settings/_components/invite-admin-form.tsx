"use client";

import { LoadingButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { createAdminAction } from "../actions";

export function InviteAdminForm() {
  const [state, formAction, isPending] = useActionState(
    createAdminAction,
    null
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message);
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="invite-name">Name</Label>
          <Input
            id="invite-name"
            name="name"
            type="text"
            placeholder="Admin name"
            disabled={isPending}
            required
          />
          {state?.errors?.name && (
            <p className="text-sm text-destructive">{state.errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="invite-email">Email</Label>
          <Input
            id="invite-email"
            name="email"
            type="email"
            placeholder="admin@example.com"
            disabled={isPending}
            required
          />
          {state?.errors?.email && (
            <p className="text-sm text-destructive">{state.errors.email}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="invite-password">Password</Label>
        <Input
          id="invite-password"
          name="password"
          type="password"
          placeholder="Min 8 characters"
          disabled={isPending}
          required
        />
        {state?.errors?.password && (
          <p className="text-sm text-destructive">{state.errors.password}</p>
        )}
      </div>

      {state?.message && !state.success && !state.errors && (
        <p className="text-sm text-destructive">{state.message}</p>
      )}

      <LoadingButton
        type="submit"
        isLoading={isPending}
        loadingText="Creating..."
      >
        Add Admin
      </LoadingButton>
    </form>
  );
}
