import { prisma } from "@/lib/db";
import { Metadata } from "next";
import { redirect as redirectTo } from "next/navigation";
import { LoginForm } from "./_components/login-form";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

interface LoginPageProps {
  searchParams: Promise<{ redirect?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  // If no admins exist, redirect to setup
  const adminCount = await prisma.adminUser.count();
  if (adminCount === 0) {
    redirectTo("/admin/setup");
  }

  const { redirect } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-sm">
            <span className="text-lg font-bold text-primary-foreground">Z</span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-background rounded-xl border border-border shadow-sm p-8">
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold font-poppins tracking-tight">
              Welcome back
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Sign in to your admin account
            </p>
          </div>
          <LoginForm redirectTo={redirect} />
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Zand Admin Panel
        </p>
      </div>
    </div>
  );
}
