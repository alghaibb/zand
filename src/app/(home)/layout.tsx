import { Suspense } from "react";
import { getSession } from "@/lib/session";
import { PWAInstallPrompt } from "@/components/pwa-install-prompt";
import { Footer } from "./_components/footer";
import { DesktopNav } from "./_components/header/desktop-nav";
import { Header } from "./_components/header/header";

async function AuthenticatedNav() {
  const session = await getSession();
  const isAdmin = !!session.isLoggedIn;

  return (
    <>
      <Header isAdmin={isAdmin} />
      <DesktopNav isAdmin={isAdmin} />
    </>
  );
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col w-full bg-background">
      <Suspense
        fallback={
          <>
            <Header />
            <DesktopNav />
          </>
        }
      >
        <AuthenticatedNav />
      </Suspense>
      <main className="pt-20 lg:pt-0 flex-1 w-full lg:pl-24">{children}</main>
      <Footer />
      <PWAInstallPrompt />
    </div>
  );
}
