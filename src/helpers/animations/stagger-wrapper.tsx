"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface StaggerWrapperProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function StaggerWrapper({
  children,
  staggerDelay = 0.1,
  className = "",
}: StaggerWrapperProps) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={{
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
