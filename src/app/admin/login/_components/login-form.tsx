"use client";

import { LoadingButton } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { loginAction } from "../actions";

interface LoginFormProps {
  redirectTo?: string;
}

export function LoginForm({ redirectTo }: LoginFormProps) {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="redirect" value={redirectTo || "/admin"} />

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="admin@example.com"
          disabled={isPending}
          required
          autoFocus
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
          placeholder="Enter your password"
          disabled={isPending}
          required
        />
        {state?.errors?.password && (
          <p className="text-sm text-destructive">{state.errors.password}</p>
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
        loadingText="Signing in..."
      >
        Sign In
      </LoadingButton>
    </form>
  );
}
