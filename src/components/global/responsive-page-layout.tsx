"use client";

import type React from "react";
import { useEffect, useState } from "react";

interface ResponsiveScrollLayoutProps {
  children: React.ReactNode;
  sectionIds: string[];
}

export default function ResponsiveScrollLayout({
  children,
  sectionIds,
}: ResponsiveScrollLayoutProps) {
  const [activeSection, setActiveSection] = useState("");

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Get all sections
      const sections = sectionIds.map((id) => document.getElementById(id));

      // Get current scroll position plus some offset
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      // Find the current section
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        if (!section) continue;

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          if (activeSection !== sectionIds[i]) {
            setActiveSection(sectionIds[i]);

            // Update URL hash without scrolling
            window.history.replaceState(null, "", `#${sectionIds[i]}`);

            // Dispatch section change event for navbar
            const sectionChangeEvent = new CustomEvent("sectionChange", {
              detail: { section: sectionIds[i] },
            });
            window.dispatchEvent(sectionChangeEvent);
          }
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, activeSection]);

  return <div className="relative">{children}</div>;
}
