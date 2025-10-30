"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { assets } from "@/assets/assets";

const FeaturedBanner = () => {
  return (
    <section className="relative w-full min-h-[55vh] flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-[#0A9396] via-[#94D2BD] to-white text-black rounded-3xl my-16">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#94D2BD]/40 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#0A9396]/40 blur-[100px]" />
      </div>

      {/* Decorative Paint Cans */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 0.4, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute bottom-0 flex gap-4 sm:gap-8 scale-[0.6] sm:scale-100"
      >
        <Image
          src={assets.GobisAqueousMattFinish}
          alt="Paint"
          width={130}
          height={130}
          className="object-contain rotate-[-5deg] drop-shadow-xl"
        />
        <Image
          src={assets.GobisGoldAqueousMattFinish}
          alt="Paint"
          width={130}
          height={130}
          className="object-contain drop-shadow-xl"
        />
        <Image
          src={assets.GobisGlossEnamel}
          alt="Paint"
          width={130}
          height={130}
          className="object-contain rotate-[5deg] drop-shadow-xl"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-4 sm:px-6 md:px-16"
      >
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4 drop-shadow-lg text-black">
          Elevate Your Space with{" "}
          <span className="bg-gradient-to-r from-[#0A9396] to-[#94D2BD] bg-clip-text text-transparent">
            Gobi’s Paints
          </span>
        </h1>

        <p className="text-black/80 max-w-2xl mx-auto text-xs sm:text-sm md:text-lg leading-relaxed mb-8">
          Explore Pakistan’s finest range of interior and exterior paints — from
          luxurious matt finishes to all-weather protectors, crafted for beauty,
          durability, and brilliance.
        </p>

        <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-8 py-2.5 sm:py-3 bg-[#0A9396] text-white font-semibold rounded-full hover:bg-[#94D2BD] hover:text-black transition-all shadow-md text-sm sm:text-base"
          >
            <a href="/all-products">Explore Collection</a>
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.05,
              backgroundColor: "#94D2BD",
              color: "#0A9396",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-8 py-2.5 sm:py-3 border border-black text-black font-semibold rounded-full transition-all text-sm sm:text-base hover:shadow-md"
          >
            <a href="/all-products">Find Your Shade</a>
          </motion.button>
        </div>
      </motion.div>

      {/* Floating Paint Images */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute top-1/2 left-2 sm:left-10 transform -translate-y-1/2 hidden sm:block"
      >
        <Image
          src={assets.GobisGoldWallEmulsion}
          alt="Wall Emulsion"
          width={160}
          height={160}
          className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute top-1/2 right-2 sm:right-10 transform -translate-y-1/2 hidden sm:block"
      >
        <Image
          src={assets.GobisWeatherProtector}
          alt="Weather Protector"
          width={160}
          height={160}
          className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-300"
        />
      </motion.div>
    </section>
  );
};

export default FeaturedBanner;
