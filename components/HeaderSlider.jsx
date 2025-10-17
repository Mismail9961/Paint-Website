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
    const interval = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % sliderData.length),
      4000
    );
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => setCurrentSlide(index);

  return (
    <section className="relative overflow-hidden w-full mt-10">
      {/* Slides Wrapper */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-col-reverse md:flex-row items-center justify-between min-w-full
                       bg-gradient-to-br from-slate-800 via-slate-700 to-neutral-600
                       text-white py-12 md:px-20 px-6 rounded-2xl shadow-lg relative"
          >
            {/* Background Accent */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-slate-300/10 blur-[100px]" />
              <div className="absolute bottom-0 right-0 w-[250px] h-[250px] bg-neutral-400/10 blur-[100px]" />
            </div>

            {/* Text Section */}
            <div className="relative z-10 text-center md:text-left mt-8 md:mt-0 md:pl-10 flex-1">
              <p className="text-sm md:text-base text-slate-200 mb-2 font-medium tracking-wide">
                {slide.offer}
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-snug md:leading-tight text-slate-50 drop-shadow">
                {slide.title}
              </h1>

              <div className="flex flex-wrap justify-center md:justify-start mt-6 gap-4">
                <button className="px-6 sm:px-8 py-2.5 bg-slate-100 text-slate-800 hover:bg-slate-300 hover:text-slate-900 rounded-full font-semibold text-sm shadow transition-all">
                  {slide.buttonText1}
                </button>
                <button className="group flex items-center gap-2 px-5 py-2 font-medium text-slate-100 hover:text-slate-200 transition-all">
                  {slide.buttonText2}
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
            <div className="relative z-10 flex justify-center md:justify-end flex-1">
              <Image
                src={slide.imgSrc}
                alt={`Slide ${index + 1}`}
                width={400}
                height={400}
                priority
                className="object-contain w-52 sm:w-64 md:w-96 drop-shadow-2xl"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-6 mb-4">
        {sliderData.map((_, index) => (
          <div
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2.5 w-2.5 rounded-full cursor-pointer transition-all ${
              currentSlide === index
                ? "bg-slate-900 scale-125 shadow-md"
                : "bg-neutral-400/50 hover:bg-slate-500/70"
            }`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default HeaderSlider;
