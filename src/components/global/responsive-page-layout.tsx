"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface ResponsivePageLayoutProps {
  children: React.ReactNode[];
  sectionIds: string[];
}

export default function ResponsivePageLayout({
  children,
  sectionIds,
}: ResponsivePageLayoutProps) {
  const [activeSection, setActiveSection] = useState("");
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  // Initialize section refs
  useEffect(() => {
    sectionRefs.current = sectionIds.map((id) => document.getElementById(id));
  }, [sectionIds]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      // Find the current section
      for (let i = 0; i < sectionRefs.current.length; i++) {
        const section = sectionRefs.current[i];
        if (!section) continue;

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionIds[i]);

          // Update URL hash without scrolling
          window.history.replaceState(null, "", `#${sectionIds[i]}`);

          // Dispatch section change event for navbar
          const sectionChangeEvent = new CustomEvent("sectionChange", {
            detail: { section: sectionIds[i] },
          });
          window.dispatchEvent(sectionChangeEvent);

          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds]);

  // Add navigation dots
  const renderNavigationDots = () => (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
      {sectionIds.map((id, i) => (
        <button
          key={id}
          onClick={() => {
            const section = document.getElementById(id);
            if (section) {
              window.scrollTo({
                top: section.offsetTop,
                behavior: "smooth",
              });
            }
          }}
          className={`w-3 h-3 rounded-full transition-all ${
            id === activeSection
              ? "bg-primary scale-125"
              : "bg-gray-400 hover:bg-gray-500 scale-110"
          }`}
          aria-label={`Navigate to ${id} section`}
        />
      ))}
    </div>
  );

  return (
    <div className="relative">
      {children.map((child, index) => (
        <motion.div
          key={sectionIds[index]}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            opacity: { duration: 0.5 },
          }}
          viewport={{ once: true, margin: "-100px" }}
          className="min-h-screen w-full flex items-center justify-center"
        >
          {child}
        </motion.div>
      ))}

      {renderNavigationDots()}
    </div>
  );
}
