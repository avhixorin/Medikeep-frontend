"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  BrainCircuit,
  FolderLock,
  MessageSquareHeart,
  ShieldCheck
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Features = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "AI-Powered Medical Assistant",
      description:
        "Leverage advanced AI to analyze medical records, answer health queries, and provide personalized recommendations.",
      icon: <BrainCircuit />,
    },
    {
      title: "Secure Chat & Consultations",
      description:
        "Instantly connect with doctors and patients through HIPAA-compliant, encrypted messaging and HD video calls.",
      icon: <MessageSquareHeart />,
    },
    {
      title: "Smart Records Management",
      description:
        "Upload, organize, and access your medical history with intelligent categorization and quick, RAG-based search.",
      icon: <FolderLock />,
    },
    {
      title: "Enterprise-Grade Security",
      description:
        "Protect sensitive health data with end-to-end encryption, multi-factor authentication, and compliance checks.",
      icon: <ShieldCheck />,
    },
  ];

  const FADE_IN_ANIMATION_VARIANTS = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const } },
  };

  return (
    <section id="features" className="w-full py-24 md:py-32 bg-background">
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
            Core Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            A Smarter Way to Manage Health
          </h2>
          <p className="text-lg text-muted-foreground">
            Medikeep integrates cutting-edge technology to provide a seamless,
            secure, and intelligent health management experience.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 lg:gap-16 items-start">
          {/* Left Column: Scrolling Feature Cards */}
          <div className="flex flex-col gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
                variants={FADE_IN_ANIMATION_VARIANTS}
                onMouseEnter={() => setActiveFeature(index)}
                className="relative rounded-xl"
              >
                {/* Active feature indicator */}
                {activeFeature === index && (
                  <motion.div
                    layoutId="active-feature-border"
                    className="absolute inset-0 rounded-xl bg-primary/10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <Card
                  className={`transition-all duration-300 h-full bg-transparent border-0 ${
                    activeFeature === index ? "transform scale-[1.02]" : ""
                  }`}
                >
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div
                      className={`transition-colors duration-300 size-10 rounded-lg flex items-center justify-center ${
                        activeFeature === index
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {React.cloneElement(feature.icon, {
                        className: "size-5",
                      })}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Sticky Bento Grid Visual */}
          <div className="hidden lg:block sticky top-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative w-full h-[500px] rounded-2xl bg-muted/30 border p-4"
            >
              <div className="w-full h-full grid grid-cols-3 grid-rows-3 gap-4">
                <div className="col-span-2 row-span-1 rounded-lg bg-background p-4 flex items-center justify-center text-sm font-semibold">
                  AI Symptom Analysis
                </div>
                <div className="col-span-1 row-span-1 rounded-lg bg-background p-4 flex items-center justify-center text-sm font-semibold">
                  Secure Login
                </div>
                <div className="col-span-1 row-span-2 rounded-lg bg-background p-4 flex items-center justify-center text-sm font-semibold">
                  HD Video Call
                </div>
                <div className="col-span-2 row-span-2 rounded-lg bg-background p-4 flex items-center justify-center text-sm font-semibold">
                  Smart Document Viewer
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent rounded-2xl" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
