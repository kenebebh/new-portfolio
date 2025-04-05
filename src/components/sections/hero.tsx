"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { AnimateWrapper } from "@/helpers/animations";
import { SectionWrapper } from "@/helpers";

export default function Hero() {
  // State to control animation on initial load
  const [isLoaded, setIsLoaded] = useState(false);

  // Set isLoaded to true after component mounts
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Animation variants for the text reveal
  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  // Split headline into individual letters for animation
  const headlineText = "Building Interfaces That Drive Results.";
  const headlineLetters = headlineText.split("");

  return (
    <SectionWrapper>
      <div className="h-full w-full flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1 }}
          className="absolute -top-1/4 -right-1/4 h-96 w-96 rounded-full bg-primary blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.15 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute -bottom-1/4 -left-1/4 h-96 w-96 rounded-full bg-purple-500 blur-3xl"
        />

        {/* Content */}
        <div className="z-10 text-center px-4 max-w-5xl">
          <AnimateWrapper variant="fadeIn" playOnLoad={true}>
            <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              Full-Stack Developer
            </div>
          </AnimateWrapper>

          {/* Animated headline with letter-by-letter reveal */}
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight"
            variants={textVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            {headlineLetters.map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className={
                  letter === " "
                    ? "mr-2"
                    : index > 8 && index < 19
                    ? "gradient-text"
                    : ""
                }
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>

          <AnimateWrapper variant="slideUp" delay={0.6} playOnLoad={true}>
            <p className="text-lg md:text-xl text-card-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              I create products that aren't just visually striking but also
              highly performant, scalable, and impact-driven — built for success
              and designed to fuel business growth.
            </p>
          </AnimateWrapper>

          <AnimateWrapper variant="slideUp" delay={0.8} playOnLoad={true}>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="flex items-center text-base" asChild>
                <Link href="#projects">
                  View My Work <ArrowRight className="ml-1 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base" asChild>
                <Link href="#contact">Get In Touch</Link>
              </Button>
            </div>
          </AnimateWrapper>
        </div>
      </div>
    </SectionWrapper>
  );
}
