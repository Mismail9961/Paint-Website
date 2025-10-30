"use client";
import React from "react";
import { motion } from "framer-motion";

const NewsLetter = () => {
  return (
    <section className="relative flex flex-col items-center justify-center text-center my-20 sm:my-28 rounded-3xl overflow-hidden py-24 px-6 sm:px-10">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="md:text-4xl text-2xl font-extrabold z-10 text-[#0A9396] leading-snug"
      >
        Stay Inspired with{" "}
        <span className="text-black">Quality Paint Palace</span>
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
        className="md:text-base text-sm text-black/80 max-w-lg mt-3 z-10 leading-relaxed"
      >
        Join our creative community for expert web design insights, color
        inspiration, and the latest updates — straight to your inbox.
      </motion.p>

      {/* Input Field */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        viewport={{ once: true }}
        className="flex flex-col sm:flex-row items-center justify-between w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] md:h-14 h-auto z-10 mt-6 bg-white rounded-full overflow-hidden shadow-lg border border-[#94d2bd]/60"
      >
        <input
          className="w-full h-12 px-4 text-[#0A9396] outline-none placeholder-[#0A9396]/60 text-sm sm:text-base"
          type="email"
          placeholder="Enter your email address"
        />
        <button className="bg-[#0A9396] hover:bg-[#94D2BD] transition-all px-6 sm:px-10 h-12 sm:h-full text-white font-semibold text-sm sm:text-base rounded-b-full sm:rounded-l-none sm:rounded-r-full w-full sm:w-auto">
          Subscribe
        </button>
      </motion.div>

      {/* Small Note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        viewport={{ once: true }}
        className="text-xs text-black/70 pt-4 z-10 max-w-sm"
      >
        We respect your inbox — only creative ideas and design inspiration.
      </motion.p>
    </section>
  );
};

export default NewsLetter;
