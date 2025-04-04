"use client";

import { useRef } from "react";
import {
  Code,
  Database,
  Layout,
  Braces,
  Server,
  Globe,
  Smartphone,
  Layers,
  Cpu,
  Zap,
  FileCode,
  PenTool,
  Palette,
  Monitor,
  Figma,
} from "lucide-react";
import { AnimateWrapper } from "@/helpers/animations";
import { SectionWrapper } from "@/helpers";
// Tech stack with icons
const techStacks = [
  {
    category: "Frontend",
    icon: Layout,
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
    technologies: [
      { name: "React", icon: Braces },
      { name: "Next.js", icon: Server },
      { name: "TypeScript", icon: FileCode },
      { name: "Tailwind CSS", icon: PenTool },
      { name: "Framer Motion", icon: Zap },
      { name: "HTML/CSS", icon: Code },
    ],
  },
  {
    category: "Backend",
    icon: Database,
    color: "bg-gradient-to-r from-blue-500 to-cyan-500",
    technologies: [
      { name: "Node.js", icon: Server },
      { name: "Express", icon: Layers },
      { name: "GraphQL", icon: Braces },
      { name: "REST APIs", icon: Globe },
      { name: "Authentication", icon: Cpu },
    ],
  },
  {
    category: "Database",
    icon: Database,
    color: "bg-gradient-to-r from-green-500 to-emerald-500",
    technologies: [
      { name: "PostgreSQL", icon: Database },
      { name: "MongoDB", icon: Database },
      { name: "Redis", icon: Database },
      { name: "Prisma", icon: Layers },
      { name: "SQL", icon: FileCode },
    ],
  },
  {
    category: "UI/UX",
    icon: Palette,
    color: "bg-gradient-to-r from-orange-500 to-amber-500",
    technologies: [
      { name: "Responsive Design", icon: Smartphone },
      { name: "Figma", icon: Figma },
      { name: "Wireframing", icon: PenTool },
      { name: "Prototyping", icon: Monitor },
      { name: "Accessibility", icon: Globe },
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);

  return (
    <SectionWrapper>
      <div className="h-full w-full flex items-center justify-center p-4 md:p-12">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-12">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              Skills
            </div>
            <h2 className="text-4xl font-bold mt-2">Technical Expertise</h2>
            <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
              My technical toolkit is built on a foundation of modern web
              technologies, with expertise in both frontend and backend
              development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12" ref={ref}>
            {techStacks.map((stack, stackIndex) => (
              <AnimateWrapper
                key={stack.category}
                variant="slideUp"
                delay={stackIndex * 0.1}
                className="relative"
              >
                <div
                  className={`absolute inset-0 ${stack.color} opacity-5 rounded-2xl`}
                />
                <div className="relative p-4 rounded-2xl h-full border backdrop-blur-sm">
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`p-3 rounded-full ${stack.color} bg-opacity-20`}
                    >
                      <stack.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold">{stack.category}</h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {stack.technologies.map((tech, techIndex) => (
                      <AnimateWrapper
                        key={tech.name}
                        variant="fadeIn"
                        delay={stackIndex * 0.1 + techIndex * 0.05}
                        className="flex flex-col items-center text-center p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="p-1 rounded-full bg-primary/10 mb-1">
                          <tech.icon className="h-6 w-6 text-primary" />
                        </div>
                        <span className="text-sm font-medium">{tech.name}</span>
                      </AnimateWrapper>
                    ))}
                  </div>
                </div>
              </AnimateWrapper>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
