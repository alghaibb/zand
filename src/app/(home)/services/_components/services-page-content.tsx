"use client";

import { motion } from "motion/react";
import Link from "next/link";

const services = [
  {
    slug: "solutions-tool-implementation",
    title: "Solutions / Tool Implementation",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
  },
  {
    slug: "microsoft-implementation",
    title: "Microsoft Implementation",
    description:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
  },
  {
    slug: "lms",
    title: "LMS",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    slug: "enterprise-learning-resource-implementation",
    title: "Enterprise Learning Resource Implementation (ERP)",
    description:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
  },
  {
    slug: "api-integrations",
    title: "API Integrations",
    description:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    slug: "project-management",
    title: "Project Management",
    description:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur.",
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    description:
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit.",
  },
  {
    slug: "graphic-design",
    title: "Graphic Design",
    description:
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
  },
  {
    slug: "commercial-photography",
    title: "Commercial Photography",
    description:
      "Nam libero tempore cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod.",
  },
  {
    slug: "commercial-videography",
    title: "Commercial Videography",
    description:
      "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet.",
  },
  {
    slug: "websites",
    title: "Websites",
    description:
      "Itaque earum rerum hic tenetur a sapiente delectus ut aut reiciendis voluptatibus maiores alias.",
    hasChildren: true,
  },
];

export function ServicesPageContent() {
  return (
    <section className="py-32 lg:py-48 bg-background">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16 lg:mb-24"
        >
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
            What We Do
          </p>
          <h1 className="text-4xl lg:text-6xl font-bold font-poppins tracking-tight mb-6">
            Our Services
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index, duration: 0.5 }}
            >
              <Link
                href={`/services/${service.slug}`}
                className="group block border border-border rounded-lg p-8 hover:border-primary/50 hover:bg-muted/30 transition-all h-full"
              >
                <div className="flex items-start gap-6">
                  <span className="text-4xl font-bold text-muted-foreground/30 font-poppins shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                      {service.hasChildren && (
                        <span className="text-xs ml-2 text-muted-foreground">
                          (4 sub-services)
                        </span>
                      )}
                    </h2>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
