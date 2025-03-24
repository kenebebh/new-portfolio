"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
// import { Moon, Sun } from "lucide-react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // After mounting, we can access the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Toggle between light and dark
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        {/* <Sun
          className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100"
          color="#fad506"
        /> */}
        <SunIcon className="h-5 w-5 text-yellow-500" />

        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      {theme === "light" ? (
        // <Moon className="h-[1.2rem] w-[1.2rem]" />
        <MoonIcon className="h-5 w-5 text-gray-800" />
      ) : (
        // <Sun className="h-[1.2rem] w-[1.2rem]" />
        <SunIcon className="h-5 w-5 text-yellow-500" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
