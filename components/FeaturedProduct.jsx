"use client";
import React from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";

const FeaturedBanner = () => {
  return (
    <section className="relative w-full min-h-[50vh] flex flex-col justify-center items-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-neutral-700 text-neutral-100">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-slate-400/20 blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-neutral-300/20 blur-[150px]" />
      </div>

      {/* Decorative Paint Cans Row */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-6 sm:gap-10 opacity-30 sm:opacity-40 scale-75 sm:scale-100">
        <Image
          src={assets.GobisAqueousMattFinish}
          alt="Paint"
          width={160}
          height={160}
          className="object-contain rotate-[-5deg]"
        />
        <Image
          src={assets.GobisGoldAqueousMattFinish}
          alt="Paint"
          width={160}
          height={160}
          className="object-contain"
        />
        <Image
          src={assets.GobisGlossEnamel}
          alt="Paint"
          width={160}
          height={160}
          className="object-contain rotate-[5deg]"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-16">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-4">
          Elevate Your Space with{" "}
          <span className="bg-gradient-to-r from-neutral-200 to-white bg-clip-text text-transparent">
            Gobi’s Paints
          </span>
        </h1>

        <p className="text-neutral-300 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed mb-8">
          Explore Pakistan’s finest range of interior and exterior paints.
          From luxurious matt finishes to all-weather protectors —
          crafted for beauty, durability, and brilliance.
        </p>

        <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
          <button className="px-6 sm:px-8 py-2.5 sm:py-3 bg-neutral-100 text-slate-800 font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all text-sm sm:text-base">
            Explore Collection
          </button>
          <button className="px-6 sm:px-8 py-2.5 sm:py-3 border border-neutral-200 text-neutral-100 font-semibold rounded-full hover:bg-neutral-100 hover:text-slate-900 transition-all text-sm sm:text-base">
            Find Your Shade
          </button>
        </div>
      </div>

      {/* Floating Paint Images */}
      <div className="absolute top-1/2 left-3 sm:left-10 transform -translate-y-1/2 hidden sm:block">
        <Image
          src={assets.GobisGoldWallEmulsion}
          alt="Wall Emulsion"
          width={180}
          height={180}
          className="object-contain drop-shadow-2xl hover:scale-105 transition-transform"
        />
      </div>

      <div className="absolute top-1/2 right-3 sm:right-10 transform -translate-y-1/2 hidden sm:block">
        <Image
          src={assets.GobisWeatherProtector}
          alt="Weather Protector"
          width={180}
          height={180}
          className="object-contain drop-shadow-2xl hover:scale-105 transition-transform"
        />
      </div>
    </section>
  );
};

export default FeaturedBanner;
