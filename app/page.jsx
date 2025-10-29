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
    <main className="relative overflow-hidden min-h-screen bg-gradient-to-b from-[#03045E] via-[#00B4D8] to-[#FFD60A]">
      {/* Animated background glows */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
        className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#00B4D8]/40 blur-[160px]"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#FFD60A]/40 blur-[160px]"
      />

      {/* Content Wrapper */}
      <div className="relative z-10 px-4 sm:px-6 md:px-16 lg:px-32 space-y-20 md:space-y-28">
        <HeaderSlider />
        <HomeProducts />
        <PaintProductsSection />
        <FeaturedProduct />
        <FAQSection />
        <NewsLetter />
      </div>

      {/* Animated divider glow at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute bottom-0 left-0 w-full h-[120px] bg-gradient-to-t from-[#03045E] to-transparent"
      />
    </main>
  );
}
