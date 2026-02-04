import { MobileNav } from "./mobile-nav";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border lg:hidden">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold font-poppins">Zand</div>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
