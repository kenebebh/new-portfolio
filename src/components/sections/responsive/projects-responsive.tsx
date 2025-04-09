"use client";

import { useState } from "react";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

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

  // Navigate to previous project
  const goToPrevious = () => {
    if (currentProject > 0) {
      setCurrentProject(currentProject - 1);
    }
  };

  // Navigate to next project
  const goToNext = () => {
    if (currentProject < projects.length - 1) {
      setCurrentProject(currentProject + 1);
    }
  };

  return (
    <div className="py-24">
      <div className="px-4">
        <div className="text-center mb-12">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
            Projects
          </div>
          <h2 className="text-3xl font-bold mt-2">Featured Work</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Showcasing my expertise in building complex, scalable applications
            with robust architecture.
          </p>
        </div>

        <div className="relative">
          {/* Current project */}
          <div className="bg-card rounded-lg border overflow-hidden">
            <div className="relative aspect-video w-full overflow-hidden">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${projects[currentProject].color} opacity-20`}
              />
              <Image
                src={projects[currentProject].image || "/placeholder.svg"}
                alt={projects[currentProject].title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>

            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">
                {projects[currentProject].title}
              </h3>
              <p className="text-muted-foreground mb-4">
                {projects[currentProject].description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {projects[currentProject].tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
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
              </div>
            </div>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              disabled={currentProject === 0}
              className="h-10 w-10 rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous project</span>
            </Button>

            <div className="flex gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentProject === index ? "bg-primary w-8" : "bg-muted"
                  }`}
                  onClick={() => setCurrentProject(index)}
                  aria-label={`Navigate to project ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              disabled={currentProject === projects.length - 1}
              className="h-10 w-10 rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next project</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
