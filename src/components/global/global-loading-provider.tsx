"use client";

import type React from "react";

import { useState, useEffect, createContext, useContext } from "react";
import LoadingScreen from "./loading-screen";

// Create context for global loading state
export const GlobalLoadingContext = createContext({
  isLoading: true,
  setIsLoading: (loading: boolean) => {},
});

// Hook to use the loading context
export const useGlobalLoading = () => useContext(GlobalLoadingContext);

export default function GlobalLoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    // Check if this is the first load of the application
    if (isFirstLoad) {
      // Function to check if the page is fully loaded
      const handleLoad = () => {
        // Add a small delay to ensure smooth transition
        setTimeout(() => {
          setIsLoading(false);
          setIsFirstLoad(false);
        }, 2000); // 2 second delay, adjust as needed
      };

      // If document is already loaded, call handleLoad directly
      if (document.readyState === "complete") {
        handleLoad();
      } else {
        // Otherwise wait for the load event
        window.addEventListener("load", handleLoad);

        // Also set a timeout as a fallback in case the load event doesn't fire
        const timeout = setTimeout(() => {
          setIsLoading(false);
          setIsFirstLoad(false);
        }, 5000); // 5 second fallback timeout

        return () => {
          window.removeEventListener("load", handleLoad);
          clearTimeout(timeout);
        };
      }
    }
  }, [isFirstLoad]);

  // For subsequent navigations, we can use router events if needed
  // This would require additional setup with Next.js router

  return (
    <GlobalLoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading ? <LoadingScreen /> : children}
    </GlobalLoadingContext.Provider>
  );
}
