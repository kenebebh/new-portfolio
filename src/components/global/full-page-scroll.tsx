"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface FullPageScrollProps {
  children: React.ReactNode[];
  sectionIds: string[]; // Array of section names for URL routing
}

export default function FullPageScroll({
  children,
  sectionIds,
}: FullPageScrollProps) {
  const router = useRouter();
  const pathname = usePathname();

  const getInitialIndex = () => {
    const currentSection = pathname.replace("/", ""); // Extract path
    return sectionIds.indexOf(currentSection) !== -1
      ? sectionIds.indexOf(currentSection)
      : 0;
  };

  const [currentIndex, setCurrentIndex] = useState(getInitialIndex);
  const [isAnimating, setIsAnimating] = useState(false);

  const updateRoute = (index: number) => {
    router.push(`/#${sectionIds[index]}`, { scroll: false });
  };

  const scrollToSection = useCallback(
    (index: number) => {
      if (index >= 0 && index < children.length && !isAnimating) {
        setIsAnimating(true);
        setCurrentIndex(index);
        updateRoute(index);
        setTimeout(() => setIsAnimating(false), 500); // Unlock scrolling after animation
      }
    },
    [children.length, isAnimating]
  );

  const handleScroll = useCallback(
    (event: WheelEvent) => {
      if (isAnimating) return;
      if (event.deltaY > 0 && currentIndex < children.length - 1) {
        scrollToSection(currentIndex + 1);
      } else if (event.deltaY < 0 && currentIndex > 0) {
        scrollToSection(currentIndex - 1);
      }
    },
    [currentIndex, isAnimating, scrollToSection]
  );

  // Listen for wheel scroll
  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [handleScroll]);

  // Handle back/forward browser navigation
  useEffect(() => {
    const handleRouteChange = () => {
      const newIndex = getInitialIndex();
      setCurrentIndex(newIndex);
    };
    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }} // Exit left
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center h-full w-full"
        >
          {children[currentIndex]}
        </motion.div>
      </AnimatePresence>

      {/* Dot Navigation */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3">
        {children.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToSection(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === currentIndex ? "bg-white scale-125" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
