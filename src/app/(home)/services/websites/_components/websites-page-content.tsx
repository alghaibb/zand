"use client";

import { motion } from "motion/react";
import Link from "next/link";

const websiteServices = [
  {
    slug: "frontend-web-development",
    title: "Frontend Web Development",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
  },
  {
    slug: "backend-development",
    title: "Backend Development",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
  },
  {
    slug: "fullstack-web-development",
    title: "Fullstack Web Development",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    slug: "appointment-based-businesses",
    title: "Appointment Based Businesses",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
  },
];

export function WebsitesPageContent() {
  return (
    <section className="py-32 lg:py-48 bg-background">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 lg:mb-24"
        >
          <Link
            href="/services"
            className="text-sm text-muted-foreground hover:text-primary transition-colors mb-4 inline-block"
          >
            ← Back to Services
          </Link>
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
            Service Category
          </p>
          <h1 className="text-4xl lg:text-6xl font-bold font-poppins tracking-tight mb-6">
            Websites
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation.
          </p>
        </motion.div>

        <div className="space-y-6">
          {websiteServices.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <Link
                href={`/services/websites/${service.slug}`}
                className="group block border border-border rounded-lg p-8 hover:border-primary/50 hover:bg-muted/30 transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <span className="text-5xl font-bold text-muted-foreground/30 font-poppins shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <h2 className="text-xl lg:text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                  <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block text-2xl">
                    →
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
