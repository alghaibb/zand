"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ChevronRight, Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_ITEMS, type NavItem } from "./constants";

function collectFirstLeafId(items: NavItem[]): string | undefined {
  for (const item of items) {
    if (item.href) return item.id;
    if (item.children) {
      const child = collectFirstLeafId(item.children);
      if (child) return child;
    }
  }
  return undefined;
}

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(
    collectFirstLeafId(NAV_ITEMS) ?? "home"
  );
  const [servicesOpen, setServicesOpen] = useState(false);
  const [websitesOpen, setWebsitesOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button
          className="lg:hidden p-2 rounded-md hover:bg-accent transition-colors"
          aria-label="Toggle mobile menu"
          suppressHydrationWarning
        >
          <Menu className="w-6 h-6" />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="p-0 bg-card w-80 max-w-[85vw]"
        suppressHydrationWarning
      >
        <SheetHeader className="p-6 border-b border-border">
          <SheetTitle className="text-xl font-bold">Zand</SheetTitle>
        </SheetHeader>

        <div className="flex-1 p-6 overflow-y-auto">
          <nav className="space-y-2">
            {NAV_ITEMS.filter((i) => i.id !== "services").map((item) => (
              <Link
                key={item.id}
                href={item.href ?? "/"}
                className={cn(
                  activeItem === item.id
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground",
                  buttonVariants({
                    variant: "ghost",
                    size: "default",
                    className:
                      "w-full justify-between px-3 py-2 hover:bg-accent text-left",
                  })
                )}
                onClick={() => {
                  setActiveItem(item.id);
                  setIsOpen(false);
                }}
              >
                <span className="font-medium leading-tight text-left wrap-break-word line-clamp-2 max-w-56">
                  {item.label}
                </span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </Link>
            ))}

            {(() => {
              const services = NAV_ITEMS.find((i) => i.id === "services");
              if (!services?.children?.length) return null;

              const websites = services.children.find(
                (c) => c.id === "websites"
              );
              const servicesChildren = services.children.filter(
                (c) => c.id !== "websites"
              );

              return (
                <div className="pt-2">
                  <button
                    type="button"
                    className={cn(
                      buttonVariants({
                        variant: "ghost",
                        size: "default",
                        className:
                          "w-full justify-between px-3 py-2 hover:bg-accent text-left",
                      })
                    )}
                    onClick={() => setServicesOpen((v) => !v)}
                  >
                    <span className="font-medium">Services</span>
                    <ChevronRight
                      className={cn(
                        "w-4 h-4 text-muted-foreground transition-transform duration-200",
                        servicesOpen && "rotate-90"
                      )}
                    />
                  </button>

                  {servicesOpen && (
                    <div className="mt-2 pl-3 space-y-2">
                      {servicesChildren.map((child) => (
                        <Link
                          key={child.id}
                          href={child.href ?? "/services"}
                          className={cn(
                            buttonVariants({
                              variant: "ghost",
                              size: "sm",
                              className:
                                "w-full justify-between px-3 py-2 hover:bg-accent text-left",
                            }),
                            activeItem === child.id &&
                              "bg-accent text-accent-foreground"
                          )}
                          onClick={() => {
                            setActiveItem(child.id);
                            setIsOpen(false);
                          }}
                        >
                          <span className="text-sm font-medium leading-tight text-left wrap-break-word line-clamp-2 max-w-52">
                            {child.label}
                          </span>
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </Link>
                      ))}

                      {websites?.children?.length && (
                        <div>
                          <button
                            type="button"
                            className={cn(
                              buttonVariants({
                                variant: "ghost",
                                size: "sm",
                                className:
                                  "w-full justify-between px-3 py-2 hover:bg-accent text-left",
                              })
                            )}
                            onClick={() => setWebsitesOpen((v) => !v)}
                          >
                            <span className="text-sm font-medium">
                              {websites.label}
                            </span>
                            <ChevronRight
                              className={cn(
                                "w-4 h-4 text-muted-foreground transition-transform duration-200",
                                websitesOpen && "rotate-90"
                              )}
                            />
                          </button>

                          {websitesOpen && (
                            <div className="mt-2 pl-3 space-y-2">
                              {websites.children.map((leaf) => (
                                <Link
                                  key={leaf.id}
                                  href={leaf.href ?? "/services/websites"}
                                  className={cn(
                                    buttonVariants({
                                      variant: "ghost",
                                      size: "sm",
                                      className:
                                        "w-full justify-between px-3 py-2 hover:bg-accent text-left",
                                    }),
                                    activeItem === leaf.id &&
                                      "bg-accent text-accent-foreground"
                                  )}
                                  onClick={() => {
                                    setActiveItem(leaf.id);
                                    setIsOpen(false);
                                  }}
                                >
                                  <span className="text-sm leading-tight text-left wrap-break-word line-clamp-2 max-w-48">
                                    {leaf.label}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })()}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
