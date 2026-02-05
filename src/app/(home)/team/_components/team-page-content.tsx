"use client";

import { motion } from "motion/react";

const teamMembers = [
  { name: "Lorem Ipsum", role: "Founder & CEO" },
  { name: "Dolor Sit", role: "Creative Director" },
  { name: "Amet Consectetur", role: "Lead Developer" },
  { name: "Adipiscing Elit", role: "Marketing Lead" },
  { name: "Sed Eiusmod", role: "Project Manager" },
  { name: "Tempor Incididunt", role: "Designer" },
];

export function TeamPageContent() {
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
            Our Team
          </p>
          <h1 className="text-4xl lg:text-6xl font-bold font-poppins tracking-tight mb-6">
            The people behind Zand
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="group border border-border rounded-lg p-8 hover:border-primary/50 transition-colors"
            >
              <div className="w-24 h-24 bg-muted rounded-full mb-6" />
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-muted-foreground mb-4">{member.role}</p>
              <p className="text-sm text-muted-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim
                ad minim veniam.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
