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
              I'm a full-stack developer who loves building products that don't
              just look good but actually help businesses grow, engage users,
              and scale effectively.
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
                Beyond coding, I'm into indie hacking, community-driven tech,
                and food 🍕🌮—because good code and good food just make life
                better! I believe great products are born from collaboration,
                curiosity, and a commitment to continuous learning—and that's
                exactly the kind of environment I love being part of.
              </p>
            </div>
          </AnimateWrapper>
        </div>
      </div>
    </SectionWrapper>
  );
}
