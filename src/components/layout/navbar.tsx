"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/helpers/ThemeToggle";
import { LogoFloat } from "../global";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

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

  // Listen for hash changes and custom section change events
  useEffect(() => {
    const handleHashChange = () => {
      // Get the current hash without the # symbol
      const hash = window.location.hash.substring(1);

      // If hash exists, update active section
      if (hash) {
        setActiveSection(hash);
        console.log("Active section changed to:", hash);
      } else {
        // Default to home if no hash
        setActiveSection("home");
      }
    };

    // Listen for custom section change events from FullPageScroll
    const handleSectionChange = (event: CustomEvent) => {
      if (event.detail && event.detail.section) {
        setActiveSection(event.detail.section);
        // console.log("Section changed via custom event:", event.detail.section);
      }
    };

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Listen for custom section change events
    window.addEventListener(
      "sectionChange",
      handleSectionChange as EventListener
    );

    // Check hash on initial load
    handleHashChange();

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      window.removeEventListener(
        "sectionChange",
        handleSectionChange as EventListener
      );
    };
  }, []);

  // Also detect which section is in view while scrolling (for responsive layout)
  useEffect(() => {
    // Only add scroll detection for responsive layout (not for FullPageScroll)
    if (window.innerWidth < 1024) {
      const handleScroll = () => {
        // Skip if we're at the top and there's no hash
        if (window.scrollY === 0 && !window.location.hash) {
          setActiveSection("home");
          return;
        }

        // Get all sections
        const sections = document.querySelectorAll("section[id]");

        // Get current scroll position plus some offset
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        // Find the current section
        sections.forEach((section) => {
          // Cast section to HTMLElement to access offsetTop and offsetHeight
          const htmlSection = section as HTMLElement;
          const sectionTop = htmlSection.offsetTop;
          const sectionHeight = htmlSection.offsetHeight;
          const sectionId = section.id;

          if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
          ) {
            setActiveSection(sectionId);
          }
        });
      };

      // Add scroll event listener
      window.addEventListener("scroll", handleScroll);

      // Initial check on mount
      handleScroll();

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
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
              className={`text-sm font-medium transition-colors hover:text-primary relative ${
                activeSection === item.href.substring(1)
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
              onClick={(e) => {
                e.preventDefault();
                const targetId = item.href.substring(1);
                const targetElement = document.getElementById(targetId);

                // Check if we're using the full-page scroll or regular scrolling
                if (window.innerWidth >= 1024) {
                  // lg breakpoint
                  // For desktop - update URL and let the FullPageScroll handle it
                  window.history.pushState(null, "", item.href);

                  // Dispatch a custom event that FullPageScroll can listen for
                  const navigateEvent = new CustomEvent("navigate", {
                    detail: {
                      index: navItems.findIndex(
                        (nav) => nav.href === item.href
                      ),
                    },
                  });
                  window.dispatchEvent(navigateEvent);

                  // Also update active section immediately for better UX
                  setActiveSection(targetId);
                } else {
                  // For mobile/tablet - use smooth scrolling
                  if (targetElement) {
                    window.scrollTo({
                      top: targetElement.offsetTop - 64, // Adjust for header height
                      behavior: "smooth",
                    });
                  }
                }

                // Close mobile menu if open
                if (isOpen) setIsOpen(false);
              }}
            >
              {item.label}
              {activeSection === item.href.substring(1) && (
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
            onClick={() => setIsOpen(!isOpen)}
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
                onClick={(e) => {
                  e.preventDefault();
                  const targetId = item.href.substring(1);
                  const targetElement = document.getElementById(targetId);

                  // Always use smooth scrolling for mobile menu
                  if (targetElement) {
                    window.scrollTo({
                      top: targetElement.offsetTop - 64, // Adjust for header height
                      behavior: "smooth",
                    });
                  }

                  // Close mobile menu
                  setIsOpen(false);
                }}
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
