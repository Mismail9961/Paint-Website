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
    <section className=" text-white py-16 sm:py-20 h-[60vh] sm:px-10 md:px-16 lg:px-32 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-10 text-center"
        >
          Frequently Asked{" "}
          <span className="text-[#FFD60A] drop-shadow-sm">Questions</span>
        </motion.h2>

        {/* FAQ Items */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 hover:border-[#FFD60A]/60 transition-all shadow-md"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center text-left py-4 px-4 sm:px-6 focus:outline-none"
              >
                <span className="font-medium text-base sm:text-lg text-[#FFD60A]">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-[#FFD60A]" />
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
                    <p className="text-blue-50 text-sm sm:text-base leading-relaxed px-4 sm:px-6 pb-4">
                      {faq.answer}
                    </p>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6 }}
                      className="h-1 bg-gradient-to-r from-[#FFD60A] via-[#00B4D8] to-[#FFD60A] rounded-full mx-4 sm:mx-6"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
