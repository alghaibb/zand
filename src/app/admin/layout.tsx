import { getSession } from "@/lib/session";
import { AdminSidebar } from "./_components/admin-sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="min-h-screen bg-muted/40">
      {session.isLoggedIn ? (
        <div className="flex">
          <AdminSidebar userName={session.name} userEmail={session.email} />
          <main className="flex-1 min-h-screen">
            <div className="p-6 lg:p-10 max-w-7xl">{children}</div>
          </main>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
