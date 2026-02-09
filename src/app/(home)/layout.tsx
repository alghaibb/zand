import { getSession } from "@/lib/session";
import { Footer } from "./_components/footer";
import { DesktopNav } from "./_components/header/desktop-nav";
import { Header } from "./_components/header/header";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const isAdmin = !!session.isLoggedIn;

  return (
    <div className="min-h-screen flex flex-col w-full bg-background">
      <Header isAdmin={isAdmin} />
      <DesktopNav isAdmin={isAdmin} />
      <main className="pt-20 lg:pt-0 flex-1 w-full lg:pl-24">{children}</main>
      <Footer />
    </div>
  );
}
