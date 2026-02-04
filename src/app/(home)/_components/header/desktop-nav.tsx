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
  const [isExpanded, setIsExpanded] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [websitesOpen, setWebsitesOpen] = useState(false);

  const services = NAV_ITEMS.find((i) => i.id === "services");
  const servicesChildren = services?.children ?? [];
  const websites = servicesChildren.find((i) => i.id === "websites");
  const websiteChildren = websites?.children ?? [];

  return (
    <div
      className="hidden lg:block fixed left-6 top-1/2 -translate-y-1/2 z-40"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="mb-4 text-center">
        <div className="text-2xl font-bold font-poppins text-sidebar-foreground">
          Zand
        </div>
      </div>

      <nav
        className={cn(
          "bg-sidebar border border-sidebar-border rounded-lg p-2 shadow-lg overflow-hidden will-change-[width] transition-[width] duration-200 ease-out",
          isExpanded ? "w-52" : "w-16"
        )}
      >
        <div className="space-y-1">
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
                    // Keep the row size consistent to avoid jank while width animates.
                    "w-full h-12 px-3 justify-start gap-3 rounded-md",
                    !isExpanded && "justify-center px-0 gap-0",
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    activeItem === item.id && "hover:bg-sidebar-accent"
                  ),
                })
              )}
              onClick={() => setActiveItem(item.id)}
              title={!isExpanded ? item.label : undefined}
            >
              <div className="flex items-center justify-center w-5 h-5">
                <NavIcon iconKey={item.iconKey} />
              </div>
              <span
                className={cn(
                  "font-medium leading-tight text-sm text-left wrap-break-word line-clamp-2 transition-[opacity,transform,max-width] duration-200 ease-out max-w-44",
                  isExpanded
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2 max-w-0 overflow-hidden"
                )}
              >
                {item.label}
              </span>
            </Link>
          ))}

          {services && (
            <div className="pt-1">
              <button
                type="button"
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    className: cn(
                      "w-full h-12 px-3 justify-start gap-3 rounded-md",
                      !isExpanded && "justify-center px-0 gap-0",
                      "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    ),
                  }),
                  "text-sidebar-foreground"
                )}
                onClick={() => {
                  if (!isExpanded) return;
                  setServicesOpen((v) => !v);
                }}
                title={!isExpanded ? services.label : undefined}
              >
                <div className="flex items-center justify-center w-5 h-5">
                  <NavIcon iconKey={services.iconKey} />
                </div>
                <span
                  className={cn(
                    "font-medium whitespace-nowrap transition-[opacity,transform,max-width] duration-200 ease-out max-w-40",
                    isExpanded
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-2 max-w-0 overflow-hidden"
                  )}
                >
                  {services.label}
                </span>
              </button>

              {isExpanded && servicesOpen && (
                <div className="mt-1 pl-1 space-y-1">
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
                        onClick={() => setActiveItem(child.id)}
                      >
                        <div className="flex items-center justify-center w-5 h-5 text-muted-foreground">
                          <NavIcon iconKey={child.iconKey} />
                        </div>
                        <span className="text-sm leading-tight text-left wrap-break-word line-clamp-2 max-w-40">
                          {child.label}
                        </span>
                      </Link>
                    ))}

                  {websites && (
                    <div>
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
                        <div className="flex items-center justify-center w-5 h-5 text-muted-foreground">
                          <NavIcon iconKey={websites.iconKey} />
                        </div>
                        <span className="text-sm leading-tight text-left wrap-break-wordword line-clammax-w-40rem]">
                          {websites.label}
                        </span>
                      </button>

                      {websitesOpen && (
                        <div className="mt-1 pl-6 space-y-1">
                          {websiteChildren.map((leaf) => (
                            <Link
                              key={leaf.id}
                              href={leaf.href ?? "/services/websites"}
                              className={cn(
                                buttonVariants({
                                  variant: "ghost",
                                  className: cn(
                                    "w-full h-9 px-3 justify-start rounded-md",
                                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                                    activeItem === leaf.id &&
                                      "bg-sidebar-accent text-sidebar-accent-foreground"
                                  ),
                                })
                              )}
                              onClick={() => setActiveItem(leaf.id)}
                            >
                              <span className="text-sm leading-tight text-left wrap-break-word line-clamp-2 max-w-40">
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
          )}
        </div>
      </nav>
    </div>
  );
}
