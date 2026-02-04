import { Footer } from "./_components/footer";
import { DesktopNav } from "./_components/header/desktop-nav";
import { Header } from "./_components/header/header";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col w-full bg-background">
      <Header />
      <DesktopNav />
      <main className="pt-20 lg:pt-0 flex-1 w-full lg:pl-24">{children}</main>
      <Footer />
    </div>
  );
}
