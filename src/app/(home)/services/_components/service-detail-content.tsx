"use client";

import { motion } from "motion/react";
import Link from "next/link";

interface ServiceDetailContentProps {
  label?: string;
  title: string;
  description: string;
  backLink?: string;
  backLabel?: string;
  offerings: string[];
  whyChooseUs?: {
    paragraph1: string;
    paragraph2: string;
  };
  technologies?: string[];
  industries?: string[];
}

export function ServiceDetailContent({
  label = "Service",
  title,
  description,
  backLink = "/services",
  backLabel = "Back to Services",
  offerings,
  whyChooseUs,
  technologies,
  industries,
}: ServiceDetailContentProps) {
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
            href={backLink}
            className="text-sm text-muted-foreground hover:text-primary transition-colors mb-4 inline-block"
          >
            ← {backLabel}
          </Link>
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
            {label}
          </p>
          <h1 className="text-4xl lg:text-6xl font-bold font-poppins tracking-tight mb-6">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-2xl font-semibold mb-6">What We Offer</h2>
            <div className="space-y-6">
              {offerings.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + 0.1 * index, duration: 0.4 }}
                  className="flex items-start gap-4"
                >
                  <span className="text-primary font-bold">0{index + 1}</span>
                  <p className="text-muted-foreground">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {whyChooseUs && (
              <>
                <h2 className="text-2xl font-semibold mb-6">Why Choose Us</h2>
                <p className="text-muted-foreground mb-6">
                  {whyChooseUs.paragraph1}
                </p>
                <p className="text-muted-foreground">
                  {whyChooseUs.paragraph2}
                </p>
              </>
            )}

            {technologies && (
              <>
                <h2 className="text-2xl font-semibold mb-6">Technologies</h2>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + 0.05 * index, duration: 0.3 }}
                      className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </>
            )}

            {industries && (
              <>
                <h2 className="text-2xl font-semibold mb-6">Perfect For</h2>
                <div className="flex flex-wrap gap-2">
                  {industries.map((industry, index) => (
                    <motion.span
                      key={industry}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + 0.05 * index, duration: 0.3 }}
                      className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground"
                    >
                      {industry}
                    </motion.span>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-16 lg:mt-24 pt-16 border-t border-border"
        >
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            Get in touch to learn more →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
