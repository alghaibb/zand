"use server";

import { prisma } from "@/lib/db";
import { verifyPassword } from "@/lib/password";
import { loginSchema } from "@/lib/schemas/admin";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

interface LoginResult {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

export async function loginAction(
  _prevState: LoginResult | null,
  formData: FormData
): Promise<LoginResult> {
  const raw = {
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };
  const redirectTo = formData.get("redirect")?.toString() || "/admin";

  const parsed = loginSchema.safeParse(raw);

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const field = String(issue.path[0]);
      if (!errors[field]) {
        errors[field] = issue.message;
      }
    }
    return { success: false, message: "Please fix the errors below", errors };
  }

  const { email, password } = parsed.data;

  try {
    const admin = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (!admin) {
      return { success: false, message: "Invalid email or password" };
    }

    const isValid = await verifyPassword(password, admin.passwordHash);

    if (!isValid) {
      return { success: false, message: "Invalid email or password" };
    }

    const session = await getSession();
    session.isLoggedIn = true;
    session.userId = admin.id;
    session.email = admin.email;
    session.name = admin.name;
    session.role = admin.role;
    await session.save();
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "An error occurred during login" };
  }

  redirect(redirectTo);
}
