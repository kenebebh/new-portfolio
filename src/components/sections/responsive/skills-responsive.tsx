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
const capabilities = [
  {
    title: "Frontend (Next.js & React)",
    icon: Layout,
    description:
      "Build and maintain production-ready user interfaces with a focus on reliability, performance, and clean UX.",
    points: [
      "Build scalable, production-ready user interfaces with a focus on performance, clarity, and long-term maintainability",
      "Build fully functional apps from features defined in product requirements and designs",
      "Integrate frontend applications with APIs (REST and GraphQL) and external services",
      "Optimize performance, accessibility, and responsiveness across devices",
    ],
    tools:
      "Next.js · React · TypeScript · Tailwind CSS · Framer Motion · REST · GraphQL · React Native",
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Backend (Working Knowledge)",
    icon: Server,
    description:
      "Design and integrate backend systems that support real product workflows and frontend features.",
    points: [
      "Build REST APIs using Node.js and Express",
      "Handle authentication and authorization flows",
      "Design API endpoints that support frontend needs",
      "Implement validation, middleware, and error handling",
      "Collaborate effectively with other backend engineers",
    ],
    tools: "Node.js · Express · REST APIs · JWT · GraphQL",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Data & Persistence",
    icon: Database,
    description:
      "I work with NoSQL databases and use them to support scalable and maintainable applications.",
    points: [
      "Design data models aligned with product features",
      "Use ORMs to manage schemas and queries",
      "Understand performance and data consistency trade-offs",
    ],
    tools: "PostgreSQL · MongoDB · Prisma · Redis",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "UI, UX & Accessibility",
    icon: Palette,
    description:
      "Translate designs into accessible, responsive, and consistent user experiences.",
    points: [
      "Convert Figma designs into working interfaces",
      "Ensure accessibility best practices",
      "Build responsive layouts for different screen sizes",
      "Maintain visual and interaction consistency across features",
    ],
    tools: "Figma · Responsive Design · Accessibility",
    color: "from-orange-500 to-amber-500",
  },
];

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
      <div className="px-4">
        <div className="text-center mb-12">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
            What I Do
          </div>
          <h2 className="text-3xl font-bold mt-2">
            How I Build & Maintain Products
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            I build modern web and mobile applications using Javascript,React,
            Next.js, React Native and TypeScript, with a strong focus on
            performance, optimal user experience, and clean architecture.
            <br />
            I’m comfortable working across the full lifecycle of a product —
            from building new features from scratch to improving existing
            systems, fixing bugs, integrating APIs, and collaborating with
            designers and senior engineers to ship reliable, maintainable
            software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className={`relative`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-6 rounded-lg`}
              />
              <div className="relative p-6 rounded-lg border backdrop-blur-sm h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`p-3 rounded-full bg-gradient-to-r ${item.color} bg-opacity-20`}
                  >
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{item.description}</p>

                <ul className="space-y-2 mb-4 list-disc list-inside text-sm">
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>

                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Tools:</span>{" "}
                  {item.tools}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
