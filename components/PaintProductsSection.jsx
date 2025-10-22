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
    <section className="relative py-16 px-6 lg:px-20 bg-white overflow-hidden">
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
              alt="Puzzle hand"
              className="rounded-3xl shadow-xl w-96 h-64 object-cover rotate-3"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute bottom-[-20px] left-[-20px] bg-[#3C4A5C] text-white px-6 py-3 rounded-md shadow-lg"
            >
              <p className="text-4xl font-bold">20</p>
              <p className="text-sm opacity-90">Years of experience</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Text Section */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="uppercase tracking-widest text-[#3C4A5C] font-semibold mb-2">
            Explore our diverse range
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#3C4A5C] mb-4 leading-snug">
            Discover Quality Painting <br /> Products & Materials
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
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
                className="flex items-center gap-2 text-[#3C4A5C]"
              >
                <CheckCircle2 className="text-[#3C4A5C] w-5 h-5" />
                {feature}
              </motion.li>
            ))}
          </ul>

          <div className="flex items-center gap-6">
            <a href="/about-us">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#3C4A5C] text-white px-6 py-3 rounded-md shadow hover:bg-[#2e3846] transition"
            >
              Discover More
            </motion.button>
            </a>

            <div className="flex items-center gap-2">
              <Users className="text-[#3C4A5C] w-6 h-6" />
              <p className="text-[#3C4A5C] font-medium">Trusted by customers</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Cards */}
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
            whileHover={{ y: -8 }}
            className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition"
          >
            <div className="flex items-center gap-3 p-4 bg-[#3C4A5C]">
              {item.icon}
              <p className="text-white font-medium text-sm">
                {String(item.id).padStart(2, "0")}
              </p>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-[#3C4A5C] mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
