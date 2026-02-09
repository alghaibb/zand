"use client";

import { cn } from "@/lib/utils";
import {
  ExternalLink,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { logoutAction } from "../actions";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/articles", label: "Articles", icon: FileText },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

interface AdminMobileHeaderProps {
  userName?: string;
  userEmail?: string;
}

export function AdminMobileHeader({
  userName,
  userEmail,
}: AdminMobileHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const initials = userName
    ? userName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "A";

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between h-14 px-4 border-b border-border bg-background lg:hidden">
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
          <span className="text-xs font-bold text-primary-foreground">Z</span>
        </div>
        <span className="font-poppins font-semibold text-base tracking-tight">
          Zand
        </span>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            className="p-2 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <SheetHeader className="px-6 h-14 border-b border-border flex items-center justify-start">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground">
                  Z
                </span>
              </div>
              <SheetTitle className="font-poppins font-semibold text-base tracking-tight">
                Zand Admin
              </SheetTitle>
            </div>
          </SheetHeader>

          <nav className="flex-1 px-3 py-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 border-t border-border">
            <div className="p-3 space-y-1">
              <Link
                href="/"
                target="_blank"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-150"
              >
                <ExternalLink className="w-4 h-4" />
                View Site
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-all duration-150 w-full"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </form>
            </div>

            {(userName || userEmail) && (
              <div className="px-3 pb-4 pt-2 border-t border-border">
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-xs font-semibold text-primary">
                      {initials}
                    </span>
                  </div>
                  <div className="min-w-0">
                    {userName && (
                      <p className="text-sm font-medium truncate leading-tight">
                        {userName}
                      </p>
                    )}
                    {userEmail && (
                      <p className="text-xs text-muted-foreground truncate leading-tight mt-0.5">
                        {userEmail}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
