"use server";

import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import { getSession } from "@/lib/session";
import { updateTag } from "next/cache";

interface ActionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

export async function createAdminAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return { success: false, message: "Unauthorized" };
  }

  const name = formData.get("name")?.toString().trim() || "";
  const email = formData.get("email")?.toString().trim().toLowerCase() || "";
  const password = formData.get("password")?.toString() || "";

  const errors: Record<string, string> = {};
  if (!name) errors.name = "Name is required";
  if (!email) errors.email = "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Invalid email address";
  if (!password) errors.password = "Password is required";
  if (password.length < 8)
    errors.password = "Password must be at least 8 characters";

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "Please fix the errors below", errors };
  }

  try {
    const existing = await prisma.adminUser.findUnique({ where: { email } });
    if (existing) {
      return {
        success: false,
        message: "An admin with this email already exists",
      };
    }

    const passwordHash = await hashPassword(password);
    await prisma.adminUser.create({
      data: { email, name, passwordHash },
    });

    updateTag("admin-users");
    return { success: true, message: "Admin user created successfully" };
  } catch (error) {
    console.error("Create admin error:", error);
    return { success: false, message: "Failed to create admin user" };
  }
}

export async function deleteAdminAction(adminId: string): Promise<ActionResult> {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return { success: false, message: "Unauthorized" };
  }

  // Prevent deleting yourself
  if (session.userId === adminId) {
    return { success: false, message: "You cannot delete your own account" };
  }

  // Prevent deleting the last admin
  const adminCount = await prisma.adminUser.count();
  if (adminCount <= 1) {
    return { success: false, message: "Cannot delete the last admin user" };
  }

  try {
    await prisma.adminUser.delete({ where: { id: adminId } });
    updateTag("admin-users");
    return { success: true, message: "Admin user deleted" };
  } catch (error) {
    console.error("Delete admin error:", error);
    return { success: false, message: "Failed to delete admin user" };
  }
}
