"use client";
import React from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";

const FeaturedBanner = () => {
  return (
    <section className="relative w-full min-h-[50vh] flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-blue-950 via-sky-800 to-blue-600 text-white">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-400/20 blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-300/20 blur-[150px]" />
      </div>

      {/* Decorative Paint Cans Row */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-10 opacity-30 sm:opacity-40">
        <Image src={assets.GobisAqueousMattFinish} alt="Paint" width={180} height={180} className="object-contain rotate-[-5deg]" />
        <Image src={assets.GobisGoldAqueousMattFinish} alt="Paint" width={180} height={180} className="object-contain" />
        <Image src={assets.GobisGlossEnamel} alt="Paint" width={180} height={180} className="object-contain rotate-[5deg]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 md:px-20">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4">
          Elevate Your Space with{" "}
          <span className="bg-gradient-to-r from-sky-300 to-white bg-clip-text text-transparent">
            Gobi’s Paints
          </span>
        </h1>
        <p className="text-blue-100 max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-8">
          Explore Pakistan’s finest range of interior and exterior paints. 
          From luxurious matt finishes to all-weather protectors — 
          crafted for beauty, durability, and brilliance.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <button className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all">
            Explore Collection
          </button>
          <button className="px-8 py-3 border border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-700 transition-all">
            Find Your Shade
          </button>
        </div>
      </div>

      {/* Floating Paint Images (Premium Look) */}
      <div className="absolute top-1/2 left-5 sm:left-20 transform -translate-y-1/2 hidden sm:block">
        <Image
          src={assets.GobisGoldWallEmulsion}
          alt="Wall Emulsion"
          width={200}
          height={200}
          className="object-contain drop-shadow-2xl hover:scale-105 transition-transform"
        />
      </div>

      <div className="absolute top-1/2 right-5 sm:right-20 transform -translate-y-1/2 hidden sm:block">
        <Image
          src={assets.GobisWeatherProtector}
          alt="Weather Protector"
          width={200}
          height={200}
          className="object-contain drop-shadow-2xl hover:scale-105 transition-transform"
        />
      </div>
    </section>
  );
};

export default FeaturedBanner;
