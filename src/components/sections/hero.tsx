"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AnimateWrapper } from "@/helpers/animations";
import { SectionWrapper } from "@/helpers";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function Hero() {
  // State to control animation on initial load
  const [isLoaded, setIsLoaded] = useState(false);
  const isLargeScreen = useMediaQuery("(min-width: 1024px)"); // lg breakpoint in Tailwind

  // Set isLoaded to true after component mounts
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Function to navigate to a specific section
  const navigateToSection = (sectionId: string) => {
    // Get the index of the section from the sectionIds array
    const sectionIds = ["home", "about", "projects", "skills", "contact"];
    const index = sectionIds.indexOf(sectionId);

    if (index !== -1) {
      // Update URL hash
      window.history.pushState(null, "", `#${sectionId}`);

      // For large screens, dispatch a custom event for FullPageScroll
      if (isLargeScreen) {
        const navigateEvent = new CustomEvent("navigate", {
          detail: { index },
        });
        window.dispatchEvent(navigateEvent);
      } else {
        // For small screens, use standard scrolling
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

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
      <div
        className={`relative overflow-hidden ${
          isLargeScreen
            ? "h-full w-full flex flex-col items-center justify-center"
            : "py-24 md:py-32 flex items-center min-h-screen"
        }`}
      >
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 1 }}
            className="absolute"
            style={{
              top: isLargeScreen ? "10%" : "15%",
              right: isLargeScreen ? "10%" : "15%",
              width: isLargeScreen ? "40%" : "30%",
              height: isLargeScreen ? "40%" : "30%",
              borderRadius: "50%",
              background: "var(--primary)",
              filter: "blur(80px)",
              maxWidth: "40vw",
              maxHeight: "40vh",
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute"
            style={{
              bottom: isLargeScreen ? "10%" : "15%",
              left: isLargeScreen ? "10%" : "15%",
              width: isLargeScreen ? "40%" : "30%",
              height: isLargeScreen ? "40%" : "30%",
              borderRadius: "50%",
              background: "rgb(168, 85, 247)", // purple-500
              filter: "blur(80px)",
              maxWidth: "40vw",
              maxHeight: "40vh",
            }}
          />
        </div>

        {/* Content */}
        <div className="z-10 text-center px-4 max-w-5xl">
          <AnimateWrapper variant="fadeIn" playOnLoad={true}>
            <div className="inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              Full-Stack Web and Mobile Developer
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
              <Button
                size="lg"
                className="flex items-center text-base"
                onClick={() => navigateToSection("projects")}
              >
                View My Work <ArrowRight className="ml-1 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base"
                onClick={() => navigateToSection("contact")}
              >
                Get In Touch
              </Button>
            </div>
          </AnimateWrapper>
        </div>
      </div>
    </SectionWrapper>
  );
}
