"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "@/assets/assets";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      title: "Transform Your Home with ICI Paints",
      offer: "Flat 25% Off on Interior Wall Paints",
      buttonText1: "Shop Now",
      buttonText2: "View Shades",
      imgSrc: assets.GobisAqueousMattFinish,
    },
    {
      id: 2,
      title: "Add Life to Walls with Gobi’s Paints",
      offer: "Buy 2 Get 1 Free – Limited Time!",
      buttonText1: "Order Now",
      buttonText2: "Explore Colors",
      imgSrc: assets.GobisGlossEnamel,
    },
    {
      id: 3,
      title: "Diamond Paints – Shine that Lasts for Years",
      offer: "Premium Exterior Paints Starting Rs. 4,999",
      buttonText1: "Discover More",
      buttonText2: "View Collection",
      imgSrc: assets.GobisGoldAqueousMattFinish,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => setCurrentSlide(index);

  return (
    <section className="relative overflow-hidden w-full mt-10">
      <div className="relative w-full h-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex flex-col-reverse md:flex-row items-center justify-between
                       min-w-full py-8 sm:py-10 px-3 sm:px-8 md:px-16 rounded-2xl shadow-lg
                       bg-[#0A9396] relative overflow-hidden"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-[-100px] left-[-100px] w-[250px] h-[250px] bg-[#94D2BD]/30 blur-[100px]" />
              <div className="absolute bottom-[-80px] right-[-80px] w-[250px] h-[250px] bg-[#94D2BD]/30 blur-[100px]" />
            </div>

            {/* Text Section */}
            <div className="relative z-10 text-center md:text-left mt-6 md:mt-0 md:pl-10 flex-1">
              <p className="text-xs sm:text-sm md:text-base text-white mb-2 font-semibold tracking-wide">
                {sliderData[currentSlide].offer}
              </p>
              <h1 className="text-lg sm:text-3xl md:text-5xl font-extrabold leading-snug md:leading-tight text-white drop-shadow-lg">
                {sliderData[currentSlide].title}
              </h1>

              <div className="flex flex-wrap justify-center md:justify-start mt-5 sm:mt-6 gap-3 sm:gap-4">
                <Link href="/all-products">
                  <button className="px-5 sm:px-8 py-2 sm:py-2.5 bg-[#94D2BD] text-[#0A9396] font-bold border-2 border-[#94D2BD] rounded-full hover:bg-white hover:text-[#0A9396] transition-all duration-300 active:scale-95 text-xs sm:text-sm shadow-md">
                    {sliderData[currentSlide].buttonText1}
                  </button>
                </Link>

                <Link href="/all-products">
                  <button className="group flex items-center gap-2 px-4 sm:px-6 py-2 font-medium text-white hover:text-[#94D2BD] transition-all duration-300 text-xs sm:text-sm">
                    {sliderData[currentSlide].buttonText2}
                    <Image
                      className="group-hover:translate-x-2 transition-transform duration-300"
                      src={assets.arrow_icon}
                      alt="arrow icon"
                      width={14}
                      height={14}
                    />
                  </button>
                </Link>
              </div>
            </div>

            {/* Image Section */}
            <motion.div
              key={sliderData[currentSlide].id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 flex justify-center md:justify-end flex-1"
            >
              <Image
                src={sliderData[currentSlide].imgSrc}
                alt={`Slide ${currentSlide + 1}`}
                width={400}
                height={400}
                priority
                className="object-contain w-40 sm:w-64 md:w-96 drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots Navigation */}
      <div className="flex items-center justify-center gap-2 mt-5 mb-4">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2.5 w-2.5 rounded-full cursor-pointer transition-all duration-300 ${
              currentSlide === index
                ? "bg-[#94D2BD] scale-125 shadow-md"
                : "bg-white/50 hover:bg-[#94D2BD]/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeaderSlider;
