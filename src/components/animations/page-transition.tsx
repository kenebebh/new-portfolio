"use client";

import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PageTransitionProps {
  children: ReactNode;
  direction?: "right" | "bottom";
  isPresent: boolean;
  onExitComplete?: () => void;
}

export function PageTransitionWrapper({
  children,
  direction = "right",
  isPresent,
  onExitComplete,
}: PageTransitionProps) {
  // Variants for animations
  const rightVariants = {
    enter: {
      x: "100%",
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: "-100%",
      opacity: 0,
    },
  };

  const bottomVariants = {
    enter: {
      y: "100%",
      opacity: 0,
    },
    center: {
      y: 0,
      opacity: 1,
    },
    exit: {
      y: "-100%",
      opacity: 0,
    },
  };

  return (
    <AnimatePresence mode="wait" onExitComplete={onExitComplete}>
      {isPresent && (
        <motion.div
          variants={direction === "right" ? rightVariants : bottomVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
          className="absolute top-0 left-0 w-full h-full"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
