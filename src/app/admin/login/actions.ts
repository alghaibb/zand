"use server";

import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

interface LoginResult {
  success: boolean;
  message: string;
}

export async function loginAction(
  _prevState: LoginResult | null,
  formData: FormData
): Promise<LoginResult> {
  const password = formData.get("password")?.toString() || "";
  const redirectTo = formData.get("redirect")?.toString() || "/admin";

  if (!password) {
    return { success: false, message: "Password is required" };
  }

  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.error("ADMIN_PASSWORD environment variable is not set");
    return { success: false, message: "Server configuration error" };
  }

  if (password !== adminPassword) {
    return { success: false, message: "Invalid password" };
  }

  const session = await getSession();
  session.isLoggedIn = true;
  await session.save();

  redirect(redirectTo);
}
