"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  once?: boolean;
  delay?: number;
  duration?: number;
}

export function TextReveal({
  text,
  className = "",
  once = true,
  delay = 0,
  duration = 0.05,
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: duration, delayChildren: delay * i },
    }),
  };

  const child: Variants = {
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

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((word, index) => (
        <motion.span key={index} className="inline-block mr-1" variants={child}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
