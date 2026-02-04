"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

const services = [
  {
    number: "01",
    title: "Lorem Ipsum",
    description:
      "Consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.",
    size: "large",
  },
  {
    number: "02",
    title: "Dolor Amet",
    description: "Ut enim ad minim veniam quis nostrud exercitation ullamco.",
    size: "small",
  },
  {
    number: "03",
    title: "Sit Consectetur",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit.",
    size: "small",
  },
  {
    number: "04",
    title: "Adipiscing Elit",
    description:
      "Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia.",
    size: "large",
  },
];

export function ServicesPreview() {
  return (
    <section id="services" className="py-32 lg:py-48 bg-muted">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16"
        >
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-4 tracking-widest uppercase">
              Services
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight max-w-xl">
              Dolor sit amet consectetur
            </h2>
          </div>
          <Button asChild variant="outline" className="w-fit">
            <Link href="/services">
              View all services
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className={
                service.size === "large" ? "md:col-span-1 md:row-span-2" : ""
              }
            >
              <Link href="#" className="group block h-full">
                <div
                  className={`h-full p-8 lg:p-10 bg-card border border-border rounded-2xl transition-colors hover:border-primary/50 ${
                    service.size === "large"
                      ? "min-h-[320px] lg:min-h-[400px]"
                      : "min-h-[180px]"
                  } flex flex-col justify-between`}
                >
                  <div>
                    <span className="text-xs font-medium text-muted-foreground tracking-widest">
                      {service.number}
                    </span>
                    <h3 className="text-2xl lg:text-3xl font-semibold text-card-foreground mt-4 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mt-6">
                    {service.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
