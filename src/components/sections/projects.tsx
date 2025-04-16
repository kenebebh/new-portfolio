"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
  Lock,
} from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionWrapper } from "@/helpers";
import { projects } from "../constants";
import { TooltipWrapper } from "@/components/ui/tooltip-wrapper";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function Projects() {
  const [currentProject, setCurrentProject] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for previous, 1 for next
  const [isAnimating, setIsAnimating] = useState(false);

  // Function to navigate to a specific project
  const navigateToProject = (index: number) => {
    if (
      index === currentProject ||
      isAnimating ||
      index < 0 ||
      index >= projects.length
    )
      return;

    setDirection(index > currentProject ? 1 : -1);
    setCurrentProject(index);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 800);
  };

  // Navigate to previous project
  const goToPrevious = () => {
    navigateToProject(currentProject - 1);
  };

  // Navigate to next project
  const goToNext = () => {
    navigateToProject(currentProject + 1);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      goToPrevious();
    } else if (e.key === "ArrowRight") {
      goToNext();
    }
  };

  return (
    <SectionWrapper>
      <div
        className="h-full w-full relative overflow-hidden"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className="p-8 pb-0 text-center mt-14">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
            Projects
          </div>
        </div>

        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentProject}
            initial={{ opacity: 0, y: direction > 0 ? 100 : -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction > 0 ? -100 : 100 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              opacity: { duration: 0.5 },
            }}
            className="flex items-center justify-center h-[80%] w-full"
          >
            <ProjectComponent project={projects[currentProject]} />
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        {currentProject > 0 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-background/20 backdrop-blur-sm"
            onClick={goToPrevious}
            aria-label="Previous project"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        )}

        {currentProject < projects.length - 1 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-background/20 backdrop-blur-sm"
            onClick={goToNext}
            aria-label="Next project"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        )}

        {/* Project indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${
                currentProject === index ? "bg-primary w-8" : "bg-ring"
              }`}
              onClick={() => navigateToProject(index)}
              aria-label={`Navigate to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

// Individual project component
function ProjectComponent({ project }: { project: (typeof projects)[0] }) {
  return (
    <div className="h-full w-full flex flex-col md:flex-row items-center justify-center p-4 md:p-12">
      <div className="flex flex-col justify-center h-full md:w-1/2 p-4 md:p-8">
        <div className="flex justify-between items-center">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-bold mb-4"
          >
            {project.title}
          </motion.h3>

          {project.isPrivate && (
            <Badge
              variant="outline"
              className="border-yellow-400 text-yellow-400"
            >
              <Lock className="mr-1 h-3 w-3" />
              Private
            </Badge>
          )}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-lg text-muted-foreground mb-6"
        >
          {project.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {project.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="shadow-sm">
              {tag}
            </Badge>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex gap-4"
        >
          <Button asChild>
            <a href={project.demoUrl} target="_blank" rel="noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </a>
          </Button>

          {project.isPrivate ? (
            <TooltipProvider>
              <TooltipWrapper content="This repository is private and the source code is not publicly available">
                <div className="inline-block">
                  <Button
                    variant="outline"
                    disabled
                    className="cursor-not-allowed opacity-70"
                    aria-label="Source code is private"
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Private Code
                  </Button>
                </div>
              </TooltipWrapper>
            </TooltipProvider>
          ) : (
            <Button variant="outline" asChild>
              <a href={project.repoUrl} target="_blank" rel="noreferrer">
                <Github className="mr-2 h-4 w-4" />
                View Code
              </a>
            </Button>
          )}
        </motion.div>
      </div>

      <div className="h-1/2 md:h-full md:w-1/2 relative overflow-hidden border rounded-xl shadow-md dark:shadow-none dark:border-none">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 rounded-2xl`}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative h-full w-full rounded-2xl overflow-hidden"
        >
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            width={1000}
            height={2000}
            className="object-fill w-full h-full"
          />
        </motion.div>
      </div>
    </div>
  );
}
