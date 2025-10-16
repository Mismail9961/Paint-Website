"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
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
    <section className="overflow-hidden mt-10 relative w-full">
      {/* Slides */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between 
                       bg-gradient-to-r from-[#FACC15] via-[#fadb3e] to-[#393AC3] 
                       py-12 md:px-20 px-6 rounded-2xl min-w-full shadow-lg"
          >
            {/* Text Section */}
            <div className="md:pl-10 mt-10 md:mt-0 text-white drop-shadow-lg">
              <p className="text-white/90 font-medium pb-2 text-sm md:text-base">
                {slide.offer}
              </p>
              <h1 className="max-w-lg md:text-5xl text-3xl font-semibold leading-tight">
                {slide.title}
              </h1>

              <div className="flex items-center mt-6 gap-4">
                <button className="md:px-10 px-7 md:py-3 py-2 bg-white text-[#393AC3] hover:bg-[#FACC15] hover:text-[#393AC3] rounded-full font-semibold transition-all shadow-md">
                  {slide.buttonText1}
                </button>
                <button className="group flex items-center gap-2 px-6 py-2.5 font-medium text-white hover:text-black transition">
                  {slide.buttonText2}
                  <Image
                    className="group-hover:translate-x-2 mt-1 transition"
                    src={assets.arrow_icon}
                    alt="arrow icon"
                    width={18}
                    height={18}
                  />
                </button>
              </div>
            </div>

            {/* Image Section */}
            <div className="flex items-center flex-1 justify-center">
              <Image
                className="md:w-96 w-60 object-contain drop-shadow-2xl"
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
                width={400}
                height={400}
                priority
              />
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center mb-5 gap-2 mt-6">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-3 w-3 rounded-full cursor-pointer transition-all ${
              currentSlide === index
                ? "bg-[#393AC3] scale-125 shadow-md"
                : "bg-[#FACC15]/50 hover:bg-[#393AC3]/60"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default HeaderSlider;
