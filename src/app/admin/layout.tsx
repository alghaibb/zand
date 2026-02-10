import { Suspense } from "react";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/session";
import { AdminMobileHeader } from "./_components/admin-mobile-header";
import { AdminSidebar } from "./_components/admin-sidebar";

async function AdminShell({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session.isLoggedIn) {
    return <>{children}</>;
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

  return (
    <>
      <AdminMobileHeader userName={session.name} userEmail={session.email} userRole={role} />
      <div className="flex">
        <div className="hidden lg:block">
          <AdminSidebar userName={session.name} userEmail={session.email} userRole={role} />
        </div>
        <main className="flex-1 min-h-screen">
          <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </>
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
