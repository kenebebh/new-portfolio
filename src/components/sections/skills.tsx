// "use client";

// import {
//   Layout,
//   Server,
//   Database,
//   Palette,
//   Smartphone,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// const capabilities = [
//   {
//     title: "Frontend (Next.js & React)",
//     icon: Layout,
//     description:
//       "Build and maintain production-ready user interfaces with a focus on reliability, performance, and clean UX.",
//     points: [
//       "Build scalable, production-ready user interfaces with a focus on performance, clarity, and long-term maintainability",
//       "Build fully functional apps from features defined in product requirements and designs",
//       "Integrate frontend applications with APIs (REST and GraphQL) and external services",
//       "Optimize performance, accessibility, and responsiveness across devices",
//     ],
//     tools:
//       "Next.js · React · TypeScript · Tailwind CSS · Framer Motion · REST · GraphQL · React Native",
//     color: "from-purple-500 to-pink-500",
//   },
//   {
//     title: "Backend (Working Knowledge)",
//     icon: Server,
//     description:
//       "Design and integrate backend systems that support real product workflows and frontend features.",
//     points: [
//       "Build REST APIs using Node.js and Express",
//       "Handle authentication and authorization flows",
//       "Design API endpoints that support frontend needs",
//       "Implement validation, middleware, and error handling",
//       "Collaborate effectively with other backend engineers",
//     ],
//     tools: "Node.js · Express · REST APIs · JWT · GraphQL",
//     color: "from-blue-500 to-cyan-500",
//   },
//   {
//     title: "Data & Persistence",
//     icon: Database,
//     description:
//       "I work with NoSQL databases and use them to support scalable and maintainable applications.",
//     points: [
//       "Design data models aligned with product features",
//       "Use ORMs to manage schemas and queries",
//       "Understand performance and data consistency trade-offs",
//     ],
//     tools: "PostgreSQL · MongoDB · Prisma · Redis",
//     color: "from-green-500 to-emerald-500",
//   },
//   {
//     title: "UI, UX & Accessibility",
//     icon: Palette,
//     description:
//       "Translate designs into accessible, responsive, and consistent user experiences.",
//     points: [
//       "Convert Figma designs into working interfaces",
//       "Ensure accessibility best practices",
//       "Build responsive layouts for different screen sizes",
//       "Maintain visual and interaction consistency across features",
//     ],
//     tools: "Figma · Responsive Design · Accessibility",
//     color: "from-orange-500 to-amber-500",
//   },
// ];

// export default function Skills() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [direction, setDirection] = useState(0);

//   const slideVariants = {
//     enter: (direction: number) => ({
//       x: direction > 0 ? 1000 : -1000,
//       opacity: 0,
//     }),
//     center: {
//       zIndex: 1,
//       x: 0,
//       opacity: 1,
//     },
//     exit: (direction: number) => ({
//       zIndex: 0,
//       x: direction < 0 ? 1000 : -1000,
//       opacity: 0,
//     }),
//   };

//   const swipeConfidenceThreshold = 10000;
//   const swipePower = (offset: number, velocity: number) => {
//     return Math.abs(offset) * velocity;
//   };

//   const paginate = (newDirection: number) => {
//     const newIndex = currentSlide + newDirection;
//     if (newIndex >= 0 && newIndex < capabilities.length) {
//       setDirection(newDirection);
//       setCurrentSlide(newIndex);
//     }
//   };

//   return (
//     <div className="h-screen w-full flex items-center justify-center bg-background overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4 md:px-8 w-full h-full flex flex-col justify-center py-8">
//         {/* Header - Fixed at top */}
//         <div className="text-center flex-shrink-0 pt-20">
//           <span className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
//             What I Do
//           </span>
//           <h2 className="text-3xl lg:text-4xl font-bold mt-3">
//             How I Build & Maintain Products
//           </h2>
//           <p className="text-sm lg:text-base text-muted-foreground mt-4 max-w-3xl mx-auto">
//             I build modern web and mobile applications using Javascript, React,
//             Next.js, React Native and TypeScript, with a strong focus on
//             performance, optimal user experience, and clean architecture.
//             <br />
//             <br />
//             I’m comfortable working across the full lifecycle of a product —
//             from building new features from scratch to improving existing
//             systems, fixing bugs, integrating APIs, and collaborating with
//             designers and senior engineers to ship reliable, maintainable
//             software.
//           </p>
//         </div>

