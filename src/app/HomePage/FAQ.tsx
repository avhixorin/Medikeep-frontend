"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How does the 14-day free trial work?",
    answer:
      "Our 14-day free trial gives you full access to all MediKeep features, including AI-powered search, secure chat, and video consultations. No credit card is required, and you can cancel anytime during the trial with no obligation.",
  },
  {
    question: "Can I change plans later?",
    answer:
      "Yes. You can upgrade or downgrade your MediKeep plan anytime. If you upgrade, charges will be prorated for the rest of your billing cycle. Downgrades take effect at the start of your next cycle.",
  },
  {
    question: "Is there a limit to how many patients or staff I can add?",
    answer:
      "Limits depend on your plan. Basic Care supports up to 50 patient records, Pro Care allows up to 500, and Enterprise Health has no limit on patients, doctors, or staff members.",
  },
  {
    question:
      "Do you offer discounts for nonprofits or educational institutions?",
    answer:
      "Yes. We offer special pricing for nonprofit clinics, medical colleges, and health research organizations. Contact our sales team for details.",
  },
  {
    question: "How secure is my medical data?",
    answer:
      "We take healthcare security seriously. All data is encrypted in transit and at rest, and our platform is HIPAA-compliant. We undergo regular security audits to ensure patient data remains safe and private.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "All plans include email support. Pro Care includes priority email assistance, while Enterprise Health offers 24/7 phone, video, and email support. We also provide onboarding sessions and a detailed knowledge base for self-help.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="w-full py-20 md:py-32">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
        >
          <Badge
            className="rounded-full px-4 py-1.5 text-sm font-medium"
            variant="secondary"
          >
            FAQ
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="max-w-[800px] text-muted-foreground md:text-lg">
            Find answers to common questions about our platform.
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <AccordionItem
                  value={`item-${i}`}
                  className="border-b border-border/40 py-2"
                >
                  <AccordionTrigger className="text-left font-medium hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
