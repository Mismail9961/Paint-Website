"use client";
import React from "react";
import HeaderSlider from "@/components/HeaderSlider";
import HomeProducts from "@/components/HomeProducts";
import PaintProductsSection from "@/components/PaintProductsSection";
import FeaturedProduct from "@/components/FeaturedProduct";
import FAQSection from "@/components/FAQSection";
import NewsLetter from "@/components/NewsLetter";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main
      role="main"
      className="relative overflow-hidden min-h-screen bg-gradient-to-b from-[#0a9396] via-[#94d2bd] to-white text-black"
    >
      {/* Animated soft glows for background depth */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 2 }}
        className="absolute top-0 left-0 w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] bg-[#0a9396]/40 blur-[100px] will-change-[opacity]"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute bottom-0 right-0 w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] bg-[#94d2bd]/40 blur-[100px] will-change-[opacity]"
      />

      {/* Content Wrapper */}
      <div className="relative z-10 px-3 sm:px-6 md:px-12 lg:px-20 space-y-10 sm:space-y-14 md:space-y-24 pb-20">
        <HeaderSlider />
        <HomeProducts />
        <PaintProductsSection />
        <FeaturedProduct />
        <FAQSection />
        <NewsLetter />
      </div>

      {/* Bottom Accent Gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute bottom-0 left-0 w-full h-[100px] bg-gradient-to-t from-[#0a9396]/60 to-transparent"
      />
    </main>
  );
}
