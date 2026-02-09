"use server";

import { prisma } from "@/lib/db";
import { verifyPassword } from "@/lib/password";
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
  const email = formData.get("email")?.toString().trim().toLowerCase() || "";
  const password = formData.get("password")?.toString() || "";
  const redirectTo = formData.get("redirect")?.toString() || "/admin";

  if (!email || !password) {
    return { success: false, message: "Email and password are required" };
  }

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
    await session.save();
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: "An error occurred during login" };
  }

  redirect(redirectTo);
}
