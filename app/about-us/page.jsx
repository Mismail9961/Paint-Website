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
    <div className="bg-[#03045E] text-white min-h-screen flex flex-col">
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-12">
        {/* Header Section */}
        <motion.section
          className="text-center mb-16 px-2 sm:px-0"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 tracking-tight">
            About <span className="text-[#FFD60A]">Gobis Paints</span>
          </h1>
          <p className="text-[#00B4D8]/90 max-w-xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed">
            Welcome to <span className="font-semibold text-white">Gobis Paints</span> — a brand built on{" "}
            <span className="font-semibold">trust, quality, and innovation</span>. We craft world-class paints that 
            bring beauty and protection to your spaces — from vibrant interiors to resilient exteriors.
          </p>
        </motion.section>

        {/* Mission Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="rounded-2xl bg-[#FFD60A]/10 p-6 sm:p-8 md:p-10 border border-[#FFD60A]/30 shadow-md hover:shadow-[#FFD60A]/50 transition-all duration-300">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-[#FFD60A]">
              Our Mission
            </h2>
            <p className="text-[#ffffffcc] text-sm sm:text-base md:text-lg leading-relaxed">
              At <span className="font-semibold text-white">Gobis Paints</span>, our mission is to deliver 
              <span className="font-semibold text-[#FFD60A]"> premium, eco-friendly paints</span> that inspire creativity 
              while protecting your environment. Every product reflects our commitment to sustainability, durability, 
              and vibrant expression.
            </p>
          </div>
        </motion.section>

        {/* Products Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-8 text-center text-[#FFD60A]">
            Our Signature Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.map((product, idx) => (
              <motion.div
                key={idx}
                className="rounded-2xl bg-[#00B4D8]/10 border border-[#00B4D8]/30 overflow-hidden group hover:shadow-lg hover:shadow-[#00B4D8]/40 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
              >
                <div className="relative w-full h-48 sm:h-56 md:h-60 overflow-hidden">
                  <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-sm sm:text-base md:text-lg">{product.name}</h3>
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
          <div className="rounded-2xl bg-[#FFD60A]/10 p-6 sm:p-8 md:p-10 border border-[#FFD60A]/30 shadow-md hover:shadow-[#FFD60A]/50 transition-all duration-300">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-[#FFD60A]">
              Why Choose <span className="text-[#00B4D8]">Gobis</span>?
            </h2>
            <ul className="list-disc pl-5 space-y-2 sm:space-y-3 text-[#ffffffcc] text-sm sm:text-base md:text-lg">
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
