"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["10.5deg", "-10.5deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-10.5deg", "10.5deg"]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const FADE_IN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const } },
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-1/4 left-1/4 h-[50rem] w-[50rem] overflow-hidden rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -bottom-1/4 right-1/4 h-[50rem] w-[50rem] overflow-hidden rounded-full bg-secondary/10 blur-[120px]" />
      </div>

      <div className="container px-4 md:px-6 py-24 md:py-32">
        <motion.div
          initial="hidden"
          animate="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div variants={FADE_IN_ANIMATION_VARIANTS}>
            <Badge
              variant="secondary"
              className="mb-6 rounded-full px-4 py-1.5 text-sm font-medium border-primary/30"
            >
              <Zap className="mr-2 size-4 text-primary" />
              Now in Public Beta!
            </Badge>
          </motion.div>

          <motion.h1
            variants={FADE_IN_ANIMATION_VARIANTS}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 animate-text-gradient bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-900 bg-[200%_auto] bg-clip-text text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-100"
          >
            Your Health Records, <br />
            Finally Organized.
          </motion.h1>

          <motion.p
            variants={FADE_IN_ANIMATION_VARIANTS}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto"
          >
            Medikeep simplifies managing your family’s medical info—from
            prescriptions to lab results—so you can focus on what truly matters.
          </motion.p>

          <motion.div
            variants={FADE_IN_ANIMATION_VARIANTS}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="rounded-full h-12 px-8 text-base group relative overflow-hidden cursor-pointer"
            >
              <span className="absolute w-0 h-0 rounded-full bg-primary/20 group-hover:w-56 group-hover:h-56 transition-all ease-out duration-300"></span>
              <span className="relative">Start Your Free Trial</span>
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full h-12 px-8 text-base cursor-pointer"
            >
              Book a Demo
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="relative mx-auto max-w-5xl mt-16"
        >
          <div
            style={{
              transform: "translateZ(75px)",
              transformStyle: "preserve-3d",
            }}
            className="rounded-xl overflow-hidden shadow-2xl shadow-primary/20 border border-primary/20 bg-background/80 backdrop-blur-md p-2"
          >
            <Image
              src="https://res.cloudinary.com/avhixorin/image/upload/v1755272011/Screenshot_2025-08-15_210145_tj88ba.png"
              width={1280}
              height={720}
              alt="Medikeep dashboard"
              className="w-full h-auto rounded-lg"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
