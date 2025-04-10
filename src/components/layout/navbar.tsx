"use client";

import type React from "react";

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

  // Listen for hash changes from FullPageScroll component
  useEffect(() => {
    const updateActiveFromHash = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        setActiveSection(hash);
      }
    };

    // Initial check
    updateActiveFromHash();

    // Listen for hash changes
    window.addEventListener("hashchange", updateActiveFromHash);

    // Create a custom event listener for section changes
    const handleSectionChange = (event: CustomEvent) => {
      if (event.detail && event.detail.section) {
        setActiveSection(event.detail.section);
      }
    };

    // @ts-ignore - CustomEvent with detail
    window.addEventListener("sectionChange", handleSectionChange);

    return () => {
      window.removeEventListener("hashchange", updateActiveFromHash);
      // @ts-ignore - CustomEvent with detail
      window.removeEventListener("sectionChange", handleSectionChange);
    };
  }, []);

  // Handle click navigation
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const sectionId = href.replace("#", "");

    // Find the index of the section in the FullPageScroll component
    const sectionIds = ["home", "about", "projects", "skills", "contact"];
    const index = sectionIds.indexOf(sectionId);

    if (index !== -1) {
      // Close mobile menu if open
      setIsOpen(false);

      // Update active section immediately for a responsive feel
      setActiveSection(sectionId);

      // Dispatch a custom event that FullPageScroll can listen for
      const navigateEvent = new CustomEvent("navigate", {
        detail: { index, section: sectionId },
      });
      window.dispatchEvent(navigateEvent);
    }
  };

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
                onClick={(e) => handleClick(e, item.href)}
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
