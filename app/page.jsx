'use client'
import React from "react";
import HeaderSlider from "@/components/HeaderSlider";
import HomeProducts from "@/components/HomeProducts";
import NewsLetter from "@/components/NewsLetter";
import FeaturedProduct from "@/components/FeaturedProduct";
import PaintProductsSection from "@/components/PaintProductsSection";
import FAQSection from "@/components/FAQSection"

const Home = () => {
  return (
    <>

      <div className="px-6 md:px-16 lg:px-32">
        <HeaderSlider />
        <HomeProducts />
        <PaintProductsSection/>
        <FeaturedProduct />
        <FAQSection/>
        <NewsLetter />

      </div>

    </>
  );
};

export default Home;
