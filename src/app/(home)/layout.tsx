import { Footer } from "./_components/footer";
import { DesktopNav } from "./_components/header/desktop-nav";
import { Header } from "./_components/header/header";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col max-w-7xl mx-auto">
      <Header />
      <DesktopNav />
      <main className="pt-20 flex-1">{children}</main>
      <Footer />
    </div>
  );
}
