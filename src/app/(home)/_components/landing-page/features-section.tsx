"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { features } from "./constants";

export function FeaturesSection() {
  return (
    <section id="about" className="py-32 lg:py-48 bg-background">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:sticky lg:top-32 lg:self-start"
          >
            <p className="text-sm font-medium text-muted-foreground mb-4 tracking-widest uppercase">
              What we do
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Lorem ipsum dolor sit amet consectetur
            </h2>
            <p className="text-lg text-muted-foreground mt-6 leading-relaxed">
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium.
            </p>
          </motion.div>

          <div className="space-y-0">
            {features.map((feature, index) => (
              <motion.div
                key={feature.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
              >
                <Link
                  href="#"
                  className="group block py-8 border-b border-border first:border-t"
                >
                  <div className="flex items-start gap-6">
                    <span className="text-sm font-medium text-muted-foreground">
                      {feature.number}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {feature.title}
                        </h3>
                        <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
