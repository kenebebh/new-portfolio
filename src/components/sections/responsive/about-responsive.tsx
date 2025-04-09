"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutResponsive() {
  return (
    <div className="py-24 pt-8">
      <div className="px-4">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
            className="order-1 md:order-1"
          >
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image
                src="/images/image-no-bg.png"
                alt="Senior Software Engineer"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center transition-transform duration-500 ease-in-out transform hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-50px" }}
            className="order-2 md:order-2"
          >
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary mb-4">
              About Me
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Hi, I'm <span className="text-primary">Banigo Kenebebh</span>
            </h2>
            <p className="text-muted-foreground mb-6">
              I'm a full-stack developer who loves building products that don't
              just look good but actually help businesses grow, engage users,
              and scale effectively.
            </p>

            <div className="space-y-4">
              <p>
                I'm drawn to projects that challenge me, push me to think
                outside the box, and ultimately make a difference for both
                businesses and users. I thrive in fast-paced startup
                environments, where I'm constantly learning, solving real
                problems, and collaborating with teams to bring ideas to life.
              </p>
              <p>
                Beyond coding, I'm into indie hacking, community-driven tech,
                and food 🍕🍣—because good code and good food just make life
                better! I believe great products are born from collaboration,
                curiosity, and a commitment to continuous learning—and that's
                exactly the kind of environment I love being part of..
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
