"use client";

import { useEffect, useState, useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { FullPageScroll } from "@/components/global";
import { SectionWrapper } from "@/helpers";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimateWrapper } from "@/helpers/animations";

// Sample project data
const projects = [
  {
    id: 1,
    title: "SaaS Platform",
    description:
      "A scalable SaaS platform with multi-tenant architecture, real-time analytics, and performance optimization. This project demonstrates my ability to build complex applications that can handle high traffic and scale with business needs.",
    image: "/placeholder.svg?height=800&width=800",
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
    image: "/placeholder.svg?height=800&width=800",
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
    image: "/placeholder.svg?height=800&width=800",
    tags: ["Vue.js", "GraphQL", "Elasticsearch", "Redis", "Microservices"],
    demoUrl: "#",
    repoUrl: "#",
    color: "from-green-500 to-emerald-500",
  },
];

export default function Projects() {
  const [isActive, setIsActive] = useState(false);
  const [canNavigateOut, setCanNavigateOut] = useState(false);
  const projectSectionRef = useRef<HTMLDivElement>(null);

  // Project IDs for the nested FullPageScroll
  const projectIds = projects.map((project) => `project-${project.id}`);

  useEffect(() => {
    // Listen for section changes from the main FullPageScroll
    const handleSectionChange = (event: CustomEvent) => {
      console.log(event.detail.section);
      if (event.detail && event.detail.section === "projects") {
        setIsActive(true);
        setCanNavigateOut(false); // Reset navigation state when entering projects
      } else {
        setIsActive(false);
      }
    };

    // Listen for wheel events to control when to navigate out of projects section
    const handleWheel = (e: WheelEvent) => {
      if (!isActive) return;

      // If we're in the projects section
      if (projectSectionRef.current) {
        const currentProjectIndex = projectIds.findIndex(
          (id) => window.location.hash === `#projects#${id}`
        );

        // If scrolling down from the last project, allow navigation to Skills
        if (e.deltaY > 0 && currentProjectIndex === projectIds.length - 1) {
          setCanNavigateOut(true);

          // Dispatch a custom event to tell the main FullPageScroll to navigate to Skills
          const navigateEvent = new CustomEvent("navigate", {
            detail: { index: 3 }, // Index of Skills section
          });
          window.dispatchEvent(navigateEvent);
        }

        // If scrolling up from the first project, allow navigation to About
        if (e.deltaY < 0 && currentProjectIndex === 0) {
          setCanNavigateOut(true);

          // Dispatch a custom event to tell the main FullPageScroll to navigate to About
          const navigateEvent = new CustomEvent("navigate", {
            detail: { index: 1 }, // Index of About section
          });
          window.dispatchEvent(navigateEvent);
        }
      }
    };

    // @ts-ignore - CustomEvent with detail
    window.addEventListener("sectionChange", handleSectionChange);
    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      // @ts-ignore - CustomEvent with detail
      window.removeEventListener("sectionChange", handleSectionChange);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isActive, projectIds]);

  // Individual project component
  const ProjectComponent = ({ project }: { project: (typeof projects)[0] }) => (
    <div className="h-full w-full flex flex-col md:flex-row items-center justify-center p-4 md:p-12">
      <div className="project-content">
        <AnimateWrapper variant="slideUp" delay={0.2}>
          <h3 className="text-4xl font-bold mb-4">{project.title}</h3>
        </AnimateWrapper>

        <AnimateWrapper variant="slideUp" delay={0.3}>
          <p className="text-lg text-muted-foreground mb-6">
            {project.description}
          </p>
        </AnimateWrapper>

        <AnimateWrapper variant="slideUp" delay={0.4}>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </AnimateWrapper>

        <AnimateWrapper variant="slideUp" delay={0.5}>
          <div className="flex gap-4">
            <Button asChild>
              <a href={project.demoUrl} target="_blank" rel="noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Live Demo
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={project.repoUrl} target="_blank" rel="noreferrer">
                <Github className="mr-2 h-4 w-4" />
                View Code
              </a>
            </Button>
          </div>
        </AnimateWrapper>
      </div>

      <div className="project-image">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 rounded-2xl`}
        />
        <AnimateWrapper variant="scale" delay={0.2}>
          <div className="relative h-full w-full rounded-2xl overflow-hidden">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        </AnimateWrapper>
      </div>
    </div>
  );

  return (
    <SectionWrapper>
      <div ref={projectSectionRef} className="h-full w-full">
        {isActive ? (
          <FullPageScroll sectionIds={projectIds} parentSection="projects">
            {projects.map((project) => (
              <section key={project.id} id={`project-${project.id}`}>
                <ProjectComponent project={project} />
              </section>
            ))}
          </FullPageScroll>
        ) : (
          // Placeholder when not active (will be briefly visible during transitions)
          <div className="h-full w-full flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-3xl font-bold">Projects</h2>
              <p className="text-muted-foreground">Loading projects...</p>
            </div>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
