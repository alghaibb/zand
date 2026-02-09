"use client";

import { LoadingButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { createFirstAdmin } from "../actions";

interface SetupFormProps {
  secret: string;
}

export function SetupForm({ secret }: SetupFormProps) {
  const [state, formAction, isPending] = useActionState(
    createFirstAdmin,
    null
  );

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="secret" value={secret} />

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Your name"
          disabled={isPending}
          required
          autoFocus
        />
        {state?.errors?.name && (
          <p className="text-sm text-destructive">{state.errors.name}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
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

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
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

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          disabled={isPending}
          required
        />
        {state?.errors?.confirmPassword && (
          <p className="text-sm text-destructive">
            {state.errors.confirmPassword}
          </p>
        )}
      </div>

      {state?.message && !state.success && !state.errors && (
        <div className="bg-destructive/10 text-destructive text-sm rounded-lg px-3 py-2.5 font-medium">
          {state.message}
        </div>
      )}

      <LoadingButton
        type="submit"
        className="w-full"
        isLoading={isPending}
        loadingText="Creating account..."
      >
        Create Admin Account
      </LoadingButton>
    </form>
  );
}
