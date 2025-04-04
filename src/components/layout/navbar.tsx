"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/helpers/ThemeToggle";
import { LogoFloat } from "../global";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isManualScrolling, setIsManualScrolling] = useState(false);
  const lastScrollTime = useRef(0);

  // Memoized navigation items to prevent re-creating the array on every render
  const navItems = useMemo(
    () => [
      { href: "#home", label: "Home" },
      { href: "#about", label: "About" },
      { href: "#projects", label: "Projects" },
      { href: "#skills", label: "Skills" },
      { href: "#contact", label: "Contact" },
    ],
    []
  );

  // Set up intersection observer to detect which section is visible
  useEffect(() => {
    // This function will update both the active section and URL
    const updateActiveSection = (sectionId: string) => {
      setActiveSection(sectionId);

      // Only update URL if not during programmatic scrolling
      if (!isManualScrolling) {
        window.history.replaceState(null, "", `#${sectionId}`);
      }
    };

    // Create a more responsive observer with multiple thresholds
    const observer = new IntersectionObserver(
      (entries) => {
        // Sort entries by their intersection ratio (highest first)
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length > 0) {
          // Get the most visible section
          const mostVisibleSection = visibleSections[0].target.id;
          updateActiveSection(mostVisibleSection);
        }
      },
      {
        threshold: [0.2, 0.4, 0.6, 0.8], // Multiple thresholds for better accuracy
        rootMargin: "-10% 0px -10% 0px", // Adjust the detection area
      }
    );

    // Observe all sections
    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    // Also handle scroll events for more immediate updates
    const handleScroll = () => {
      // Throttle scroll events
      const now = Date.now();
      if (now - lastScrollTime.current < 100) return;
      lastScrollTime.current = now;

      // Find which section is most in view
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      let currentSection = "";
      let maxVisibility = 0;

      sections.forEach((section) => {
        const sectionEl = section as HTMLElement;
        const sectionTop = sectionEl.offsetTop;
        const sectionHeight = sectionEl.offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;

        // Calculate how much of the section is visible
        const visibleTop = Math.max(sectionTop, window.scrollY);
        const visibleBottom = Math.min(
          sectionBottom,
          window.scrollY + window.innerHeight
        );
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        const visibilityRatio = visibleHeight / sectionHeight;

        if (visibilityRatio > maxVisibility) {
          maxVisibility = visibilityRatio;
          currentSection = section.id;
        }
      });

      if (currentSection && !isManualScrolling) {
        updateActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      document.querySelectorAll("section[id]").forEach((section) => {
        observer.unobserve(section);
      });
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isManualScrolling]);

  // Handle click navigation
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      // Set flag to prevent URL updates during programmatic scrolling
      setIsManualScrolling(true);

      // Update the URL hash
      window.history.pushState(null, "", href);

      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });

      setActiveSection(targetId);

      // Reset the scrolling flag after animation completes
      setTimeout(() => {
        setIsManualScrolling(false);
      }, 1000); // Slightly longer than the scroll animation
    }
  };

  // Handle initial hash navigation and popstate events
  useEffect(() => {
    // Function to handle hash changes and navigation
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          // Set flag to prevent URL updates during programmatic scrolling
          setIsManualScrolling(true);

          // Small timeout to ensure the DOM is ready
          setTimeout(() => {
            window.scrollTo({
              top: element.offsetTop,
              behavior: "smooth",
            });
            setActiveSection(hash);

            // Reset the scrolling flag after animation completes
            setTimeout(() => {
              setIsManualScrolling(false);
            }, 1000);
          }, 100);
        }
      }
    };

    // Handle back/forward browser navigation
    window.addEventListener("popstate", handleHashChange);

    // Check for hash on initial page load
    if (window.location.hash) {
      handleHashChange();
    }

    return () => {
      window.removeEventListener("popstate", handleHashChange);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6 lg:px-12">
        <Link href="#home" className="flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <LogoFloat size={32} />
            <span className="font-bold text-xl text-primary">BEBH.DEV</span>
          </motion.div>
        </Link>

        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className={`text-sm font-medium transition-colors hover:text-primary relative ${
                activeSection === item.href.replace("#", "")
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {item.label}
              {activeSection === item.href.replace("#", "") && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-b"
        >
          <div className="container py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === item.href.substring(1)
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}
