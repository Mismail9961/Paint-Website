"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What services does your digital marketing agency offer?",
    answer:
      "We offer SEO, social media management, web design, content marketing, and advertising strategy tailored to help your business grow online.",
  },
  {
    question: "How can digital marketing help my business grow?",
    answer:
      "By improving your online visibility, generating quality leads, and connecting with your audience through data-driven campaigns.",
  },
  {
    question: "How do you measure the success of a digital marketing campaign?",
    answer:
      "We track KPIs like engagement, leads, conversions, ROI, and traffic analytics to evaluate each campaign’s effectiveness.",
  },
  {
    question: "Can you manage our social media accounts?",
    answer:
      "Yes, we create, schedule, and manage posts across multiple platforms while maintaining your brand voice consistently.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-[#F5F8FA] text-[#3C4A5C] py-20 px-6 md:px-16 lg:px-32 w-full">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-10"
        >
          Frequently asked <br /> questions
        </motion.h2>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border-b border-[#3C4A5C]/20 pb-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center text-left py-4 focus:outline-none"
              >
                <span className="font-medium text-lg">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-[#3C4A5C]/70" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="overflow-hidden"
                  >
                    <p className="text-[#3C4A5C]/80 text-sm leading-relaxed px-1 pb-3">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}