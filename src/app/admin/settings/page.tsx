import { getAdminUsers } from "@/lib/queries";
import { getSession } from "@/lib/session";
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

  const admins = await getAdminUsers();

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

      <div className="max-w-2xl space-y-6">
        {/* Admin Users Card */}
        <div className="bg-background rounded-xl border border-border shadow-sm">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-sm font-semibold">Admin Users</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              People who can access the admin dashboard.
            </p>
          </div>
          <div className="p-6">
            <AdminUsersList admins={admins} currentUserId={session.userId} />
          </div>
        </div>

        {/* Add New Admin Card */}
        <div className="bg-background rounded-xl border border-border shadow-sm">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-sm font-semibold">Add New Admin</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Create a new admin account with full access.
            </p>
          </div>
          <div className="p-6">
            <InviteAdminForm />
          </div>
        </div>
      </div>
    </div>
  );
}
