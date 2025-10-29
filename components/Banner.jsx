"use client";
import React from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between md:pl-20 py-12 md:py-0 bg-gradient-to-r from-[#03045e] via-[#003566] to-[#00b4d8] my-12 rounded-3xl overflow-hidden text-white shadow-2xl">
      {/* Background Glow Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#00b4d8]/20 blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#FFD60A]/20 blur-[100px]" />
      </div>

      {/* Left Paint Image */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="flex justify-center md:justify-start w-full md:w-auto z-10"
      >
        <Image
          className="max-w-40 sm:max-w-48 md:max-w-60 object-contain drop-shadow-[0_8px_15px_rgba(0,0,0,0.4)]"
          src={assets.GobisGoldWallEmulsion}
          alt="Gobi’s Gold Wall Emulsion"
        />
      </motion.div>

      {/* Center Text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="flex flex-col items-center justify-center text-center space-y-3 px-4 md:px-0 z-20"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
          Give Your Walls a{" "}
          <span className="bg-gradient-to-r from-[#FFD60A] to-[#00B4D8] bg-clip-text text-transparent">
            Premium Finish
          </span>
        </h2>
        <p className="max-w-[360px] text-blue-100 text-xs sm:text-sm md:text-base font-light leading-relaxed">
          Discover luxurious, durable paints crafted for Pakistan’s weather — from{" "}
          <b>Gobi’s</b>, <b>ICI</b>, and <b>Diamond Paints</b>.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="group flex items-center justify-center gap-2 px-8 sm:px-10 py-2.5 bg-[#FFD60A] rounded-full text-[#03045e] font-semibold shadow-lg hover:shadow-[#FFD60A]/40 transition-all"
        >
          Shop Now
          <Image
            className="group-hover:translate-x-1 transition-transform w-4 h-4"
            src={assets.arrow_icon_white}
            alt="arrow_icon_white"
          />
        </motion.button>
      </motion.div>

      {/* Right Paint Image */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="hidden md:flex justify-center items-center w-auto pr-10 z-10"
      >
        <Image
          className="max-w-60 lg:max-w-72 object-contain drop-shadow-[0_8px_15px_rgba(0,0,0,0.4)]"
          src={assets.GobisWeatherProtector}
          alt="Gobi’s Weather Protector"
        />
      </motion.div>

      {/* Small screen image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="md:hidden mt-6"
      >
        <Image
          className="max-w-52 sm:max-w-64 mx-auto object-contain drop-shadow-lg"
          src={assets.GobisGoldAqueousMattFinish}
          alt="Gobi’s Aqueous Matt Finish"
        />
      </motion.div>
    </div>
  );
};

export default Banner;
