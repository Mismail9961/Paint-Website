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
    <div className="bg-[#2F3C50] text-white min-h-screen flex flex-col">
      <main className="flex-1 max-w-6xl mx-auto px-6 md:px-10 py-12">
        {/* Header Section */}
        <motion.section
          className="text-center mb-16"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 tracking-tight">
            About <span className="text-[#9BAED9]">Gobis Paints</span>
          </h1>
          <p className="text-[#ffffffcc] max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
            Welcome to <span className="text-white font-medium">Gobis Paints</span> — a brand built on{" "}
            <span className="font-medium">trust, quality, and innovation</span>. 
            We craft world-class paints that bring beauty and protection 
            to your spaces — from vibrant interiors to resilient exteriors.
          </p>
        </motion.section>

        {/* Mission Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-2xl bg-[#ffffff10] p-8 md:p-10 border border-[#ffffff1a] shadow-lg hover:shadow-[#ffffff15]/40 transition-all duration-300">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Our Mission</h2>
            <p className="text-[#ffffffb3] text-base md:text-lg leading-relaxed">
              At <span className="text-white font-medium">Gobis Paints</span>, our mission is to deliver 
              <span className="text-white font-medium"> premium, eco-friendly paints</span> that inspire creativity 
              while protecting your environment. Every product reflects our 
              commitment to sustainability, durability, and vibrant expression.
            </p>
          </div>
        </motion.section>

        {/* Products Section */}
        <motion.section
          className="mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">
            Our Signature Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, idx) => (
              <motion.div
                key={idx}
                className="rounded-2xl bg-[#ffffff10] border border-[#ffffff1a] overflow-hidden group hover:shadow-lg hover:shadow-[#ffffff10] transition-all duration-300"
                whileHover={{ scale: 1.03 }}
              >
                <div className="relative w-full h-56 sm:h-60 md:h-64 overflow-hidden">
                  <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-5 text-center">
                  <h3 className="font-medium text-lg md:text-xl">{product.name}</h3>
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
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-2xl bg-[#ffffff10] p-8 md:p-10 border border-[#ffffff1a] shadow-lg hover:shadow-[#ffffff15]/40 transition-all duration-300">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              Why Choose <span className="text-[#9BAED9]">Gobis</span>?
            </h2>
            <ul className="list-disc pl-6 space-y-2 md:space-y-3 text-[#ffffffb3] text-base md:text-lg">
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
