"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutResponsive() {
  return (
    <div className="py-24">
      <div className="container px-4">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            className="order-2 md:order-1"
          >
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
              About Me
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Hi, I'm <span className="text-primary">Your Name</span>
            </h2>
            <p className="text-muted-foreground mb-6">
              I'm a full-stack developer with a passion for building scalable,
              high-performance applications with exceptional user experiences.
            </p>

            <div className="space-y-4">
              <p>
                With over X years of experience in web development, I've worked
                on a variety of projects from small startups to large enterprise
                applications. I specialize in creating robust architectures that
                can scale with your business needs.
              </p>
              <p>
                My approach combines technical excellence with a deep
                understanding of user needs. I believe that great software isn't
                just about code—it's about solving real problems for real
                people.
              </p>
              <p>
                When I'm not coding, you can find me hiking, reading, or
                experimenting with new technologies.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
            className="order-1 md:order-2"
          >
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Profile"
                width={600}
                height={600}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
