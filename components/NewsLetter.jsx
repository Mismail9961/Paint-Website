"use client";
import React from "react";

const NewsLetter = () => {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-16 my-20 rounded-3xl overflow-hidden bg-gradient-to-r from-[#FACC15]/30 via-white to-[#393AC3]/20 shadow-[0_0_40px_rgba(0,0,0,0.08)]">
      {/* Gradient glow accents */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[250px] h-[250px] bg-[#FACC15]/40 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[250px] h-[250px] bg-[#393AC3]/40 blur-[120px]" />
      </div>

      {/* Heading */}
      <h1 className="md:text-4xl text-2xl font-semibold z-10 text-gray-900">
        Subscribe & Get{" "}
        <span className="text-[#393AC3]">20% Off</span> Your First Paint Order
      </h1>

      {/* Subtext */}
      <p className="md:text-base text-sm text-gray-600/90 max-w-lg px-6 mt-3 z-10 leading-relaxed">
        Join our paint community for exclusive offers, expert color guides, and
        new product launches from <b>Gobi’s</b>, <b>ICI</b>, and <b>Diamond Paints</b>.
      </p>

      {/* Input Field */}
      <div className="flex items-center justify-between max-w-xl w-full md:h-14 h-12 z-10 mt-6 bg-white rounded-full overflow-hidden shadow-md border border-[#393AC3]/20">
        <input
          className="w-full h-full px-5 text-gray-700 outline-none placeholder-gray-400"
          type="email"
          placeholder="Enter your email address"
        />
        <button className="bg-[#393AC3] hover:bg-[#2e2fa3] transition-all px-8 md:px-12 h-full text-white font-medium rounded-l-none">
          Subscribe
        </button>
      </div>

      {/* Small Note */}
      <p className="text-xs text-gray-500/70 pt-4 z-10">
        We’ll only send color inspiration and exclusive deals — no spam.
      </p>

      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FACC15] to-[#393AC3]" />
    </section>
  );
};

export default NewsLetter;
