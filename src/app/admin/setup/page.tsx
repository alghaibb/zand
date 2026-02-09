import { prisma } from "@/lib/db";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { SetupForm } from "./_components/setup-form";

export const metadata: Metadata = {
  title: "Admin Setup",
  robots: { index: false, follow: false },
};

interface SetupPageProps {
  searchParams: Promise<{ secret?: string }>;
}

export default async function SetupPage({ searchParams }: SetupPageProps) {
  const { secret } = await searchParams;

  // Check if any admin exists - if so, setup is permanently locked
  const adminCount = await prisma.adminUser.count();
  if (adminCount > 0) {
    redirect("/admin/login");
  }

  // Verify setup secret
  const setupSecret = process.env.SETUP_SECRET;
  if (!setupSecret) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
        <div className="bg-background rounded-xl border border-border shadow-sm p-8 max-w-sm w-full text-center">
          <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-lg font-bold text-destructive">!</span>
          </div>
          <h1 className="text-lg font-bold font-poppins mb-2">
            Setup Not Configured
          </h1>
          <p className="text-sm text-muted-foreground">
            Set{" "}
            <code className="bg-muted px-1.5 py-0.5 rounded text-xs font-mono">
              SETUP_SECRET
            </code>{" "}
            in your environment variables.
          </p>
        </div>
      </div>
    );
  }

  if (secret !== setupSecret) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
        <div className="bg-background rounded-xl border border-border shadow-sm p-8 max-w-sm w-full text-center">
          <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-lg font-bold text-destructive">!</span>
          </div>
          <h1 className="text-lg font-bold font-poppins mb-2">
            Access Denied
          </h1>
          <p className="text-sm text-muted-foreground">
            Invalid or missing setup secret.
          </p>
        </div>
      </div>
    );
  }

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
              Admin Setup
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Create your first admin account
            </p>
          </div>
          <SetupForm secret={secret} />
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Zand Admin Panel
        </p>
      </div>
    </div>
  );
}
