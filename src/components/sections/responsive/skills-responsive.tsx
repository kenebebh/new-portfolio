"use client";

import { motion } from "framer-motion";
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

export default function SkillsResponsive() {
  return (
    <div className="py-24">
      <div className="container px-4">
        <div className="text-center mb-12">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
            Skills
          </div>
          <h2 className="text-3xl font-bold mt-2">Technical Expertise</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            My technical toolkit is built on a foundation of modern web
            technologies, with expertise in both frontend and backend
            development.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {techStacks.map((stack, stackIndex) => (
            <motion.div
              key={stack.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: stackIndex * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative"
            >
              <div
                className={`absolute inset-0 ${stack.color} opacity-5 rounded-lg`}
              />
              <div className="relative p-6 rounded-lg border backdrop-blur-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`p-3 rounded-full ${stack.color} bg-opacity-20`}
                  >
                    <stack.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{stack.category}</h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {stack.technologies.map((tech) => (
                    <div
                      key={tech.name}
                      className="flex flex-col items-center text-center p-2 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="p-2 rounded-full bg-primary/10 mb-1">
                        <tech.icon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-xs font-medium">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