//         {/* Carousel Container */}
//         <div className="relative flex-1 flex items-center justify-center min-h-0">
//           {/* Previous Button */}
//           <button
//             onClick={() => paginate(-1)}
//             disabled={currentSlide === 0}
//             className={`absolute left-0 z-10 p-3 rounded-full bg-background/80 backdrop-blur-sm border shadow-lg transition-all ${
//               currentSlide === 0
//                 ? "opacity-30 cursor-not-allowed"
//                 : "opacity-100 hover:scale-110 hover:bg-primary/10"
//             }`}
//             aria-label="Previous capability"
//           >
//             <ChevronLeft className="h-6 w-6" />
//           </button>

//           {/* Carousel Content */}
//           <div className="w-full max-w-4xl mx-16 h-full flex items-center">
//             <AnimatePresence initial={false} custom={direction} mode="wait">
//               <motion.div
//                 key={currentSlide}
//                 custom={direction}
//                 variants={slideVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 transition={{
//                   x: { type: "spring", stiffness: 300, damping: 30 },
//                   opacity: { duration: 0.1 },
//                 }}
//                 drag="x"
//                 dragConstraints={{ left: 0, right: 0 }}
//                 dragElastic={1}
//                 onDragEnd={(e, { offset, velocity }) => {
//                   const swipe = swipePower(offset.x, velocity.x);

//                   if (swipe < -swipeConfidenceThreshold) {
//                     paginate(1);
//                   } else if (swipe > swipeConfidenceThreshold) {
//                     paginate(-1);
//                   }
//                 }}
//                 className="w-full"
//               >
//                 {(() => {
//                   const CurrentIcon = capabilities[currentSlide].icon;
//                   const currentCapability = capabilities[currentSlide];

//                   return (
//                     <div className="relative rounded-2xl border p-8 backdrop-blur-sm h-full">
//                       <div
//                         className={`absolute inset-0 bg-gradient-to-r ${currentCapability.color} opacity-5 rounded-2xl`}
//                       />

//                       <div className="relative">
//                         <div className="flex items-center gap-4 mb-4">
//                           <div
//                             className={`p-3 rounded-full bg-gradient-to-r ${currentCapability.color} bg-opacity-20`}
//                           >
//                             <CurrentIcon className="h-6 w-6 text-primary" />
//                           </div>
//                           <h3 className="text-2xl font-semibold">
//                             {currentCapability.title}
//                           </h3>
//                         </div>

//                         <p className="text-muted-foreground mb-4">
//                           {currentCapability.description}
//                         </p>

//                         <ul className="space-y-2 mb-4 list-disc list-inside text-sm">
//                           {currentCapability.points.map((point) => (
//                             <li key={point}>{point}</li>
//                           ))}
//                         </ul>

//                         <p className="text-sm text-muted-foreground">
//                           <span className="font-medium text-foreground">
//                             Tools:
//                           </span>{" "}
//                           {currentCapability.tools}
//                         </p>
//                       </div>
//                     </div>
//                   );
//                 })()}
//               </motion.div>
//             </AnimatePresence>
//           </div>

//           {/* Next Button */}
//           <button
//             onClick={() => paginate(1)}
//             disabled={currentSlide === capabilities.length - 1}
//             className={`absolute right-0 z-10 p-3 rounded-full bg-background/80 backdrop-blur-sm border shadow-lg transition-all ${
//               currentSlide === capabilities.length - 1
//                 ? "opacity-30 cursor-not-allowed"
//                 : "opacity-100 hover:scale-110 hover:bg-primary/10"
//             }`}
//             aria-label="Next capability"
//           >
//             <ChevronRight className="h-6 w-6" />
//           </button>
//         </div>

