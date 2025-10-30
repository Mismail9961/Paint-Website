"use client";

import React from "react";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { motion } from "framer-motion";

export default function AboutUs() {
  const products = [
    { name: "Gobis Aqueous Matt Finish", img: assets.GobisAqueousMattFinish },
    { name: "Gobis Gloss Enamel", img: assets.GobisGlossEnamel },
    { name: "Gobis Gold Aqueous Matt Finish", img: assets.GobisGoldAqueousMattFinish },
    { name: "Gobis Gold Undercoat", img: assets.GobisGoldUndercoat },
    { name: "Gobis Gold Wall Emulsion", img: assets.GobisGoldWallEmulsion },
    { name: "Gobis Silksheen Emulsion", img: assets.GobisSilksheenEmulsion },
    { name: "Gobis Weather Protector", img: assets.GobisWeatherProtector },
  ];

  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      <main className="flex-1 max-w-6xl mx-auto px-3 sm:px-4 md:px-10 py-10">
        {/* Header Section */}
        <motion.section
          className="text-center mb-14 px-2 sm:px-0"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 tracking-tight text-[#0A9396]">
            About <span className="text-[#94D2BD]">Gobis Paints</span>
          </h1>
          <p className="text-gray-700 max-w-xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
            Welcome to <span className="font-semibold text-black">Gobis Paints</span> — a brand built on{" "}
            <span className="font-semibold text-[#0A9396]">trust, quality, and innovation</span>. We craft world-class
            paints that bring beauty and protection to your spaces — from vibrant interiors to resilient exteriors.
          </p>
        </motion.section>

        {/* Mission Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="rounded-2xl bg-[#94D2BD]/20 p-5 sm:p-7 md:p-10 border border-[#0A9396]/30 shadow-sm hover:shadow-md hover:shadow-[#94D2BD]/40 transition-all duration-300">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold mb-3 text-[#0A9396]">
              Our Mission
            </h2>
            <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed">
              At <span className="font-semibold text-black">Gobis Paints</span>, our mission is to deliver{" "}
              <span className="font-semibold text-[#0A9396]">premium, eco-friendly paints</span> that inspire creativity
              while protecting your environment. Every product reflects our commitment to sustainability, durability,
              and vibrant expression.
            </p>
          </div>
        </motion.section>

        {/* Products Section */}
        <motion.section
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold mb-8 text-center text-[#0A9396]">
            Our Signature Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {products.map((product, idx) => (
              <motion.div
                key={idx}
                className="rounded-xl bg-[#94D2BD]/20 border border-[#0A9396]/30 overflow-hidden group hover:shadow-md hover:shadow-[#94D2BD]/40 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
              >
                <div className="relative w-full h-40 sm:h-52 md:h-60 overflow-hidden">
                  <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-3 text-center">
                  <h3 className="font-semibold text-sm sm:text-base md:text-lg text-[#0A9396]">
                    {product.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="rounded-2xl bg-[#94D2BD]/20 p-5 sm:p-7 md:p-10 border border-[#0A9396]/30 shadow-sm hover:shadow-md hover:shadow-[#94D2BD]/40 transition-all duration-300">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-semibold mb-4 text-[#0A9396]">
              Why Choose <span className="text-[#94D2BD]">Gobis</span>?
            </h2>
            <ul className="list-disc pl-5 space-y-2 sm:space-y-3 text-gray-800 text-sm sm:text-base md:text-lg">
              <li>Premium-quality paints with long-lasting performance.</li>
              <li>Eco-friendly, lead-free, and safe for your home.</li>
              <li>Rich, fade-resistant colors with smooth finish.</li>
              <li>Dedicated support for residential and commercial clients.</li>
              <li>Trusted by painters, designers, and homeowners across Pakistan.</li>
            </ul>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
