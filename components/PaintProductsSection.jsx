"use client";
import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Users, Paintbrush, Factory, Layers } from "lucide-react";
import { assets } from "@/assets/assets";

const features = [
  "Expert advice from experienced staff",
  "Extensive variety of paint options",
  "Free paint consultations",
];

const products = [
  {
    id: 1,
    title: "Decorative Paints",
    desc: "We know from years of experience that our customers expect top quality decorative finishes.",
    icon: <Paintbrush className="w-6 h-6 text-white" />,
  },
  {
    id: 2,
    title: "Industrial Paints",
    desc: "Industrial customers have specialized needs that require unique, durable coatings.",
    icon: <Factory className="w-6 h-6 text-white" />,
  },
  {
    id: 3,
    title: "Paints Raw Materials",
    desc: "We supply a comprehensive range of high-grade paint raw materials for production.",
    icon: <Layers className="w-6 h-6 text-white" />,
  },
];

export default function PaintProductsSection() {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-20 bg-gradient-to-br from-[#03045E] via-[#00B4D8] to-[#FFD60A] overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative flex justify-center"
        >
          <div className="relative">
            <img
              src="https://karachipaint.com/wp-content/uploads/2024/06/HomeAbout.jpg"
              alt="Paint products showcase"
              className="rounded-3xl shadow-2xl w-72 sm:w-80 md:w-96 h-56 sm:h-64 object-cover rotate-3 border-4 border-[#FFD60A]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute bottom-[-20px] left-[-20px] bg-[#FFD60A] text-[#03045E] px-6 py-3 rounded-md shadow-xl border-2 border-white"
            >
              <p className="text-4xl font-extrabold leading-none">20</p>
              <p className="text-sm font-medium">Years of Excellence</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Text Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-white"
        >
          <p className="uppercase tracking-widest text-[#FFD60A] font-semibold mb-2 text-sm sm:text-base">
            Explore our diverse range
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-snug drop-shadow-lg">
            Discover Quality Painting <br /> Products & Materials
          </h2>
          <p className="text-white/90 mb-6 leading-relaxed text-sm sm:text-base">
            We supply decorative, industrial, marine, epoxy, and bituminous
            paints and primers. Our range includes high heat-resistant,
            acid-resisting paints, pigments, and raw materials. We also offer
            interior and exterior wall texture coatings.
          </p>

          <ul className="space-y-3 mb-6">
            {features.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="flex items-center gap-2 text-white text-sm sm:text-base"
              >
                <CheckCircle2 className="text-[#FFD60A] w-5 h-5" />
                {feature}
              </motion.li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <a href="/about-us">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#FFD60A] text-[#03045E] px-6 py-3 rounded-full font-bold text-sm shadow-lg hover:bg-white transition duration-300 active:scale-95"
              >
                Discover More
              </motion.button>
            </a>

            <div className="flex items-center gap-2 text-white/90">
              <Users className="text-[#FFD60A] w-6 h-6" />
              <p className="font-medium text-sm sm:text-base">
                Trusted by thousands
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Product Cards */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {products.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden hover:shadow-2xl transition-all duration-300"
          >
            <div className="flex items-center gap-3 p-4 bg-[#00B4D8]">
              {item.icon}
              <p className="text-white font-medium text-sm">
                {String(item.id).padStart(2, "0")}
              </p>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-[#FFD60A] mb-2">
                {item.title}
              </h3>
              <p className="text-white/90 text-sm">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Decorative Glows */}
      <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-[#FFD60A]/30 blur-[100px]" />
      <div className="absolute bottom-[-50px] left-[-50px] w-[200px] h-[200px] bg-[#00B4D8]/30 blur-[100px]" />
    </section>
  );
}