//         {/* Carousel Indicators */}
//         <div className="flex justify-center gap-2 mt-6 flex-shrink-0">
//           {capabilities.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => {
//                 setDirection(index > currentSlide ? 1 : -1);
//                 setCurrentSlide(index);
//               }}
//               className={`h-2 rounded-full transition-all ${
//                 index === currentSlide
//                   ? "w-8 bg-primary"
//                   : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
//               }`}
//               aria-label={`Go to slide ${index + 1}`}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import {
  Layout,
  Server,
  Database,
  Palette,
  Smartphone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function Skills() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    const newIndex = currentSlide + newDirection;
    if (newIndex >= 0 && newIndex < capabilities.length) {
      setDirection(newDirection);
      setCurrentSlide(newIndex);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full h-full flex flex-col justify-center py-8">
        {/* Header - Fixed at top */}
        <div className="text-center flex-shrink-0 pt-10">
          <span className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
            What I Do
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold mt-3">
            How I Build & Maintain Products
          </h2>
          <p className="text-sm lg:text-base text-muted-foreground mt-4 max-w-3xl mx-auto">
            I build modern web and mobile applications using Javascript, React,
            Next.js, React Native and TypeScript, with a strong focus on
            performance, optimal user experience, and clean architecture.
            <br />
            <br />
            I’m comfortable working across the full lifecycle of a product —
            from building new features from scratch to improving existing
            systems, fixing bugs, integrating APIs, and collaborating with
            designers and senior engineers to ship reliable, maintainable
            software.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative flex items-center justify-center pt-20 py-8 min-h-0">
          {/* Previous Button */}
          <button
            onClick={() => paginate(-1)}
            disabled={currentSlide === 0}
            className={`absolute left-0 z-10 p-3 rounded-full bg-background/80 backdrop-blur-sm border shadow-lg transition-all ${
              currentSlide === 0
                ? "opacity-30 cursor-not-allowed"
                : "opacity-100 hover:scale-110 hover:bg-primary/10"
            }`}
            aria-label="Previous capability"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Carousel Content */}
          <div className="w-full max-w-4xl mx-16 flex items-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="w-full"
              >
                {(() => {
                  const CurrentIcon = capabilities[currentSlide].icon;
                  const currentCapability = capabilities[currentSlide];

                  return (
                    <div className="relative rounded-2xl border p-8 backdrop-blur-sm h-full">
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${currentCapability.color} opacity-5 rounded-2xl`}
                      />

                      <div className="relative">
                        <div className="flex items-center gap-4 mb-4">
                          <div
                            className={`p-3 rounded-full bg-gradient-to-r ${currentCapability.color} bg-opacity-20`}
                          >
                            <CurrentIcon className="h-6 w-6 text-primary" />
                          </div>
                          <h3 className="text-2xl font-semibold">
                            {currentCapability.title}
                          </h3>
                        </div>

                        <p className="text-muted-foreground mb-4">
                          {currentCapability.description}
                        </p>

                        <ul className="space-y-2 mb-4 list-disc list-inside text-sm">
                          {currentCapability.points.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>

                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-foreground">
                            Tools:
                          </span>{" "}
                          {currentCapability.tools}
                        </p>
                      </div>
                    </div>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Button */}
          <button
            onClick={() => paginate(1)}
            disabled={currentSlide === capabilities.length - 1}
            className={`absolute right-0 z-10 p-3 rounded-full bg-background/80 backdrop-blur-sm border shadow-lg transition-all ${
              currentSlide === capabilities.length - 1
                ? "opacity-30 cursor-not-allowed"
                : "opacity-100 hover:scale-110 hover:bg-primary/10"
            }`}
            aria-label="Next capability"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 flex-shrink-0">
          {capabilities.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentSlide ? 1 : -1);
                setCurrentSlide(index);
              }}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
