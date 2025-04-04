"use client";

import { motion, Variants, Transition } from "framer-motion";
import { ReactNode } from "react";

type AnimationVariant =
  | "fadeIn"
  | "slideUp"
  | "slideLeft"
  | "slideRight"
  | "scale"
  | "bounce";

interface AnimateWrapperProps {
  children: ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  className?: string;
}

const variants: Record<AnimationVariant, Variants> = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
  },
  slideRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  },
  bounce: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  },
};

const transitions: Record<AnimationVariant, Transition> = {
  fadeIn: { duration: 0.5 },
  slideUp: { duration: 0.5 },
  slideLeft: { duration: 0.5 },
  slideRight: { duration: 0.5 },
  scale: { duration: 0.5 },
  bounce: {
    type: "spring",
    bounce: 0.4,
    duration: 0.6,
  },
};

export function AnimateWrapper({
  children,
  variant = "fadeIn",
  delay = 0,
  duration,
  className = "",
}: AnimateWrapperProps) {
  const transition: Transition = {
    ...transitions[variant],
    delay,
    duration: duration,
  };

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-50px" }}
      variants={variants[variant]}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
