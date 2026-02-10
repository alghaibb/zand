import { z } from "zod";

// ─── Shared fields ──────────────────────────────────────────────────────────

const nameField = z
  .string()
  .min(1, "Name is required")
  .max(100, "Name must be less than 100 characters")
  .transform((v) => v.trim());

const emailField = z
  .string()
  .min(1, "Email is required")
  .email("Invalid email address")
  .max(255, "Email must be less than 255 characters")
  .transform((v) => v.trim().toLowerCase());

const passwordField = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password must be less than 128 characters");

const roleField = z.enum(["SUPER_ADMIN", "ADMIN"]).refine(
  (value) => ["SUPER_ADMIN", "ADMIN"].includes(value),
  { message: "Role must be Super Admin or Admin" }
);

// ─── Login ──────────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, "Password is required"),
});

export type LoginInput = z.infer<typeof loginSchema>;

// ─── Setup (first admin) ───────────────────────────────────────────────────

export const setupSchema = z
  .object({
    secret: z.string().min(1, "Setup secret is required"),
    name: nameField,
    email: emailField,
    password: passwordField,
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SetupInput = z.infer<typeof setupSchema>;

// ─── Create Admin ───────────────────────────────────────────────────────────

export const createAdminSchema = z.object({
  name: nameField,
  email: emailField,
  password: passwordField,
  role: roleField.default("ADMIN"),
});

export type CreateAdminInput = z.infer<typeof createAdminSchema>;

// ─── Edit Admin ─────────────────────────────────────────────────────────────

export const editAdminSchema = z.object({
  name: nameField,
  email: emailField,
  role: roleField,
});

export type EditAdminInput = z.infer<typeof editAdminSchema>;

// ─── Change Password ────────────────────────────────────────────────────────

export const changePasswordSchema = z
  .object({
    password: passwordField,
    confirmPassword: z.string().min(1, "Please confirm the password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
