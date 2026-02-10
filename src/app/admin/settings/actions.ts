"use server";

import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import {
  changePasswordSchema,
  createAdminSchema,
  editAdminSchema,
} from "@/lib/schemas/admin";
import { getSession } from "@/lib/session";
import { updateTag } from "next/cache";

interface ActionResult {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

// ─── Helper: require super admin ────────────────────────────────────────────

async function requireSuperAdmin(): Promise<ActionResult | null> {
  const session = await getSession();
  if (!session.isLoggedIn) {
    return { success: false, message: "Unauthorized" };
  }
  if (session.role !== "SUPER_ADMIN") {
    return {
      success: false,
      message: "Only super admins can perform this action",
    };
  }
  return null;
}

// ─── Helper: format Zod errors ──────────────────────────────────────────────

function formatZodErrors(
  issues: { path: PropertyKey[]; message: string }[]
): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const issue of issues) {
    const field = String(issue.path[0]);
    if (!errors[field]) {
      errors[field] = issue.message;
    }
  }
  return errors;
}

// ─── Create Admin ───────────────────────────────────────────────────────────

export async function createAdminAction(
  _prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  const denied = await requireSuperAdmin();
  if (denied) return denied;

  const raw = {
    name: formData.get("name")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
    role: formData.get("role")?.toString() || "ADMIN",
  };

  const parsed = createAdminSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below",
      errors: formatZodErrors(parsed.error.issues),
    };
  }

  const { name, email, password, role } = parsed.data;

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
      data: { email, name, passwordHash, role },
    });

    updateTag("admin-users");
    return { success: true, message: "Admin user created successfully" };
  } catch (error) {
    console.error("Create admin error:", error);
    return { success: false, message: "Failed to create admin user" };
  }
}

// ─── Edit Admin ─────────────────────────────────────────────────────────────

export async function editAdminAction(
  adminId: string,
  data: { name: string; email: string; role: string }
): Promise<ActionResult> {
  const denied = await requireSuperAdmin();
  if (denied) return denied;

  const parsed = editAdminSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below",
      errors: formatZodErrors(parsed.error.issues),
    };
  }

  const { name, email, role } = parsed.data;

  const session = await getSession();
  const target = await prisma.adminUser.findUnique({
    where: { id: adminId },
    select: { role: true },
  });

  // Prevent editing another super admin (can only edit self or regular admins)
  if (target?.role === "SUPER_ADMIN" && session.userId !== adminId) {
    return {
      success: false,
      message: "You cannot modify another super admin's account",
    };
  }

  // Prevent demoting the last super admin
  if (role === "ADMIN" && target?.role === "SUPER_ADMIN") {
    const superAdminCount = await prisma.adminUser.count({
      where: { role: "SUPER_ADMIN" },
    });
    if (superAdminCount <= 1) {
      return {
        success: false,
        message: "Cannot demote the last super admin",
      };
    }
  }

  try {
    // Check email uniqueness (excluding current admin)
    const existing = await prisma.adminUser.findUnique({
      where: { email },
    });
    if (existing && existing.id !== adminId) {
      return {
        success: false,
        message: "An admin with this email already exists",
      };
    }

    await prisma.adminUser.update({
      where: { id: adminId },
      data: { name, email, role },
    });

    // Update session if editing self
    if (session.userId === adminId) {
      session.name = name;
      session.email = email;
      session.role = role;
      await session.save();
    }

    updateTag("admin-users");
    return { success: true, message: "Admin user updated successfully" };
  } catch (error) {
    console.error("Edit admin error:", error);
    return { success: false, message: "Failed to update admin user" };
  }
}

// ─── Change Password ────────────────────────────────────────────────────────

export async function changePasswordAction(
  adminId: string,
  data: { password: string; confirmPassword: string }
): Promise<ActionResult> {
  const denied = await requireSuperAdmin();
  if (denied) return denied;

  // Prevent changing another super admin's password
  const session = await getSession();
  if (session.userId !== adminId) {
    const target = await prisma.adminUser.findUnique({
      where: { id: adminId },
      select: { role: true },
    });
    if (target?.role === "SUPER_ADMIN") {
      return {
        success: false,
        message: "You cannot change another super admin's password",
      };
    }
  }

  const parsed = changePasswordSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message || "Invalid input",
    };
  }

  try {
    const passwordHash = await hashPassword(parsed.data.password);
    await prisma.adminUser.update({
      where: { id: adminId },
      data: { passwordHash },
    });

    return { success: true, message: "Password changed successfully" };
  } catch (error) {
    console.error("Change password error:", error);
    return { success: false, message: "Failed to change password" };
  }
}

// ─── Delete Admin ───────────────────────────────────────────────────────────

export async function deleteAdminAction(
  adminId: string
): Promise<ActionResult> {
  const denied = await requireSuperAdmin();
  if (denied) return denied;

  if (!adminId || typeof adminId !== "string") {
    return { success: false, message: "Invalid admin ID" };
  }

  const session = await getSession();

  // Prevent deleting yourself
  if (session.userId === adminId) {
    return { success: false, message: "You cannot delete your own account" };
  }

  // Prevent deleting another super admin
  const target = await prisma.adminUser.findUnique({
    where: { id: adminId },
    select: { role: true },
  });
  if (target?.role === "SUPER_ADMIN") {
    return {
      success: false,
      message: "You cannot delete another super admin",
    };
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
