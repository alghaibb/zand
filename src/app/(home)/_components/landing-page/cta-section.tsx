"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

export function CTASection() {
  return (
    <section className="py-32 lg:py-48 bg-background">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-sm font-medium text-muted-foreground mb-4 tracking-widest uppercase">
              Get in touch
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Lorem ipsum dolor sit amet
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              Ut enim ad minima veniam, quis nostrum exercitationem ullam
              corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
              consequatur.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="px-8 h-12 text-sm">
                <Link href="/contact-us">
                  Start a project
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>

              <Button
                asChild
                variant="ghost"
                size="lg"
                className="px-8 h-12 text-sm"
              >
                <Link href="mailto:hello@zand.dev">hello@zand.dev</Link>
              </Button>
            </div>

            <div className="pt-8 border-t border-border">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="text-foreground">hello@zand.dev</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Phone</p>
                  <p className="text-foreground">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
