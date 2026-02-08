import { getSession } from "@/lib/session";
import { AdminSidebar } from "./_components/admin-sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-background">
      {session.isLoggedIn ? (
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-8">{children}</main>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
