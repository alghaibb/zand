import { prisma } from "@/lib/db";
import { getAdminUsers } from "@/lib/queries";
import { getSession } from "@/lib/session";
import { ShieldAlert } from "lucide-react";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminUsersList } from "./_components/admin-users-list";
import { InviteAdminForm } from "./_components/invite-admin-form";

export const metadata: Metadata = {
  title: "Settings - Zand Admin",
};

export default async function SettingsPage() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/admin/login");
  }

  // Resolve role from DB if session is missing it (e.g. logged in before roles existed)
  let role = session.role;
  if (!role && session.userId) {
    const admin = await prisma.adminUser.findUnique({
      where: { id: session.userId },
      select: { role: true },
    });
    role = admin?.role;
  }

  const isSuperAdmin = role === "SUPER_ADMIN";
  const admins = isSuperAdmin ? await getAdminUsers() : [];

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-poppins tracking-tight">
          Settings
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your admin users and preferences.
        </p>
      </div>

      {isSuperAdmin ? (
        <div className="max-w-2xl space-y-6">
          {/* Admin Users Card */}
          <div className="bg-background rounded-xl border border-border shadow-sm">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-sm font-semibold">Admin Users</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Manage accounts that can access the admin dashboard.
              </p>
            </div>
            <div className="p-6">
              <AdminUsersList
                admins={admins}
                currentUserId={session.userId}
              />
            </div>
          </div>

          {/* Add New Admin Card */}
          <div className="bg-background rounded-xl border border-border shadow-sm">
            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-sm font-semibold">Add New Admin</h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Create a new admin account.
              </p>
            </div>
            <div className="p-6">
              <InviteAdminForm />
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl">
          <div className="bg-background rounded-xl border border-border shadow-sm p-12 text-center">
            <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center mx-auto mb-4">
              <ShieldAlert className="w-7 h-7 text-muted-foreground" />
            </div>
            <h3 className="text-sm font-semibold mb-1">Restricted Access</h3>
            <p className="text-sm text-muted-foreground">
              Only super admins can manage admin accounts and settings.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
