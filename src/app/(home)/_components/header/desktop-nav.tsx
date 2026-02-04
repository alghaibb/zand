"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Aperture,
  BookOpenText,
  Briefcase,
  Code,
  Component,
  Contact,
  Cpu,
  Database,
  FileText,
  GraduationCap,
  Home,
  LayoutGrid,
  Megaphone,
  PenTool,
  PlaySquare,
  Users,
  Workflow,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { NAV_ITEMS, type IconKey, type NavItem } from "./constants";

const iconByKey: Record<
  IconKey,
  React.ComponentType<{ className?: string }>
> = {
  home: Home,
  team: Users,
  contact: Contact,
  article: FileText,
  services: Briefcase,
  tooling: Workflow,
  microsoft: LayoutGrid,
  lms: GraduationCap,
  erp: Database,
  api: Cpu,
  pm: Component,
  marketing: Megaphone,
  design: PenTool,
  photo: Aperture,
  video: PlaySquare,
  websites: BookOpenText,
  frontend: Code,
  backend: Database,
  fullstack: Component,
  appointments: BookOpenText,
};

function NavIcon({ iconKey }: { iconKey: IconKey }) {
  const Icon = iconByKey[iconKey];
  return <Icon className="w-5 h-5" />;
}

function flattenIds(items: NavItem[]): string[] {
  const ids: string[] = [];
  for (const item of items) {
    ids.push(item.id);
    if (item.children) ids.push(...flattenIds(item.children));
  }
  return ids;
}

export function DesktopNav() {
  const knownIds = flattenIds(NAV_ITEMS);
  const [activeItem, setActiveItem] = useState(knownIds[0] ?? "home");
  const [servicesOpen, setServicesOpen] = useState(false);
  const [websitesOpen, setWebsitesOpen] = useState(false);

  const services = NAV_ITEMS.find((i) => i.id === "services");
  const servicesChildren = services?.children ?? [];
  const websites = servicesChildren.find((i) => i.id === "websites");
  const websiteChildren = websites?.children ?? [];

  return (
    <div
      className="hidden lg:block fixed left-6 top-6 z-40"
      onMouseLeave={() => {
        setServicesOpen(false);
        setWebsitesOpen(false);
      }}
    >
      <nav
        className={cn(
          "bg-sidebar border border-sidebar-border rounded-full py-3 px-2 shadow-lg overflow-visible flex flex-col items-center gap-1 transition-all duration-300 ease-out"
        )}
      >
        <Link
          href="/"
          className="text-lg font-bold font-poppins text-sidebar-foreground py-2"
        >
          Z
        </Link>

        <div className="w-6 h-px bg-sidebar-border my-1" />

        <div className="flex flex-col items-center gap-1">
          {NAV_ITEMS.filter((i) => i.id !== "services").map((item) => (
            <Link
              key={item.id}
              href={item.href ?? "/"}
              className={cn(
                activeItem === item.id
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground",
                buttonVariants({
                  variant: "ghost",
                  className: cn(
                    "h-10 w-10 p-0 rounded-full flex items-center justify-center",
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    activeItem === item.id && "hover:bg-sidebar-accent"
                  ),
                })
              )}
              onClick={() => setActiveItem(item.id)}
              title={item.label}
            >
              <NavIcon iconKey={item.iconKey} />
            </Link>
          ))}

          {services && (
            <div className="relative">
              <button
                type="button"
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    className: cn(
                      "h-10 w-10 p-0 rounded-full flex items-center justify-center",
                      "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    ),
                  }),
                  servicesOpen
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground"
                )}
                onClick={() => setServicesOpen((v) => !v)}
                title={services.label}
              >
                <NavIcon iconKey={services.iconKey} />
              </button>

              {servicesOpen && (
                <div className="absolute top-0 left-full ml-2 w-64 bg-sidebar border border-sidebar-border rounded-lg shadow-lg p-2 max-h-[70vh] overflow-y-auto">
                  {servicesChildren
                    .filter((c) => c.id !== "websites")
                    .map((child) => (
                      <Link
                        key={child.id}
                        href={child.href ?? "/services"}
                        className={cn(
                          buttonVariants({
                            variant: "ghost",
                            className: cn(
                              "w-full h-10 px-3 justify-start gap-3 rounded-md",
                              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                              activeItem === child.id &&
                                "bg-sidebar-accent text-sidebar-accent-foreground"
                            ),
                          })
                        )}
                        onClick={() => {
                          setActiveItem(child.id);
                          setServicesOpen(false);
                        }}
                      >
                        <NavIcon iconKey={child.iconKey} />
                        <span className="text-sm truncate">{child.label}</span>
                      </Link>
                    ))}

                  {websites && (
                    <div className="border-t border-sidebar-border mt-2 pt-2">
                      <button
                        type="button"
                        className={cn(
                          buttonVariants({
                            variant: "ghost",
                            className: cn(
                              "w-full h-10 px-3 justify-start gap-3 rounded-md",
                              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            ),
                          }),
                          websitesOpen &&
                            "bg-sidebar-accent text-sidebar-accent-foreground"
                        )}
                        onClick={() => setWebsitesOpen((v) => !v)}
                      >
                        <NavIcon iconKey={websites.iconKey} />
                        <span className="text-sm">{websites.label}</span>
                      </button>

                      {websitesOpen && (
                        <div className="ml-4 mt-1 space-y-1">
                          {websiteChildren.map((leaf) => (
                            <Link
                              key={leaf.id}
                              href={leaf.href ?? "/services/websites"}
                              className={cn(
                                buttonVariants({
                                  variant: "ghost",
                                  className: cn(
                                    "w-full h-9 px-3 justify-start rounded-md text-sm",
                                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                                    activeItem === leaf.id &&
                                      "bg-sidebar-accent text-sidebar-accent-foreground"
                                  ),
                                })
                              )}
                              onClick={() => {
                                setActiveItem(leaf.id);
                                setServicesOpen(false);
                              }}
                            >
                              {leaf.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
