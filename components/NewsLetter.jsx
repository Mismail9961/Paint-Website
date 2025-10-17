"use client";
import React from "react";

const NewsLetter = () => {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-16 my-20 rounded-3xl overflow-hidden bg-gradient-to-r from-slate-100 via-white to-slate-200 shadow-[0_0_40px_rgba(0,0,0,0.08)]">
      {/* Gradient glow accents */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[250px] h-[250px] bg-slate-300/40 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[250px] h-[250px] bg-slate-400/40 blur-[120px]" />
      </div>

      {/* Heading */}
      <h1 className="md:text-4xl text-2xl font-semibold z-10 text-slate-800 px-4 leading-snug">
        Subscribe & Get{" "}
        <span className="text-slate-600 font-bold">20% Off</span> Your First Paint Order
      </h1>

      {/* Subtext */}
      <p className="md:text-base text-sm text-slate-500 max-w-lg px-6 mt-3 z-10 leading-relaxed">
        Join our paint community for exclusive offers, expert color guides, and
        new product launches from <b>Gobi’s</b>, <b>ICI</b>, and <b>Diamond Paints</b>.
      </p>

      {/* Input Field */}
      <div className="flex items-center justify-between max-w-xs sm:max-w-md w-full md:h-14 h-12 z-10 mt-6 bg-white rounded-full overflow-hidden shadow-md border border-slate-300">
        <input
          className="w-full h-full px-4 text-slate-700 outline-none placeholder-slate-400 text-sm sm:text-base"
          type="email"
          placeholder="Enter your email address"
        />
        <button className="bg-slate-700 hover:bg-slate-800 transition-all px-6 sm:px-10 h-full text-white font-medium text-sm sm:text-base rounded-l-none">
          Subscribe
        </button>
      </div>

      {/* Small Note */}
      <p className="text-xs text-slate-500 pt-4 z-10 px-3">
        We’ll only send color inspiration and exclusive deals — no spam.
      </p>

      {/* Bottom accent bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-400 to-slate-600" />
    </section>
  );
};

export default NewsLetter;
