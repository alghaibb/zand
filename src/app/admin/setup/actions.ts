"use server";

import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import { setupSchema } from "@/lib/schemas/admin";
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
  const raw = {
    secret: formData.get("secret")?.toString() || "",
    name: formData.get("name")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
    confirmPassword: formData.get("confirmPassword")?.toString() || "",
  };

  const parsed = setupSchema.safeParse(raw);

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

  const { secret, name, email, password } = parsed.data;

  // Verify setup secret
  if (secret !== process.env.SETUP_SECRET) {
    return { success: false, message: "Invalid setup secret" };
  }

  // Check if admin already exists
  const adminCount = await prisma.adminUser.count();
  if (adminCount > 0) {
    return { success: false, message: "An admin account already exists" };
  }

  try {
    const passwordHash = await hashPassword(password);

    const admin = await prisma.adminUser.create({
      data: { email, name, passwordHash, role: "SUPER_ADMIN" },
    });

    // Log the user in immediately
    const session = await getSession();
    session.isLoggedIn = true;
    session.userId = admin.id;
    session.email = admin.email;
    session.name = admin.name;
    session.role = admin.role;
    await session.save();
  } catch (error) {
    console.error("Setup error:", error);
    return { success: false, message: "Failed to create admin account" };
  }

  redirect("/admin");
}
