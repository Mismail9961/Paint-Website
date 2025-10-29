"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
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
    const interval = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % sliderData.length),
      4000
    );
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
                       min-w-full py-10 px-6 md:px-20 rounded-2xl shadow-xl
                       bg-gradient-to-br from-[#03045E] via-[#00B4D8] to-[#FFD60A] relative"
          >
            {/* Decorative Glow */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-[-100px] left-[-100px] w-[250px] h-[250px] bg-[#FFD60A]/20 blur-[100px]" />
              <div className="absolute bottom-[-80px] right-[-80px] w-[250px] h-[250px] bg-[#00B4D8]/20 blur-[100px]" />
            </div>

            {/* Text Section */}
            <div className="relative z-10 text-center md:text-left mt-8 md:mt-0 md:pl-10 flex-1">
              <p className="text-sm md:text-base text-[#FFD60A] mb-2 font-semibold tracking-wide">
                {sliderData[currentSlide].offer}
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold leading-snug md:leading-tight text-white drop-shadow-lg">
                {sliderData[currentSlide].title}
              </h1>

              <div className="flex flex-wrap justify-center md:justify-start mt-6 gap-4">
                <button className="px-6 sm:px-8 py-2.5 bg-[#FFD60A] text-[#03045E] hover:bg-white hover:text-[#00B4D8] rounded-full font-bold text-sm shadow-lg transition-all duration-300 active:scale-95">
                  {sliderData[currentSlide].buttonText1}
                </button>
                <button className="group flex items-center gap-2 px-5 py-2 font-medium text-white hover:text-[#FFD60A] transition-all duration-300">
                  {sliderData[currentSlide].buttonText2}
                  <Image
                    className="group-hover:translate-x-2 transition-transform duration-300"
                    src={assets.arrow_icon}
                    alt="arrow icon"
                    width={16}
                    height={16}
                  />
                </button>
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
                className="object-contain w-48 sm:w-64 md:w-96 drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-6 mb-4">
        {sliderData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2.5 w-2.5 rounded-full bg-[#00B4D8] cursor-pointer transition-all duration-300 ${
              currentSlide === index
                ? "bg-[#FFD60A] scale-125 shadow-md"
                : "bg-white/40 hover:bg-[#00B4D8]"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default HeaderSlider;
