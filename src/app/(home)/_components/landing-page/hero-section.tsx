"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const words = ["Websites", "Solutions", "Experiences", "Brands", "Ideas"];

function useTypewriter(
  words: string[],
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDuration = 2000
) {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      setDisplayText(currentWord.substring(0, displayText.length - 1));
    } else {
      setDisplayText(currentWord.substring(0, displayText.length + 1));
    }
  }, [words, wordIndex, isDeleting, displayText]);

  useEffect(() => {
    const currentWord = words[wordIndex];

    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && displayText === "") {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }, typingSpeed);
    } else {
      timeout = setTimeout(tick, isDeleting ? deletingSpeed : typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [
    displayText,
    isDeleting,
    wordIndex,
    words,
    tick,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
  ]);

  return displayText;
}

export function HeroSection() {
  const typedText = useTypewriter(words, 80, 40, 2000);

  return (
    <section className="relative min-h-screen flex flex-col justify-between bg-background py-20 lg:py-32">
      <div className="flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-sm font-medium text-muted-foreground mb-6 tracking-widest uppercase"
              >
                Digital Agency
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05] tracking-tight"
              >
                We build
                <span className="block text-primary mt-1">
                  {typedText}
                  <span className="inline-block w-[3px] h-[0.8em] bg-primary ml-1 animate-pulse" />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                className="text-lg text-muted-foreground mt-8 max-w-md leading-relaxed"
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                className="flex flex-wrap gap-4 mt-12"
              >
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
                  <Link href="#work">View our work</Link>
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              className="hidden lg:block"
            >
              <div className="aspect-square relative">
                <div className="absolute inset-0 border border-border rounded-3xl" />
                <div className="absolute inset-8 border border-border rounded-2xl" />
                <div className="absolute inset-16 border border-border rounded-xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-8xl font-bold text-muted-foreground/10">
                    Z
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="flex justify-center pb-8"
      >
        <Link
          href="#about"
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  );
}
