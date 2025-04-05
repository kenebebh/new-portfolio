"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FullPageScrollProps {
  children: React.ReactNode[];
  sectionIds: string[];
}

export default function FullPageScroll({
  children,
  sectionIds,
}: FullPageScrollProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for previous, 1 for next
  const [isAnimating, setIsAnimating] = useState(false);

  // Function to navigate to a specific section
  const navigateToSection = (index: number) => {
    if (index < 0 || index >= children.length || isAnimating) return;

    setIsAnimating(true);
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);

    // Reset animation flag after animation completes
    setTimeout(() => {
      setIsAnimating(false);
    }, 1000);
  };

  // Get initial section from URL hash if present
  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash && sectionIds.includes(hash)) {
      const index = sectionIds.indexOf(hash);
      setCurrentIndex(index);
    }
  }, [sectionIds]);

  // Update URL hash when section changes
  useEffect(() => {
    if (sectionIds[currentIndex]) {
      window.history.replaceState(null, "", `#${sectionIds[currentIndex]}`);

      // Dispatch a custom event to notify other components (like Navbar)
      const sectionChangeEvent = new CustomEvent("sectionChange", {
        detail: { section: sectionIds[currentIndex] },
      });
      window.dispatchEvent(sectionChangeEvent);
    }
  }, [currentIndex, sectionIds]);

  // Listen for custom navigation events from Navbar
  useEffect(() => {
    const handleNavigate = (event: CustomEvent) => {
      if (event.detail && typeof event.detail.index === "number") {
        navigateToSection(event.detail.index);
      }
    };

    // @ts-ignore - CustomEvent with detail
    window.addEventListener("navigate", handleNavigate);

    return () => {
      // @ts-ignore - CustomEvent with detail
      window.removeEventListener("navigate", handleNavigate);
    };
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating) return;

      if (e.key === "ArrowDown" || e.key === "PageDown") {
        navigateToSection(currentIndex + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        navigateToSection(currentIndex - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, isAnimating]);

  // Handle wheel events for scrolling between sections
  useEffect(() => {
    let wheelTimer: NodeJS.Timeout | null = null;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isAnimating) return;

      // Clear any existing timer
      if (wheelTimer) clearTimeout(wheelTimer);

      // Set a new timer to prevent rapid scrolling
      wheelTimer = setTimeout(() => {
        if (e.deltaY > 0) {
          navigateToSection(currentIndex + 1);
        } else if (e.deltaY < 0) {
          navigateToSection(currentIndex - 1);
        }
      }, 50);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentIndex, isAnimating]);

  // Handle popstate events (browser back/forward)
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.substring(1);
      if (hash && sectionIds.includes(hash)) {
        const newIndex = sectionIds.indexOf(hash);
        const newDirection = newIndex > currentIndex ? 1 : -1;

        setDirection(newDirection);
        setCurrentIndex(newIndex);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [currentIndex, sectionIds]);

  // Add navigation dots
  const renderNavigationDots = () => (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
      {sectionIds.map((_, i) => (
        <button
          key={i}
          onClick={() => navigateToSection(i)}
          className={`w-3 h-3 rounded-full transition-all ${
            i === currentIndex
              ? "bg-primary scale-125"
              : "bg-gray-400 hover:bg-gray-500 scale-110"
          }`}
          aria-label={`Navigate to ${sectionIds[i]} section`}
        />
      ))}
    </div>
  );

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: direction > 0 ? 100 : -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: direction > 0 ? -100 : 100 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            opacity: { duration: 0.5 },
          }}
          className="absolute inset-0 flex items-center justify-center h-full w-full"
        >
          <div className="h-full w-full">{children[currentIndex]}</div>
        </motion.div>
      </AnimatePresence>

      {renderNavigationDots()}
    </div>
  );
}
