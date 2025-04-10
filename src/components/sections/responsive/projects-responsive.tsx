"use client";

import { useState, useEffect, useRef } from "react";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Sample project data
const projects = [
  {
    id: 1,
    title: "SaaS Platform",
    description:
      "A scalable SaaS platform with multi-tenant architecture, real-time analytics, and performance optimization. This project demonstrates my ability to build complex applications that can handle high traffic and scale with business needs.",
    image: "/images/image-no-bg.png",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "AWS"],
    demoUrl: "#",
    repoUrl: "#",
    color: "from-purple-500 to-blue-500",
  },
  {
    id: 2,
    title: "AI-Powered Dashboard",
    description:
      "An admin dashboard with real-time data processing, complex state management, and AI-driven insights. This project showcases my expertise in building data-intensive applications with intuitive user interfaces.",
    image: "/images/image-no-bg.png",
    tags: ["React", "Node.js", "TensorFlow.js", "WebSockets", "Docker"],
    demoUrl: "#",
    repoUrl: "#",
    color: "from-blue-500 to-cyan-500",
  },
  {
    id: 3,
    title: "Travel Booking Engine",
    description:
      "A high-performance travel booking system with complex caching strategies and distributed architecture. This project demonstrates my ability to build systems that require high availability and real-time data processing.",
    image: "/images/image-no-bg.png",
    tags: ["Vue.js", "GraphQL", "Elasticsearch", "Redis", "Microservices"],
    demoUrl: "#",
    repoUrl: "#",
    color: "from-green-500 to-emerald-500",
  },
];

export default function ProjectsResponsive() {
  const [currentProject, setCurrentProject] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for previous, 1 for next
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Create ref for the entire section to detect when it enters viewport
  const sectionRef = useRef(null);
  // Trigger animation as soon as any part of the section is visible
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  // Set loaded state after component mounts
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Navigate to previous project
  const goToPrevious = () => {
    if (currentProject > 0 && !isAnimating) {
      setIsAnimating(true);
      setDirection(-1);
      setCurrentProject(currentProject - 1);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  // Navigate to next project
  const goToNext = () => {
    if (currentProject < projects.length - 1 && !isAnimating) {
      setIsAnimating(true);
      setDirection(1);
      setCurrentProject(currentProject + 1);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  // Navigate to a specific project
  const goToProject = (index: number) => {
    if (index !== currentProject && !isAnimating) {
      setIsAnimating(true);
      setDirection(index > currentProject ? 1 : -1);
      setCurrentProject(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  // Create section entrance animation variants - much faster now
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3, // Much faster animation
        ease: "easeOut",
        staggerChildren: 0.05, // Minimal stagger
      },
    },
  };

  // Simple fade for children
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 }, // Very quick transition
    },
  };

  return (
    <motion.div
      ref={sectionRef}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="py-24 md:py-12"
    >
      <div className="px-4 max-w-4xl mx-auto">
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.div
            variants={itemVariants}
            className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary"
          >
            Projects
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold mt-2"
          >
            Featured Work
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-muted-foreground mt-4 max-w-2xl mx-auto"
          >
            Showcasing my expertise in building complex, scalable applications
            with robust architecture.
          </motion.p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="relative min-h-[500px] md:min-h-[600px]"
        >
          {/* Current project */}
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={currentProject}
              initial={{
                opacity: 0,
                x: direction === 1 ? 300 : direction === -1 ? -300 : 0,
                y: !isLoaded ? 50 : 0,
              }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{
                opacity: 0,
                x: direction === 1 ? -300 : direction === -1 ? 300 : 0,
                transition: { duration: 0.3 },
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                opacity: { duration: 0.3 },
              }}
              className="bg-card rounded-lg border overflow-hidden shadow-lg"
            >
              <div className="relative aspect-video w-full overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${projects[currentProject].color} opacity-20`}
                />
                <motion.div
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="h-full w-full relative"
                >
                  <Image
                    src={projects[currentProject].image || "/placeholder.svg"}
                    alt={projects[currentProject].title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </motion.div>
              </div>

              <div className="p-6">
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-2xl font-bold mb-2"
                >
                  {projects[currentProject].title}
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-muted-foreground mb-4"
                >
                  {projects[currentProject].description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-wrap gap-2 mb-6"
                >
                  {projects[currentProject].tags.map((tag, index) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-wrap gap-4"
                >
                  <Button asChild>
                    <a
                      href={projects[currentProject].demoUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                  <Button variant="outline" asChild>
                    <a
                      href={projects[currentProject].repoUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      View Code
                    </a>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation controls */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between mt-6"
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={goToPrevious}
                disabled={currentProject === 0 || isAnimating}
                className="h-10 w-10 rounded-full"
              >
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">Previous project</span>
              </Button>
            </motion.div>

            <div className="flex gap-2">
              {projects.map((_, index) => (
                <motion.button
                  key={index}
                  variants={itemVariants}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentProject === index ? "bg-primary w-8" : "bg-muted"
                  }`}
                  onClick={() => goToProject(index)}
                  aria-label={`Navigate to project ${index + 1}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="icon"
                onClick={goToNext}
                disabled={currentProject === projects.length - 1 || isAnimating}
                className="h-10 w-10 rounded-full"
              >
                <ChevronRight className="h-5 w-5" />
                <span className="sr-only">Next project</span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
