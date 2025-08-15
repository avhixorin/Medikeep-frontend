"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { UserPlus, Settings, Rocket } from "lucide-react";

const HowItWorks = () => {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  const pathLength = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);

  const steps = [
    {
      step: "01",
      title: "Create Your Secure Account",
      description:
        "Sign up in seconds. No credit card required to get started and explore our core features.",
      icon: <UserPlus />,
    },
    {
      step: "02",
      title: "Upload & Organize",
      description:
        "Easily add your medical documents. Our AI will help categorize and tag them for quick access.",
      icon: <Settings />,
    },
    {
      step: "03",
      title: "Access Anywhere",
      description:
        "Your health information is now securely at your fingertips, ready whenever you need it.",
      icon: <Rocket />,
    },
  ];

  const FADE_IN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const } },
  };

  return (
    <section
      id="how-it-works"
      className="relative w-full py-24 md:py-32 bg-background overflow-hidden"
    >
      {/* Background Aurora */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-1/4 h-[50rem] w-full overflow-hidden rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="container px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={FADE_IN_ANIMATION_VARIANTS}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge
            variant="secondary"
            className="mb-4 rounded-full px-4 py-1.5 text-sm font-medium border-primary/30"
          >
            How It Works
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Get Started in 3 Simple Steps
          </h2>
          <p className="text-lg text-muted-foreground">
            We&apos;ve simplified the process, so you can get organized and feel
            secure in minutes.
          </p>
        </motion.div>

        <div ref={targetRef} className="relative max-w-3xl mx-auto">
          <div className="absolute left-9 md:left-1/2 top-4 h-full w-px -translate-x-1/2 bg-border/50">
            <svg width="2" height="100%" className="h-full">
              <motion.line
                x1="1"
                y1="0"
                x2="1"
                y2="100%"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                style={{ pathLength }}
              />
            </svg>
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className={`relative flex items-center ${
                  index % 2 !== 0 ? "md:justify-end" : ""
                }`}
              >
                <div className="absolute left-9 top-1/2 md:left-1/2 h-10 w-10 -translate-y-1/2 -translate-x-1/2 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10">
                  <span className="font-bold text-primary">{step.step}</span>
                </div>

                <Card className="w-full p-1 ml-[4.5rem] md:ml-0 md:w-[calc(50%-2.5rem)]">
                  <div className="p-6 bg-muted/20 backdrop-blur-sm rounded-lg border border-border/20">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="text-primary">
                        {React.cloneElement(step.icon, { className: "size-5" })}
                      </div>
                      <h3 className="text-xl font-bold">{step.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
