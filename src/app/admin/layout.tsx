import { Suspense } from "react";
import { getSession } from "@/lib/session";
import { AdminSidebar } from "./_components/admin-sidebar";

async function AdminShell({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session.isLoggedIn) {
    return <>{children}</>;
  }

  return (
    <div className="flex">
      <AdminSidebar userName={session.name} userEmail={session.email} />
      <main className="flex-1 min-h-screen">
        <div className="p-6 lg:p-10 max-w-7xl">{children}</div>
      </main>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-muted/40">
      <Suspense fallback={<div className="min-h-screen bg-muted/40" />}>
        <AdminShell>{children}</AdminShell>
      </Suspense>
    </div>
  );
}
