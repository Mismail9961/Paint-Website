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
    <section className="text-white py-12 sm:py-20 px-4 sm:px-8 md:px-16 lg:px-32 overflow-hidden rounded-3xl">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-10 text-center"
        >
          Frequently Asked{" "}
          <span className="text-[#94d2bd] drop-shadow-sm">Questions</span>
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
              className="bg-white text-black rounded-2xl border border-[#94d2bd]/60 shadow-md hover:shadow-lg hover:border-[#0a9396] transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center text-left py-3 px-4 sm:px-6 focus:outline-none"
              >
                <span className="font-semibold text-sm sm:text-lg text-[#0a9396]">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-[#0a9396]" />
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
                    <p className="text-gray-800 text-xs sm:text-base leading-relaxed px-4 sm:px-6 pb-4">
                      {faq.answer}
                    </p>
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.6 }}
                      className="h-1 bg-gradient-to-r from-[#0a9396] via-[#94d2bd] to-[#0a9396] rounded-full mx-4 sm:mx-6"
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
