"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What brands of paint do you offer?",
    answer:
      "We proudly offer top-quality paints from leading brands like ICI, Gobi’s, Diamond, Dulux, and more — ensuring lasting finish and vibrant color for every space.",
  },
  {
    question: "Do you provide paint color consultation or recommendations?",
    answer:
      "Yes, our experts can help you choose the right colors and finishes based on your space, lighting, and personal style preferences.",
  },
  {
    question: "Can I order paint online and get it delivered?",
    answer:
      "Absolutely! You can place your order directly on our website, and we’ll deliver your selected paint products safely to your doorstep.",
  },
  {
    question: "Do you sell painting tools and accessories too?",
    answer:
      "Yes, we offer a wide range of painting supplies — including brushes, rollers, primers, and coatings — to make your painting project easy and professional.",
  },
  {
    question: "Are your paints suitable for both interior and exterior use?",
    answer:
      "Yes, we stock paints for both interior and exterior applications, designed to provide durability, weather resistance, and a beautiful finish.",
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