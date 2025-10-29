"use client";
import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#03045E] via-[#001F87] to-[#00B4D8] text-white pt-14 overflow-hidden">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 pb-14 border-b border-[#00B4D8]/30">
        {/* Logo & About */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full md:w-2/5 text-center md:text-left"
        >
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide leading-tight">
            <span className="text-[#FFD60A]">Quality</span>{" "}
            <span className="text-[#00B4D8]">Paint Palace</span>
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-white/90 max-w-sm mx-auto md:mx-0">
            We bring premium paint brands like <b>Gobi’s</b>, <b>ICI</b>, and{" "}
            <b>Diamond Paints</b> to homes across Pakistan. Experience color,
            protection, and quality like never before.
          </p>
        </motion.div>

        {/* Company Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full md:w-1/4 flex items-center justify-center"
        >
          <div className="text-center md:text-left">
            <h2 className="font-semibold mb-5 text-lg border-b-2 border-[#FFD60A] inline-block pb-1">
              Company
            </h2>
            <ul className="text-sm space-y-2 mt-3">
              {["Home", "About Us", "Contact Us", "Privacy Policy"].map(
                (link, i) => {
                  const path =
                    link === "Home"
                      ? "/"
                      : `/${link.toLowerCase().replace(/\s+/g, "-")}`;
                  return (
                    <li key={i}>
                      <a
                        href={path}
                        className="relative group transition text-white/80 hover:text-[#FFD60A]"
                      >
                        {link}
                        <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#FFD60A] transition-all duration-300 group-hover:w-full" />
                      </a>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="w-full md:w-1/4 flex items-start justify-center"
        >
          <div className="text-center md:text-left">
            <h2 className="font-semibold mb-5 text-lg border-b-2 border-[#FFD60A] inline-block pb-1">
              Get in Touch
            </h2>
            <div className="text-sm space-y-2 mt-3">
              <p className="hover:text-[#FFD60A] transition-all cursor-pointer">
                +92 331 3649161
              </p>
              <p className="hover:text-[#FFD60A] transition-all cursor-pointer break-all">
                support@RangReza.pk
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-[#03045E]/95 text-white py-4 border-t border-[#00B4D8]/30"
      >
        <p className="text-center text-xs sm:text-sm tracking-wide px-2">
          © {new Date().getFullYear()} Quality Paint Palace.pk — All Rights Reserved.
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
