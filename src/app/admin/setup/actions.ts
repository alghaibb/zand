"use server";

import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

interface SetupResult {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

export async function createFirstAdmin(
  _prevState: SetupResult | null,
  formData: FormData
): Promise<SetupResult> {
  const secret = formData.get("secret")?.toString() || "";
  const name = formData.get("name")?.toString().trim() || "";
  const email = formData.get("email")?.toString().trim().toLowerCase() || "";
  const password = formData.get("password")?.toString() || "";
  const confirmPassword = formData.get("confirmPassword")?.toString() || "";

  // Verify setup secret
  if (secret !== process.env.SETUP_SECRET) {
    return { success: false, message: "Invalid setup secret" };
  }

  // Check if admin already exists
  const adminCount = await prisma.adminUser.count();
  if (adminCount > 0) {
    return { success: false, message: "An admin account already exists" };
  }

  // Validate fields
  const errors: Record<string, string> = {};
  if (!name) errors.name = "Name is required";
  if (!email) errors.email = "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Invalid email address";
  if (!password) errors.password = "Password is required";
  if (password.length < 8) errors.password = "Password must be at least 8 characters";
  if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match";

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Please fix the errors below", errors };
  }

  try {
    const passwordHash = await hashPassword(password);

    const admin = await prisma.adminUser.create({
      data: { email, name, passwordHash },
    });

    // Log the user in immediately
    const session = await getSession();
    session.isLoggedIn = true;
    session.userId = admin.id;
    session.email = admin.email;
    session.name = admin.name;
    await session.save();
  } catch (error) {
    console.error("Setup error:", error);
    return { success: false, message: "Failed to create admin account" };
  }

  redirect("/admin");
}
