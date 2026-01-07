import React from "react";
import Image from "next/image";
import { SectionWrapper } from "@/helpers";
import { AnimateWrapper } from "@/helpers/animations";
import { useTheme } from "next-themes";

export default function About() {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <SectionWrapper>
      <div className="h-full w-full flex items-center justify-center p-4 md:p-12">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center max-w-7xl">
          <AnimateWrapper
            variant="slideRight"
            className="relative aspect-square overflow-hidden"
          >
            <Image
              src="/images/image-no-bg.png"
              alt="Senior Software Engineer"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center transition-transform duration-500 ease-in-out transform hover:scale-105"
            />
            {isDarkMode && (
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            )}
          </AnimateWrapper>

          <AnimateWrapper
            variant="slideLeft"
            delay={0.2}
            className="flex flex-col gap-6"
          >
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary w-fit">
              About Me
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Hi, I'm <span className="text-primary">Banigo Kenebebh</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              I’m a product-focused software developer who enjoys building
              applications that don’t just look good, but genuinely help
              businesses grow, engage users, and scale effectively.
            </p>

            <div className="space-y-4">
              <p className="text-lg">
                I'm drawn to projects that challenge me, push me to think
                outside the box, and ultimately make a difference for both
                businesses and users. I thrive in fast-paced startup
                environments, where I'm constantly learning, solving real
                problems, and collaborating with teams to bring ideas to life.
              </p>
              <p className="text-lg">
                I build and maintain production-ready web applications using
                modern technologies like Next.js, React, and TypeScript, working
                closely with designers and backend engineers to ship reliable,
                scalable features. I also have a little experience building
                backend systems with Node.js and Express, as well as developing
                cross-platform mobile applications using React Native and Expo.
                I value clean code, clear communication, and continuous
                improvement, and I take pride in delivering solutions teams can
                trust and build upon.
              </p>
            </div>
          </AnimateWrapper>
        </div>
      </div>
    </SectionWrapper>
  );
}
