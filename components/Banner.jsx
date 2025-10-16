"use client";
import React from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";

const Banner = () => {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between md:pl-20 py-14 md:py-0 bg-gradient-to-r from-blue-950 via-sky-800 to-blue-600 my-16 rounded-3xl overflow-hidden text-white shadow-xl">
      {/* Left Paint Image */}
      <div className="flex justify-center md:justify-start w-full md:w-auto">
        <Image
          className="max-w-48 md:max-w-60 object-contain drop-shadow-2xl"
          src={assets.GobisGoldWallEmulsion}
          alt="Gobi’s Gold Wall Emulsion"
        />
      </div>

      {/* Center Text Content */}
      <div className="flex flex-col items-center justify-center text-center space-y-3 px-6 md:px-0 z-10">
        <h2 className="text-3xl md:text-4xl font-bold leading-snug">
          Give Your Walls a{" "}
          <span className="bg-gradient-to-r from-sky-300 to-white bg-clip-text text-transparent">
            Premium Finish
          </span>
        </h2>
        <p className="max-w-[380px] text-blue-100 text-sm md:text-base font-light">
          Discover luxurious, durable paints crafted for Pakistan’s weather —
          from <b>Gobi’s</b>, <b>ICI</b>, and <b>Diamond Paints</b>.
        </p>

        <button className="group flex items-center justify-center gap-1 px-10 py-2.5 bg-white rounded-full text-blue-700 font-semibold hover:bg-sky-100 transition-all shadow-lg">
          Shop Now
          <Image
            className="group-hover:translate-x-1 transition-transform w-4 h-4"
            src={assets.arrow_icon_white}
            alt="arrow_icon_white"
          />
        </button>
      </div>

      {/* Right Paint Image */}
      <div className="hidden md:flex justify-center items-center w-auto pr-10">
        <Image
          className="max-w-72 object-contain drop-shadow-2xl"
          src={assets.GobisWeatherProtector}
          alt="Gobi’s Weather Protector"
        />
      </div>

      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-sky-400/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-300/20 blur-[120px]" />
      </div>

      {/* Small screen paint */}
      <Image
        className="md:hidden mt-6 max-w-64 object-contain"
        src={assets.GobisGoldAqueousMattFinish}
        alt="Gobi’s Aqueous Matt Finish"
      />
    </div>
  );
};

export default Banner;
