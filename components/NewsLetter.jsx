"use client";
import React from "react";
import { motion } from "framer-motion";

const NewsLetter = () => {
  return (
    <section className="relative flex flex-col items-center justify-center text-center my-20 rounded-3xl overflow-hidden py-40">


      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="md:text-4xl text-2xl font-extrabold z-10 text-white px-4 leading-snug drop-shadow-lg"
      >
        Subscribe & Get{" "}
        <span className="text-[#FFD60A]">20% Off</span> Your First Paint Order
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        viewport={{ once: true }}
        className="md:text-base text-sm text-white/90 max-w-lg px-6 mt-3 z-10 leading-relaxed"
      >
        Join our paint community for exclusive offers, expert color guides, and
        new product launches from <b>Gobi’s</b>, <b>ICI</b>, and <b>Diamond Paints</b>.
      </motion.p>

      {/* Input Field */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        viewport={{ once: true }}
        className="flex items-center justify-between w-[90%] sm:w-[80%] md:w-[60%] lg:w-[40%] md:h-14 h-12 z-10 mt-6 bg-white rounded-full overflow-hidden shadow-lg border border-[#03045E]/30"
      >
        <input
          className="w-full h-full px-4 text-[#03045E] outline-none placeholder-[#00B4D8]/70 text-sm sm:text-base"
          type="email"
          placeholder="Enter your email address"
        />
        <button className="bg-[#03045E] hover:bg-[#00B4D8] transition-all px-6 sm:px-10 h-full text-white font-semibold text-sm sm:text-base rounded-l-none">
          Subscribe
        </button>
      </motion.div>

      {/* Small Note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        viewport={{ once: true }}
        className="text-xs text-white/80 pt-4 z-10 px-3"
      >
        We’ll only send color inspiration and exclusive deals — no spam.
      </motion.p>

      {/* Bottom Accent Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#03045E] via-[#00B4D8] to-[#FFD60A]" />
    </section>
  );
};

export default NewsLetter;
