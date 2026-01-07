"use client";

import { Layout, Server, Database, Palette, Smartphone } from "lucide-react";
import { SectionWrapper } from "@/helpers";
import { AnimateWrapper } from "@/helpers/animations";

const capabilities = [
  {
    title: "Frontend (Next.js & React)",
    icon: Layout,
    description:
      "Build and maintain production-ready user interfaces with a focus on reliability, performance, and clean UX.",
    points: [
      "Fix UI bugs and frontend logic issues in existing codebases",
      "Build reusable and well-structured React components",
      "Implement features from product requirements",
      "Integrate frontend features with REST APIs",
      "Ensure responsive layouts and cross-browser consistency",
    ],
    tools: "Next.js · React · TypeScript · Tailwind CSS · Framer Motion",
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
      "Design API contracts that support frontend needs",
      "Implement validation, middleware, and error handling",
      "Collaborate effectively with backend engineers",
    ],
    tools: "Node.js · Express · REST APIs · JWT · GraphQL",
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Data & Persistence",
    icon: Database,
    description:
      "Work with relational and NoSQL databases to support scalable and maintainable applications.",
    points: [
      "Design data models aligned with product features",
      "Work with relational and document databases",
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

export default function Skills() {
  return (
    <SectionWrapper>
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
            What I Do
          </span>
          <h2 className="text-4xl font-bold mt-4">
            How I Build & Maintain Products
          </h2>
          <p className="text-lg text-muted-foreground mt-6 max-w-3xl mx-auto">
            I work on real-world web applications where I fix UI bugs, build new
            features, and improve existing systems using Next.js and React.
            <br />
            <br />
            I’m comfortable working in established codebases, integrating APIs,
            and collaborating with senior engineers to ship reliable,
            maintainable features.
          </p>
        </div>

        {/* Capability Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {capabilities.map((item, index) => (
            <AnimateWrapper
              key={item.title}
              variant="slideUp"
              delay={index * 0.1}
            >
              <div className="relative rounded-2xl border p-6 h-full backdrop-blur-sm">
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-5 rounded-2xl`}
                />

                <div className="relative">
                  <div className="flex items-center gap-4 mb-4">
                    <div
                      className={`p-3 rounded-full bg-gradient-to-r ${item.color} bg-opacity-20`}
                    >
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold">{item.title}</h3>
                  </div>

                  <p className="text-muted-foreground mb-4">
                    {item.description}
                  </p>

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
              </div>
            </AnimateWrapper>
          ))}
        </div>

        {/* Mobile Section */}
        <div className="mt-20 max-w-3xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Smartphone className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h3 className="text-2xl font-semibold mb-4">
            Mobile Development (React Native)
          </h3>
          <p className="text-muted-foreground">
            I also build cross-platform mobile applications using React Native
            and Expo, focusing on reusable UI components, API-driven screens,
            and consistent user experience across Android and iOS.
          </p>
          <p className="text-sm text-muted-foreground mt-3">
            <span className="font-medium text-foreground">Tools:</span> React
            Native · Expo · REST APIs
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
